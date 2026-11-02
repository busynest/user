import { html, css, LitElement, CSSResultArray }   from 'lit';
import { property, state }          from 'lit/decorators.js';
import { store, AppState }          from '../../../store.js';
import { connect }                  from 'pwa-helpers';
import { auth, onReady, storage }   from '../../../firebase/authentication.js';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { accImage }                 from '../../../redux/backend.js';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { labelStyle } from '../../form/css/label.js';
import { statusStyle, liveStatus } from '../../form/css/status.js';
import { lettersFor } from '../../form/letters.js';
import { pwaAuthError, pwaProfileUpdated } from '../../../events/names.js';
import { emitWindow, toAuthError } from '../../../events/emit.js';
import { userMessage } from '../../../firebase/message.js';

/** Required - one profile image. Larger files are rejected before upload. */
const maxPhotoBytes = 5 * 1024 * 1024;

/** Required - stable object. A new upload replaces this file instead of keeping the old name. */
function photoPath(uid: string): string {
  return 'pwa-auth/' + uid + '/photo';
}

function photoProblem(file: File): { code: string; message: string } | null {

  if (!file.type.startsWith('image/')) {
    return { code: 'pwa/not-image', message: 'Choose an image file.' };
  }

  if (file.size > maxPhotoBytes) {
    return { code: 'pwa/photo-too-large', message: 'Choose an image under 5 MB.' };
  }

  return null;

}

export class ContactPhoto extends connect(store)(LitElement) {

  /** @attr photo */
  @property() public photo : string | void | any = '';

  /** @attr emptyArtwork */
  @property({type: String, reflect: true}) public emptyArtwork = '';

  @state() private signed = false;
  @state() private person = '';
  @state() private mail = '';

  @state() private progress: number = 0;
  @state() private error: string = '';
  @state() private status: string = '';
  @state() private tone: string = '';
  @state() private busy = false;

  private stopAuth: (() => void) | null = null;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    onReady(() => {
      this.stopAuth?.();
      this.stopAuth = onAuthStateChanged(auth, (user) => {
        this.signed = !!user;
        if (!user) {
          this.tone = '';
          this.error = '';
          this.status = 'Sign in to upload a photo.';
          return;
        }
        if (this.status === 'Sign in to upload a photo.') this.status = '';
      });
    });
  }

  override disconnectedCallback(): void {
    this.stopAuth?.();
    this.stopAuth = null;
    super.disconnectedCallback();
  }

  stateChanged(state: AppState) {
    this.photo    = state.backend!.photoURL;
    this.person   = state.backend!.name;
    this.mail     = state.backend!.email;
  }

  static get styles():CSSResultArray {
    return[
      labelStyle,
      statusStyle,
      css`

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        justify-items:            center;
        grid-gap:                 12px;
        width:                    100%;
        max-width:                min(100%, var(--pwa_max_width, 400px));
        min-width:                0;
        margin-inline:            auto;
        padding-inline:           var(--pwa_inset, 0px);
        align-content:            start;
      }

      /* Required - in the tab order, off screen, until it is focused. */
      .file {
        position:                 absolute;
        width:                    1px;
        height:                   1px;
        padding:                  0;
        margin:                   -1px;
        overflow:                 hidden;
        clip:                     rect(0, 0, 0, 0);
        white-space:              nowrap;
        border:                   0;
      }

      .file:focus-visible + .pick {
        outline:                  2px solid var(--pwa_focus, #1c2430);
        outline-offset:           4px;
      }

      .pick {
        display:                  grid;
        justify-items:            center;
        gap:                      8px;
        margin:                   0;
        padding:                  0;
        cursor:                   pointer;
        color:                    var(--pwa_label_text_color, #1c2430);
        font-size:                0.85rem;
        font-weight:              600;
      }

      .file:disabled + .pick {
        cursor:                   default;
        opacity:                  0.72;
      }

      .frame {
        width:                    96px;
        height:                   96px;
        border-radius:            50%;
        overflow:                 hidden;
        background:               var(--pwa_nav_on_background, #f2f2f2);
      }

      .frame img,
      .mark {
        width:                    100%;
        height:                   100%;
        display:                  block;
        box-sizing:               border-box;
      }

      .frame img {
        object-fit:               cover;
      }

      .mark {
        display:                  grid;
        place-items:              center;
        font-size:                2rem;
        font-weight:              600;
        letter-spacing:           0.04em;
        color:                    var(--pwa_action_background_color, #2a6b45);
      }

      .meter {
        width:                    100%;
        height:                   8px;
        margin:                   0;
      }

      .clear {
        appearance:               none;
        border:                   0;
        background:               transparent;
        color:                    var(--pwa_close_color, #9a3b32);
        cursor:                   pointer;
        font:                     inherit;
        font-size:                0.85rem;
        font-weight:              600;
        text-decoration:          underline;
        text-underline-offset:    3px;
        min-height:               var(--pwa_tap, 44px);
        padding:                  0 8px;
      }

      .clear:focus-visible {
        outline:                  2px solid var(--pwa_focus, #1c2430);
        outline-offset:           2px;
      }

      .clear:disabled {
        cursor:                   default;
        opacity:                  0.72;
      }

    `
    ]
  }

  private letters(): string {
    return lettersFor(this.person, this.mail);
  }

  private resetPicker() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('input[type=file]');
    if (input) input.value = '';
  }

  protected render() {
    const letters = this.letters();
    const photo = typeof this.photo === 'string' ? this.photo : '';
    const locked = !this.signed || this.busy;
    return html`

    <input
      id="pwa-photo-file"
      type="file"
      name="photo"
      part="file"
      class="file"
      accept="image/*"
      aria-describedby="pwa-photo-status"
      @change="${this.saveImage}"
      ?disabled="${locked}">

    <label class="pick" for="pwa-photo-file" part="preview">
      <span class="frame">
        ${photo ? html`
          <img alt="Profile photo" src="${photo}">
        ` : letters ? html`
          <span class="mark" part="initials" aria-hidden="true">${letters}</span>
        ` : this.emptyArtwork ? html`
          <img alt="" src="${this.emptyArtwork}">
        ` : html`
          <span class="mark" part="initials" aria-hidden="true">?</span>
        `}
      </span>
      <span>Choose a photo</span>
    </label>

    <progress
      class="meter"
      part="progress"
      value="${this.progress}"
      max="100"
      aria-label="Upload progress"
      ?hidden="${!this.busy}"></progress>

    ${photo ? html`
      <button
        type="button"
        class="clear"
        ?disabled="${locked}"
        @click="${this.clearPhoto}">Remove photo</button>
    ` : ''}

    ${liveStatus('pwa-photo-status', this.error || this.status, this.tone)}
      `;
  }

  private fail(error: unknown) {
    const plain = typeof error === 'object' && error !== null && 'code' in error && 'message' in error && !(error instanceof Error);
    const detail = plain ? error as { code: string; message: string } : toAuthError(error);
    this.tone = 'error';
    this.error = userMessage(detail);
    this.status = '';
    emitWindow(pwaAuthError, detail);
  }

  private saveImage = (event: Event) => {

    const picked = event.target as HTMLInputElement | null;
    const file = picked?.files?.[0];
    const current = auth.currentUser;

    this.error = '';
    this.tone = '';

    if (!current) {
      this.resetPicker();
      this.fail({ code: 'pwa/signed-out', message: 'Sign in first.' });
      return;
    }

    if (!file) {
      this.resetPicker();
      this.fail({ code: 'pwa/missing-file', message: 'Choose a photo first.' });
      return;
    }

    const problem = photoProblem(file);
    if (problem) {
      this.resetPicker();
      this.fail(problem);
      return;
    }

    this.busy = true;
    this.progress = 0;
    this.status = 'Uploading…';

    const location = ref(storage, photoPath(current.uid));
    const metadata = {
      cacheControl: 'public,max-age=300',
      contentType:  file.type
    };
    const uploadTask = uploadBytesResumable(location, file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const ratio = snapshot.totalBytes > 0 ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
        this.progress = isFinite(ratio) ? ratio : 0;
        this.status = `Uploading… ${Math.round(this.progress)}%`;
      },
      (error) => {
        this.busy = false;
        this.progress = 0;
        this.resetPicker();
        this.fail(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const signed = auth.currentUser;
          if (!signed) {
            await deleteObject(location).catch(() => undefined);
            this.fail({ code: 'pwa/signed-out', message: 'Sign in first.' });
            return;
          }
          try {
            await updateProfile(signed, { photoURL: url });
          } catch (error) {
            await deleteObject(location).catch(() => undefined);
            throw error;
          }
          store.dispatch(accImage(url));
          this.photo = url;
          this.progress = 100;
          this.tone = '';
          this.error = '';
          this.status = 'Photo saved.';
          emitWindow(pwaProfileUpdated, {
            uid:          signed.uid,
            displayName:  signed.displayName,
            photoURL:     url
          });
        } catch (error) {
          this.fail(error);
        } finally {
          this.busy = false;
          this.resetPicker();
        }
      }
    );

  }

  private clearPhoto = async () => {

    const signed = auth.currentUser;
    if (!signed || this.busy) return;

    this.busy = true;
    this.error = '';
    this.tone = '';
    this.status = '';

    try {
      await updateProfile(signed, { photoURL: null });
      store.dispatch(accImage(''));
      this.photo = '';
      await deleteObject(ref(storage, photoPath(signed.uid))).catch(() => undefined);
      this.status = 'Photo removed.';
      emitWindow(pwaProfileUpdated, {
        uid:          signed.uid,
        displayName:  signed.displayName,
        photoURL:     null
      });
    } catch (error) {
      this.fail(error);
    } finally {
      this.busy = false;
      this.resetPicker();
    }

  }

}

customElements.define('contact-photo', ContactPhoto);

declare global {
  interface HTMLElementTagNameMap {
      'contact-photo': ContactPhoto;
  }
}

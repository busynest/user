var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { store } from '../../../store.js';
import { connect } from 'pwa-helpers';
import { auth, onReady, storage } from '../../../firebase/authentication.js';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { accImage } from '../../../redux/session.js';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { labelStyle } from '../../form/css/label.js';
import { statusStyle, liveStatus } from '../../form/css/status.js';
import { lettersFor } from '../../form/letters.js';
import { pwaAuthError, pwaProfileUpdated } from '../../../events/names.js';
import { emitWindow, toAuthError } from '../../../events/emit.js';
import { userMessage } from '../../../firebase/message.js';
/** Required - one profile image. Larger files are rejected before upload. */
const maxPhotoBytes = 5 * 1024 * 1024;
/** Required - longest side stored. A smaller original is not enlarged. */
const maxPhotoEdge = 1024;
/** Required - JPEG quality of the bytes that are uploaded. */
const photoQuality = 0.8;
/** Required - stable object. A new upload replaces this file instead of keeping the old name. */
function photoPath(uid) {
    return 'pwa-auth/' + uid + '/photo';
}
function photoProblem(file) {
    if (!file.type.startsWith('image/')) {
        return { code: 'pwa/not-image', message: 'Choose an image file.' };
    }
    if (file.size > maxPhotoBytes) {
        return { code: 'pwa/photo-too-large', message: 'Choose an image under 5 MB.' };
    }
    return null;
}
function fittedSize(width, height) {
    const longest = Math.max(width, height);
    if (!(longest > maxPhotoEdge)) {
        return {
            width: Math.max(1, Math.round(width)),
            height: Math.max(1, Math.round(height))
        };
    }
    const scale = maxPhotoEdge / longest;
    return {
        width: Math.max(1, Math.round(width * scale)),
        height: Math.max(1, Math.round(height * scale))
    };
}
/** Required - EXIF orientation comes from the decoder. No orientation library. */
async function openBitmap(file) {
    try {
        return await createImageBitmap(file, { imageOrientation: 'from-image' });
    }
    catch {
        return await createImageBitmap(file);
    }
}
async function shrinkPhoto(file) {
    const bitmap = await openBitmap(file);
    try {
        if (bitmap.width < 1 || bitmap.height < 1)
            throw new Error('empty image');
        const size = fittedSize(bitmap.width, bitmap.height);
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        const context = canvas.getContext('2d');
        if (!context)
            throw new Error('no canvas');
        context.drawImage(bitmap, 0, 0, size.width, size.height);
        const blob = await new Promise((resolve) => {
            canvas.toBlob((result) => resolve(result), 'image/jpeg', photoQuality);
        });
        if (!blob)
            throw new Error('no jpeg');
        return blob;
    }
    finally {
        bitmap.close();
    }
}
export class ContactPhoto extends connect(store)(LitElement) {
    constructor() {
        super();
        /** @attr photo */
        this.photo = '';
        /** @attr emptyArtwork */
        this.emptyArtwork = '';
        this.signed = false;
        this.person = '';
        this.mail = '';
        this.progress = 0;
        this.error = '';
        this.status = '';
        this.tone = '';
        this.busy = false;
        this.stopAuth = null;
        this.saveImage = async (event) => {
            const picked = event.target;
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
            this.status = 'Preparing…';
            let prepared;
            try {
                prepared = await shrinkPhoto(file);
            }
            catch {
                this.busy = false;
                this.progress = 0;
                this.resetPicker();
                this.fail({ code: 'pwa/photo-unreadable', message: 'That image could not be prepared. Try another.' });
                return;
            }
            const signed = auth.currentUser;
            if (!signed) {
                this.busy = false;
                this.progress = 0;
                this.resetPicker();
                this.fail({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            this.status = 'Uploading…';
            const location = ref(storage, photoPath(signed.uid));
            const metadata = {
                cacheControl: 'public,max-age=300',
                contentType: prepared.type || 'image/jpeg'
            };
            const uploadTask = uploadBytesResumable(location, prepared, metadata);
            uploadTask.on('state_changed', (snapshot) => {
                const ratio = snapshot.totalBytes > 0 ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
                this.progress = isFinite(ratio) ? ratio : 0;
                this.status = `Uploading… ${Math.round(this.progress)}%`;
            }, (error) => {
                this.busy = false;
                this.progress = 0;
                this.resetPicker();
                this.fail(error);
            }, async () => {
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
                    }
                    catch (error) {
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
                        uid: signed.uid,
                        displayName: signed.displayName,
                        photoURL: url
                    });
                }
                catch (error) {
                    this.fail(error);
                }
                finally {
                    this.busy = false;
                    this.resetPicker();
                }
            });
        };
        this.clearPhoto = async () => {
            const signed = auth.currentUser;
            if (!signed || this.busy)
                return;
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
                    uid: signed.uid,
                    displayName: signed.displayName,
                    photoURL: null
                });
            }
            catch (error) {
                this.fail(error);
            }
            finally {
                this.busy = false;
                this.resetPicker();
            }
        };
    }
    connectedCallback() {
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
                if (this.status === 'Sign in to upload a photo.')
                    this.status = '';
            });
        });
    }
    disconnectedCallback() {
        this.stopAuth?.();
        this.stopAuth = null;
        super.disconnectedCallback();
    }
    stateChanged(state) {
        this.photo = state.session.photoURL;
        this.person = state.session.name;
        this.mail = state.session.email;
    }
    static get styles() {
        return [
            labelStyle,
            statusStyle,
            css `

      :host {
        position:                 relative;
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

      /* Required - the file box matches this control. iOS anchors the picker menu to the input, so a clipped input against the page opens in the upper-left. */
      .chooser {
        position:                 relative;
        display:                  grid;
        justify-items:            center;
      }

      .file {
        position:                 absolute;
        top:                      0;
        right:                    0;
        bottom:                   0;
        left:                     0;
        z-index:                  1;
        width:                    auto;
        height:                   auto;
        margin:                   0;
        padding:                  0;
        opacity:                  0;
        overflow:                 hidden;
        border:                   0;
        cursor:                   pointer;
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

      .file:disabled {
        cursor:                   default;
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
        ];
    }
    letters() {
        return lettersFor(this.person, this.mail);
    }
    resetPicker() {
        const input = this.renderRoot.querySelector('input[type=file]');
        if (input)
            input.value = '';
    }
    render() {
        const letters = this.letters();
        const photo = typeof this.photo === 'string' ? this.photo : '';
        const locked = !this.signed || this.busy;
        return html `

    <div class="chooser">
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
          ${photo ? html `
            <img alt="Profile photo" src="${photo}">
          ` : letters ? html `
            <span class="mark" part="initials" aria-hidden="true">${letters}</span>
          ` : this.emptyArtwork ? html `
            <img alt="" src="${this.emptyArtwork}">
          ` : html `
            <span class="mark" part="initials" aria-hidden="true">?</span>
          `}
        </span>
        <span>Choose a photo</span>
      </label>
    </div>

    <progress
      class="meter"
      part="progress"
      value="${this.progress}"
      max="100"
      aria-label="Upload progress"
      ?hidden="${!this.busy}"></progress>

    ${photo ? html `
      <button
        type="button"
        class="clear"
        ?disabled="${locked}"
        @click="${this.clearPhoto}">Remove photo</button>
    ` : ''}

    ${liveStatus('pwa-photo-status', this.error || this.status, this.tone)}
      `;
    }
    fail(error) {
        const plain = typeof error === 'object' && error !== null && 'code' in error && 'message' in error && !(error instanceof Error);
        const detail = plain ? error : toAuthError(error);
        this.tone = 'error';
        this.error = userMessage(detail);
        this.status = '';
        emitWindow(pwaAuthError, detail);
    }
}
__decorate([
    property(),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "photo", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "emptyArtwork", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "signed", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "person", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "mail", void 0);
__decorate([
    state(),
    __metadata("design:type", Number)
], ContactPhoto.prototype, "progress", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContactPhoto.prototype, "error", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContactPhoto.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContactPhoto.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactPhoto.prototype, "busy", void 0);
customElements.define('contact-photo', ContactPhoto);
//# sourceMappingURL=uploader.js.map
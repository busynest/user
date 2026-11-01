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
import { auth, storage } from '../../../firebase/authentication.js';
import { updateProfile } from 'firebase/auth';
import { accImage } from '../../../redux/backend.js';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { labelStyle } from '../../form/css/label.js';
import { statusStyle, liveStatus } from '../../form/css/status.js';
import { lettersFor } from '../../form/letters.js';
import { pwaAuthError, pwaProfileUpdated } from '../../../events/names.js';
import { emitWindow, toAuthError } from '../../../events/emit.js';
import { userMessage } from '../../../firebase/message.js';
export class ContactPhoto extends connect(store)(LitElement) {
    constructor() {
        super();
        this.photo = '';
        this.emptyArtwork = '';
        this.login = false;
        this.person = '';
        this.mail = '';
        this.progress = 0;
        this.error = '';
        this.status = '';
        this.tone = '';
        this.busy = false;
        this.saveImage = (event) => {
            const picked = event.target;
            const file = picked?.files?.[0];
            const current = auth.currentUser;
            this.error = '';
            this.tone = '';
            if (!current) {
                this.fail({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            if (!file) {
                this.fail({ code: 'pwa/missing-file', message: 'Choose a photo first.' });
                return;
            }
            this.busy = true;
            this.progress = 0;
            this.status = 'Uploading…';
            const location = ref(storage, 'pwa-auth/' + current.uid + '/' + file.name);
            const metadata = {
                cacheControl: 'public,max-age=300',
                contentType: file.type || 'application/octet-stream'
            };
            const uploadTask = uploadBytesResumable(location, file, metadata);
            uploadTask.on('state_changed', (snapshot) => {
                const ratio = snapshot.totalBytes > 0 ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
                this.progress = isFinite(ratio) ? ratio : 0;
                if (snapshot.state === 'paused')
                    this.status = 'Upload is paused';
                else
                    this.status = `Uploading… ${Math.round(this.progress)}%`;
            }, (error) => {
                this.busy = false;
                this.progress = 0;
                this.fail(error);
            }, async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    const signed = auth.currentUser;
                    if (!signed) {
                        this.fail({ code: 'pwa/signed-out', message: 'Sign in first.' });
                        return;
                    }
                    await updateProfile(signed, { photoURL: url });
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
                }
            });
        };
    }
    stateChanged(state) {
        this.login = state.frontend.login;
        this.photo = state.backend.photoURL;
        this.person = state.backend.name;
        this.mail = state.backend.email;
    }
    static get styles() {
        return [
            labelStyle,
            statusStyle,
            css `

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        grid-gap:                 16px;
        grid-template-rows:       auto auto auto;
        grid-template-columns:    1fr;
        width:                    100%;
        max-width:                min(100%, var(--pwa_max_width, 400px));
        min-width:                0;
        margin-inline:            auto;
        padding-inline:           var(--pwa_inset, 0px);
        align-content:            start;
      }

      input[type=file] {
        border-radius:            50%;
        overflow:                 hidden;
        margin:                   auto;
        border:                   2px solid #303030;
        box-shadow:               1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
      }

      img.preview,
      .mark {
        margin:                   auto;
        height:                   200px;
        width:                    100%;
        box-sizing:               border-box;
        display:                  block;
      }

      img.preview {
        object-fit:               contain;
      }

      .mark {
        display:                  grid;
        place-items:              center;
        font-size:                3rem;
        font-weight:              600;
        letter-spacing:           0.04em;
        color:                    var(--pwa_action_background_color, #2a6b45);
        background:               var(--pwa_nav_on_background, #f2f2f2);
      }

    `
        ];
    }
    letters() {
        return lettersFor(this.person, this.mail);
    }
    render() {
        const letters = this.letters();
        const photo = typeof this.photo === 'string' ? this.photo : '';
        return html `
    <label
      style="
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 16px;
        padding: 0;
      ">Upload
      <progress
        id="pwa-uploader"
        class="uploader"
        part="progress"
        value="${this.progress}"
        max="100"
        aria-label="Upload progress"
        style="
          height: 24px;
          width: 100%;
          margin: auto;
        "></progress>
    </label>

    <input
      id="photoURL"
      type="file"
      name="photoURL"
      part="file"
      class="contractorPhoto"
      accept="image/*"
      aria-label="Choose a photo"
      @change="${this.saveImage}"
      ?disabled="${this.login === false || this.busy}"
      style="display: none;" />

    <label
      style="
        border: 1px dashed var(--pwa_line_color, #e3daca);
        border-radius: 12px;
        overflow: hidden;
        margin: 0;
        padding: 0 0 16px;
      "
      for ="photoURL"
      part="preview">Photo:

      ${photo ? html `
        <img class="preview" alt="" src="${photo}">
      ` : letters ? html `
        <span class="mark" part="initials" aria-hidden="true">${letters}</span>
      ` : this.emptyArtwork ? html `
        <img class="preview" alt="" src="${this.emptyArtwork}">
      ` : html `
        <span class="mark" part="initials" aria-hidden="true">?</span>
      `}

    </label>

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
    __metadata("design:type", Boolean)
], ContactPhoto.prototype, "login", void 0);
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
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
import { store } from '../../../store';
import { connect } from 'pwa-helpers';
import { auth, storage, user } from '../../../firebase/authentication';
import { updateProfile } from 'firebase/auth';
import { accImage } from '../../../redux/backend';
import { ref, updateMetadata, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { labelStyle } from '../../../css/form/label';
export class ContactPhoto extends connect(store)(LitElement) {
    photo = '';
    emptyArtwork = '';
    user = '';
    login = false;
    progress = 0;
    error = '';
    status = '';
    constructor() {
        super();
        this.progress = 0;
        this.error = '';
        this.status = '';
    }
    stateChanged(state) {
        this.login = state.frontend.login;
        this.user = state.backend.userId;
        this.photo = state.backend.photoURL;
    }
    static get styles() {
        return [
            labelStyle,
            css `

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        grid-template-columns:    1fr;
        grid-gap:                 4px;
        width:                    100%;
      }

      input[type=file] {
        border-radius:            50%;
        overflow:                 hidden;
        margin:                   auto;
        border:                   2px solid #303030;
        box-shadow:               1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
      }

    `
        ];
    }
    render() {
        return html `
<label
    for="pwa-uploader"
    style="
      grid-template-columns: auto 1fr;
      grid-gap:16px;
      padding: 0 16px;
    ">Upload:
    <progress
      id      ="pwa-uploader"
      class   ="uploader"
      value   ="0"
      max     ="100"
      style="
        height:       24px;
        width:        100%;
        margin:       auto;
      "></label>

  

    <!-- Input - Upload Image -->
    <input
      id      ="photoURL"
      type    ="file"
      name    ="photoURL"
      class   ="contractorPhoto"
      accept  ="image/*"
      @change ="${this.saveImage}"
      ?disabled="${this.login === false}"
      style   ="
        display:        none;
        cursor:         pointer;
        position:       absolute;
        z-index:        -1;
      "/></progress>

    <label
      style="
        border: 2px dashed;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 16px;
        padding: 0 16px 16px 16px;
      "
      for ="photoURL">Photo:
    
      <!-- Output - Retrieved Image -->
      <canvas
        style="
          margin:                 auto;
          height:                 200px;
          width:                  100%;
          background-image:       url(${this.photo ? this.photo : this.emptyArtwork});
          background-size:        contain;
          background-repeat:      no-repeat;
          background-position:    center;
          cursor:                 pointer;
          overflow:               hidden;
          box-sizing:             border-box;
        ">
        </canvas>

    </label>

       <p style="text-align:center;">${this.status}${this.error}</p>
      `;
    }
    async saveImage() {
        const uploader = this.shadowRoot.querySelector('.uploader');
        if (auth.currentUser) {
            this.error = '';
            this.status = 'Uploading...';
            const file = this.shadowRoot.querySelector('#photoURL');
            if (!file) {
                console.error('No file selected');
                return;
            }
            const location = ref(storage, "/" +
                "pwa-auth" +
                "/" +
                this.user +
                "/" +
                file.files[0].name);
            const newMetadata = {
                cacheControl: 'public,max-age=300',
                contentType: file.files[0].type
            };
            const uploadTask = uploadBytesResumable(location, file.files[0], newMetadata);
            uploadTask.on('state_changed', (snapshot) => {
                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.status = `Upload is ${Math.round(this.progress)}% done`;
                switch (snapshot.state) {
                    case 'paused':
                        this.status = 'Upload is paused';
                        break;
                    case 'running':
                        this.status = `Upload is running (${Math.round(this.progress)}%)`;
                        break;
                }
                let progress = 0;
                if (snapshot.totalBytes > 0) {
                    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }
                if (isFinite(progress)) {
                    uploader.value = progress;
                    uploader.textContent = `${Math.round(progress)}%`;
                }
                else {
                    uploader.value = 0;
                    uploader.textContent = '0%';
                }
            }, (error) => {
                this.error = `Upload failed: ${error.message}`;
                this.status = '';
                console.error('Upload failed:', error);
                uploader.value = 0;
                uploader.textContent = 'Error';
            }, async () => {
                await getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                    updateMetadata(location, newMetadata)
                        .then(() => { }).catch((error) => { console.log("error: ", error); });
                    if (user) {
                        updateProfile(user, { photoURL: url })
                            .then(() => {
                            uploader.value = 100;
                            uploader.textContent = 'Complete';
                        });
                        this.status = 'User profile updated successfully!';
                        this.dispatchPhoto(url);
                    }
                }).catch(() => { });
            });
        }
    }
    dispatchPhoto = async (url) => {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { photoURL: url }).catch((error) => { console.log(error); });
            store.dispatch(accImage(url));
        }
    };
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
], ContactPhoto.prototype, "user", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], ContactPhoto.prototype, "login", void 0);
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
customElements.define('contact-photo', ContactPhoto);
//# sourceMappingURL=uploader.js.map

import { html, css, LitElement, CSSResultArray }   from 'lit';
import { property, state }          from 'lit/decorators.js';
import { store, AppState }          from '../../../store';
import { connect }                  from 'pwa-helpers';
import { auth, storage, user }      from '../../../firebase/authentication';
import { updateProfile }            from 'firebase/auth';
import { accImage }                 from '../../../redux/backend';
import { ref, updateMetadata, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { labelStyle } from '../../form/css/label';

export class ContactPhoto extends connect(store)(LitElement) {

  /** @attr photo */
  @property() public photo : string | void | any = '';

  /** @attr emptyArtwork */
  @property({type: String, reflect: true}) public emptyArtwork = '';

  @state() private user : string | void = '';
  @state() private login : boolean = false;
  //@state() private uploadProgress = 0;
  //@state() private uploadComplete = false;

  @state() private progress: number = 0;
  // @state() private downloadURL: string = '';
  @state() private error: string = '';
  @state() private status: string = '';


  constructor() {
    super();
    this.progress = 0;
    // this.downloadURL = '';
    this.error = '';
    this.status = '';
  }

  stateChanged(state: AppState) {
    this.login    = state.frontend!.login;
    this.user     = state.backend!.userId;
    this.photo    = state.backend!.photoURL;
  }

  // protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

  // }

  static get styles():CSSResultArray {
    return[
      labelStyle,
      css`

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        grid-gap:                 16px;
        grid-template-rows:       auto 1fr auto;
        grid-template-columns:    1fr;
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
    ]
  }

  protected render() {
    return html`
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





/*

  private appendToFileLocation(filePath: string, appendString: string): string {

    const lastDotIndex = filePath.lastIndexOf('.'); // Find the last dot to get the file extension
    
    if (lastDotIndex <= 0) return filePath; // If there's no dot or it's at the beginning, don't alter the filePath

    const basePath    = filePath.substring(0, lastDotIndex); // Slice the filePath into the base path and extension
    const extension   = filePath.substring(lastDotIndex); // Includes the dot
    
    // console.log('path: ', basePath, appendString, extension);

    return `${basePath}${appendString}${extension}`; // Append the string and add the extension back
  }

*/


  // Save Image to Storage and Database - Update Profile Photo URL in Database and State 
  private async saveImage() {

    // Select Progress Bar
    const uploader: HTMLProgressElement  = this.shadowRoot!.querySelector('.uploader')!;


    if(auth.currentUser){

      this.error = '';
      this.status = 'Uploading...';


      // Select: File
      const file : any = this.shadowRoot!.querySelector('#photoURL');

      // If File Empty
      if (!file) {
        console.error('No file selected');
        return;
      }

      // Test Storage Reference location.fullPath  location.name location.bucket
      const location = ref(storage,
        "/" +
        "pwa-auth" + 
        "/" + 
        this.user + 
        "/" + 
        file.files[0].name );

      // const uploadTask = uploadBytesResumable(location, file);

      // Create metadata from file information
      const newMetadata = {
        cacheControl:   'public,max-age=300',
        contentType:    file.files[0].type     // 'image/jpeg'
      };





    // Upload - Blob or File API
      const uploadTask = uploadBytesResumable (location, file.files[0], newMetadata);// .then((snapshot:any) => {





      // Monitor upload progress
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Calculate progress percentage safely
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
      // Ensure progress is finite before setting
      if (isFinite(progress)) {
        uploader.value = progress;
        uploader.textContent = `${Math.round(progress)}%`;
      } else {
        uploader.value = 0;
        uploader.textContent = '0%';
      }
    },
    (error) => {
      // Handle errors
      this.error = `Upload failed: ${error.message}`;
      this.status = '';

      console.error('Upload failed:', error);
      uploader.value = 0;
      uploader.textContent = 'Error';
      // uploadButton.disabled = false;
    },
    async () => {
      // Upload completed successfully


  
        // Get URL
       await getDownloadURL(uploadTask.snapshot.ref)
          .then( (url:any) => {

            // Update metadata properties
            updateMetadata(location, newMetadata)
              .then((/*metadata:any*/) => { /* console.log("metadata: ", metadata); */ }).catch((error:any) => { console.log("error: ", error); });
      
             // To Do: Save Minified Photo - Service
             // const modifiedFilePath = this.appendToFileLocation(url, '_400x400');
             // console.log('modifiedFilePath', modifiedFilePath);

            if (user) {
              
              updateProfile(user, { photoURL: url })
                .then(() => {
                  // console.log('Profile picture updated successfully');
                  uploader.value = 100;
                  uploader.textContent = 'Complete';
                });

                this.status = 'User profile updated successfully!';

              // const resizedLocation = ref(storage, 'images/article/' + file.name + '_400x400' ); // Path where the image will be stored in Firebase Storage

              // Save URL
              this.dispatchPhoto(url);

            } // End If Statement

        }).catch( () => {} );

     // }).catch( () => {} );

    });

      

    } // End - if (auth.currentUser) {}

    

  }

  // UPDATE - PROFILE + Firestore Database + STATE - SAVE FILE LOCATION
  private dispatchPhoto = async (url:string) => {

    if ( auth.currentUser ) {

      // Update Profile Photo URL in Database - Firestore
      await updateProfile( auth.currentUser, { photoURL: url }).catch((error:Error) => { console.log(error); });

      // Update Profile Photo URL in State - Redux
      store.dispatch( accImage(url) );

    }

  }

}

customElements.define('contact-photo', ContactPhoto);

declare global {
  interface HTMLElementTagNameMap {
      'contact-photo': ContactPhoto;
  }
}


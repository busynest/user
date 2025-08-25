
import { html, css, LitElement, CSSResult, PropertyValueMap }   from 'lit';
import { property, state }          from 'lit/decorators.js';
import { store, AppState }          from '../../store';
import { connect }                  from 'pwa-helpers';
import { application, auth, db, storage }        from '../../firebase/start';
import { iconAuth }                 from '../../redux/frontend';
import { updateProfile }            from 'firebase/auth';
import { doc, updateDoc }           from 'firebase/firestore';
import { getStorage, ref, uploadBytes, updateMetadata, getDownloadURL, StorageReference } from "@firebase/storage";
import { accImage } from '../../redux/backend';


/*

/*
      // Local Development Server
      if ( location.hostname === 'localhost') {
        console.log("localhost detected!");
        connect = {
          apiKey:             "AIzaSyAJfm5MahdHr4HzwRLWN7IBhVYXMjP65lQ",
          authDomain:         "inmostfire.firebaseapp.com",
          databaseURL:        "http://localhost:9000?ns=emulationui",
          projectId:          "inmostfire",
          storageBucket:      "inmostfire.firebasestorage.app",
          messagingSenderId:  "937289126032",
          appId:              "1:937289126032:web:0e7f4b679b0f3da6",
          measurementId:      "G-DKMV2HFJGE"
        };

      }
*/


    <!-- Google tag (gtag.js) 
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DKMV2HFJGE"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('set', {'cookie_flags': 'SameSite=None;Secure'});
      gtag('js', new Date());
      gtag('config', 'G-DKMV2HFJGE');
    </script>
<!--
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld8R6orAAAAAIrAQBX7E_p-rPL7F290cMXaKiFS"></script>
  -->

    <!-- Cross-Origin Resource Sharing (CORS) 
    <meta
      http-equiv="Content-Security-Policy"
      content="
        default-src 'self';
        img-src 'self' https://firebasestorage.googleapis.com https://storage.googleapis.com;
        media-src 'self' https://firebasestorage.googleapis.com;
        connect-src 'self' https://firebasestorage.googleapis.com https://www.google-analytics.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://identitytoolkit.googleapis.com;
        style-src 'self' 'unsafe-inline' ;
        upgrade-insecure-requests;
        base-uri 'self';
        ">-->

*/

// UploadPhoto is a LitElement that only renders its content, if it is actually visible.
// It is a custom element that allows the user to upload a photo to their profile.

export class ContactPhoto extends connect(store)(LitElement) {

  /** @attr photo */
  @property() public photo : string | void | any = '';

  @state() private user : string | void = '';
  // @state() private uploadProgress = 0;
  // private uploadComplete = false;

  constructor() {
    super();
  }

  stateChanged(state: AppState) {
    this.user     = state.backend!.userId;
    this.photo    = state.backend!.photoURL;
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    console.log("contractor photo: ", this.photo);
  }

static get styles():CSSResult {
  return css`

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        grid-template-columns:    1fr;
        grid-gap:                 4px;
        width:                    100%;
        border-top:               2px solid var(--pwa_divider);
      }

      .contractorPhoto {
        border-radius:            50%;
        overflow:                 hidden;
        margin:                   auto;
        border:                   2px solid #303030;
        box-shadow:               1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
      }

      label {
        color:                var(--pwa_label_text_color);
        box-sizing:           border-box;
        width:                100%;
        font-size:            smaller;
        margin:               auto;
        margin-bottom:        0;
        font-weight:          bold;
      }

    `
}

protected render() {
  return html`

  <!-- Input - Upload Image -->
  <input
    id      ="photoURL"
    type    ="file"
    name    ="photoURL"
    class   ="contractorPhoto"
    accept  ="image/*"
    @change ="${this.saveImage}"
    style   ="
      display:        none;
      cursor:         pointer;
      position:       absolute;
      z-index:        -1;
    "/>

  <label
    style="font-size: smaller; font-weight: bold; line-height: 36px;"
    for ="photoURL">Photo:
  
    <!-- Output - Retrieved Image -->
    <canvas
      style="
        margin:                 auto;
        height:                 200px;
        width:                  100%;
        background-image:       url(${this.photo});
        background-size:        contain;
        background-repeat:      no-repeat;
        background-position:    center;
        cursor:                 pointer;
        overflow:               hidden;
        box-sizing:             border-box;
      ">
      </canvas>

  </label>
    `;
}
































  private appendToFileLocation(filePath: string, appendString: string): string {

    const lastDotIndex = filePath.lastIndexOf('.'); // Find the last dot to get the file extension
    
    if (lastDotIndex <= 0) return filePath; // If there's no dot or it's at the beginning, don't alter the filePath

    const basePath    = filePath.substring(0, lastDotIndex); // Slice the filePath into the base path and extension
    const extension   = filePath.substring(lastDotIndex); // Includes the dot
    
    console.log('path: ', basePath, appendString, extension);

    return `${basePath}${appendString}${extension}`; // Append the string and add the extension back
  }









  
  private uploadImage = async (file:any) => {
    console.log('upload image');
    try {
        const storage = getStorage(application);
        const storageRef: StorageReference = ref(storage, 'images/' + file.name); // Path where the image will be stored in Firebase Storage

        // Update metadata properties
        // updateMetadata(location, newMetadata)

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);

        return downloadURL; // This is the URL you can use to access the image
    } catch (error) {
        console.error('Error uploading the file', error);
        throw error;
    }
};

















  // Save Image to Storage and Database - Update Profile Photo URL in Database and State 
  private async saveImage() {

    // Test: Entry
    console.log('Entry: save image');

    // let uploader  : any = this.shadowRoot!.querySelector('.uploader');  // Select Progress Bar
    const file : any = this.shadowRoot!.querySelector('#photoURL');

    // Test: File
    console.log('file: ', file);

    if (!file) {
      console.error('No file selected');
      return;
    }

    // const storages = getStorage(application);
    // Test Storage Reference location.fullPath  location.name location.bucket
    const location = ref(storage,
      "/" +
      "pwa-auth" + 
      "/" + 
      this.user + 
      "/" + 
      file.files[0].name );
    
    console.log('location: ', location);


    /** @type {any} */
    // Create metadata from file information
    const newMetadata = {
      cacheControl:   'public,max-age=300',
      contentType:    file.files[0].type     // 'image/jpeg'
    };

    console.log('metadata: ', newMetadata);

    // Update metadata properties
    updateMetadata(location, newMetadata)
      .then((metadata:any) => { console.log("metadata: ", metadata); }).catch((error:any) => { console.log("error: ", error); });
    
    // Upload - Blob or File API
    // const blob = await
    uploadBytes (location, file.files[0], newMetadata).then((snapshot:any) => {
        console.log('uploading: ', snapshot);
      // Get URL
      getDownloadURL(snapshot.ref)
        .then( (url:any) => {

          const modifiedFilePath = this.appendToFileLocation(url, '_400x400');
          console.log('modifiedFilePath', modifiedFilePath);

          console.log('url', url);
          // Save URL
          this.personalPhoto(url);
          // let canvas = "https://storage.googleapis.com/v0/b/contractors-centre.appspot.com/o/images/photo.jpg";

      }).then(
        // let canvas = "https://storage.googleapis.com/{bucket}/{path}";
      ).catch( () => {} );

    }).catch( () => {} );

  }



























// UPDATE - PROFILE + Firestore Database + STATE - SAVE FILE LOCATION
private personalPhoto = async (url:string) => {

console.log('database save image');

if ( auth.currentUser ) {
  console.log("Entry to save database");

  // Memory allocation for Firestore Database
  // let personal = doc(db, "users", auth.currentUser.uid);
  // let publish  = doc(db, "contractors", auth.currentUser.uid);

  // Update Profile Photo URL in Database - Firestore
  await updateProfile( auth.currentUser, { photoURL: url }).catch((error:Error) => { console.log(error); });
  // await updateDoc( personal,  { "contractorPhoto": url } );
  // await updateDoc( publish,   { "contractorPhoto": url } );
  console.log("Dispatch Photo");
  // Update Profile Photo URL in State - Redux
  store.dispatch( accImage(url) );
  // store.dispatch( iconAuth(url) );

  // store.dispatch( businessPhoto(url) ); // store.profile.photoURL
  }

}









































}

customElements.define('contact-photo', ContactPhoto);

declare global {
  interface HTMLElementTagNameMap {
      'contact-photo': ContactPhoto;
  }
}




    // const resizedLocation = ref(storage, 'images/article/' + file.name + '_400x400' ); // Path where the image will be stored in Firebase Storage

    // Reset progress bar
    // const percentage  = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 0;
    // uploader.value    = percentage;
    // console.log('meta size: ', snapshot.metadata);

    // show progress bar upload
    // const percentage  = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
    // uploader.value    = percentage;







    // .then(() => {
    // store.dispatch( businessPhoto(url) );  // Redux Profile Update
    // store.dispatch( individual_Photo(url) );
    // }).catch((error:any) => { console.log(error); });

    /*






      .button-wrap {
        position: relative;
      }

      .button {
        cursor:             pointer;
        display:            inline-block;
        padding:            12px 18px;
        border-radius:      5px;
        background-color:   #8ebf42;
        font-size:          16px;
        font-weight:        bold;
        color:              #fff;
      }
/*
      progress[value]::-webkit-progress-bar {
        background-color:   #eee;
        border-radius:      2px;
        box-shadow:         0 2px 5px rgba(0, 0, 0, 0.25) inset;
      }

      progress[value]::-webkit-progress-value {
        border-radius:    2px; 
        background-size:  35px 20px, 100% 100%, 100% 100%;
        background-image:
          -webkit-linear-gradient( -45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, 
          rgba(0,0, 0, .1) 66%, transparent 66%),
          -webkit-linear-gradient( top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25) ),
          -webkit-linear-gradient(left, #09c, #f44);
      }



      <!--
    <progress
      class="uploader"
      value   ="0"
      max     ="100"
      style="
        height:               6px;
        width:                100%;
        width:                64px;
        border:               0;
        -webkit-appearance:   none;
        appearance:           none;
      "></progress>
      -->
    <!-- Display Photo 
    <input
      type="image"
      class="userImage"
      id="image"
      alt="user"
      height="171px"
      width="171px"
      src="\${this._photoURL}">  -->
    
    // let storage   : any = getStorage();




    <!-- File Uploader -->
<div style="
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr;
  margin-top: 16px;
  ">

 

</div>

    <button
    class="delete"
    style="
      padding: 12px 18px;
      border-radius: 5px;
      background-color: #8ebf42;
      font-weight: bold;
      color: #fff;
    ">Delete Photo</button>

    */
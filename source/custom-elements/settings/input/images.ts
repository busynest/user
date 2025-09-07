import { ref } from "@firebase/storage";
import { storage } from "../../../firebase/start";
/*
export const uploadIcon = (uploader, file) => {

  const uploader  = this.shadowRoot!.querySelector('#uploader');
  const file      = this.shadowRoot!.querySelector('#fileupload')!.files[0];

  const now       = storageRef.child('/images/' + file.name );

  const task      = now.put(file);

  task.on('state_changed',
    function progress(snapshot: object) { const percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100; uploader.value = percentage },
    // function error(error: object) { error },
    // function complete() { }
  )

  this._imagePath = file.name;
  console.log(this._imagePath);

}
*/
// Reference the total number of existing documents
export const _listImages = () => {

    // Create a reference under which you want to list
    const storageRef:any  = ref(storage);
  
    // Reference to list
    const listRef = storageRef
      .child('images/'); // .child('images/'+this._userID+'/'+);
  
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then( (res:any) => {
  
          console.log('res:', res);
  
          res
            .prefixes
            .forEach( (folderRef:any) => {
              console.log('folderRef: ', folderRef);
             }); // You may call listAll() recursively on them. // All the prefixes under listRef.
  
          res
            .items
            .forEach( (itemRef:any) => {
              console.log('itemRef: ', itemRef);
            });
          
          }).catch( (error:any) => { console.log("Could not get storage items: ", error)});
  }

  
 

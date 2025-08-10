import { sendPasswordResetEmail } from "firebase/auth";

// Reference the total number of existing documents
export const _listImages = () => {

    // Create a reference under which you want to list
    const storageRef:any  =
      storage
      .ref();
  
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

  
  export const restPasswordcode = async () => {
    let x:any = document!.querySelector('.resetEmail')!
    let email = x.value;

    await sendPasswordResetEmail( email, email )
    .catch( (error:any) => { console.log(error); } );
  }

    /*
  let actionCodeSettings = {
    url: 'https://www.contractorscentre.com',
    handleCodeInApp: true
  };
  */

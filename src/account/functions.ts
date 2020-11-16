
// Reference the total number of existing documents
export const _listImages = () => {

    // @ts-ignore -- Reference to project's storage bucket.
    const storageRef:any  = firebase
      .storage()
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

  
  export const _restCode = () => {
    let x:any = document!.querySelector('.resetEmail')!
    let email = x.value

    let actionCodeSettings = {
      url: 'https://www.contractorscentre.com',
      handleCodeInApp: true
    };

    // @ts-ignore
    firebase
      .auth()
      .sendPasswordResetEmail( email, actionCodeSettings )
      .catch( (error:any) => { console.log(error); } );
  }

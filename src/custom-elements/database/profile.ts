import { user } from "../../firebase/start";

   export const updateInformation = (id :any, person: any, username: any, phone: any, list: any) => {
      //const person : any        = this._name;
      //const username : any      = this.shadowRoot!.querySelector('.pwa-name');
      //const phone : any         = this.shadowRoot!.querySelector('input-telephone');
      //const list : any          = this.shadowRoot!.getElementById('list');
      // if( username === null ) { username === id }
      // const photo         = this.shadowRoot.getElementById('');
      // const company         = this.shadowRoot.getElementById('company').value;
      // const enroll          = this.shadowRoot.getElementById('who').value;
      if (user) {
        person.updateProfile({
          displayName: username
          //  phoneNumber: phone.telephone
          // photoURL: ""
        })
        .then( () => {
          alert(
          'updated name:' + username.value +
          'updated phone:' + phone.value +
          'Public Profile:' + list.checked
          );
        })
        .catch( (error: object) =>{ console.error('Error writing new message to Firebase Database', error); });
/*
        firestore.collection("users").doc(user.id).set({
          company:             user.id,
          enrollment:          list
          // location:         this.location,
        })
          .then( () => { console.log("Document successfully written!"); })
          .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });    */
      }
      // location.reload();
    }
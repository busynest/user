import { ref } from "@firebase/storage";
import { storage } from "../../../firebase/authentication";
export const _listImages = () => {
    const storageRef = ref(storage);
    const listRef = storageRef
        .child('images/');
    listRef
        .listAll()
        .then((res) => {
        console.log('res:', res);
        res
            .prefixes
            .forEach((folderRef) => {
            console.log('folderRef: ', folderRef);
        });
        res
            .items
            .forEach((itemRef) => {
            console.log('itemRef: ', itemRef);
        });
    }).catch((error) => { console.log("Could not get storage items: ", error); });
};

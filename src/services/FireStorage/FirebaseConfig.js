import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore/lite";
import {getStorage} from "firebase/storage";

/**
 * Firebase Config provee acceso a diferentes servicios
 * @returns {{app: FirebaseApp, storage: FirebaseStorage, db: Firestore}}
 * @constructor
 */
export const FirebaseConfig = () => {

    //Configuracion de firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAlXIahMzstlsfCqekrx78z0WTvfbSZk7o",
        authDomain: "tripsv-fda93.firebaseapp.com",
        projectId: "tripsv-fda93",
        storageBucket: "tripsv-fda93.appspot.com",
        messagingSenderId: "677864174054",
        appId: "1:677864174054:web:ba66b5b5160450a2226627"

    };

    //Inicializador de los servicios
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    return {
        app,
        db,
        storage
    }

}
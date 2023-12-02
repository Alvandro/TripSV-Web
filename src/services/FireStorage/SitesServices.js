import { uploadBytes, getDownloadURL, ref, listAll, deleteObject } from 'firebase/storage';
import { collection, getDocs, addDoc, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseConfig } from "./FirebaseConfig";


export const SitesServices = () => {

    const { storage, db } = FirebaseConfig();

    /**
     * Traer todas las imagenes de un folder especifico
     * @param nameFolder es el nombre de la carpeta
     * @param docId es el nombre de la subCarpeta que esta asociado con un id
     */
    async function getImageByDoc(nameFolder, docId) {
        const folderRef = ref(storage, nameFolder + "/" + docId + "/");

        try {
            const result = await listAll(folderRef);
            const urls = await Promise.all(
                result.items.map((item) => getDownloadURL(item))
            );

            return urls; // Retorna el array de URLs de descarga
        } catch (error) {

            throw new Error("Error al obtener las imágenes");
        }
    }

    /**
     * Trae todos los datos de una collecion especifica
     * @param nameCollection nombre de la collecion
     * @returns {Promise<DocumentData[]>}
     */
    async function getAllDocs(nameCollection) {

        const citiesCol = collection(db, nameCollection);
        const citySnapshot = await getDocs(citiesCol);

        const cityList = await Promise.all(citySnapshot.docs.map(async (doc) => {
            const docData = doc.data();
            const image = [];

            try {
                const images = await getImageByDoc(nameCollection, doc.id);
                image.push(images);
            } catch (error) {

            }
            return { ...docData, id: doc.id, imagenes: image };
        }));

        return cityList;
    }

    async function getSitesByStateWhere(key, value, colleccion) {
        const siteRef = collection(db, colleccion);
        const q = query(siteRef, where(key, "==", value));
        const informacion = [];

        try {
            const querySnapshot = await getDocs(q);

            const imagenesPromises = querySnapshot.docs.map(async (docs) => {
                const x = await getImageByDoc(colleccion, docs.id);
                informacion.push({ id: docs.id, imagenes: x, data: docs.data() });
            });

            await Promise.all(imagenesPromises);
        } catch (err) {
            throw new Error("Fallo al traer los sitios para revision");
        }

        return informacion;
    }


    async function deletePlace(id, nameColeccion) {
        const folderRef = ref(storage, nameColeccion + "/" + id);
        const docRef = doc(collection(db, nameColeccion), id);
        try {
            //Eliminar documento
            await deleteDoc(docRef)
            // Obtén una lista de todos los archivos en la carpeta
            const filesList = await listAll(folderRef);

            // Elimina cada archivo de la carpeta
            const deletePromises = filesList.items.map((file) => {
                return deleteObject(file);
            });

            // Espera a que se completen todas las eliminaciones de archivos
            await Promise.all(deletePromises);

            // Elimina la carpeta en sí
            await deleteObject(folderRef);


        } catch (error) {
            throw new Error("Error al eliminar la carpeta")
        }

    }

    /**
     * Esta funcion sube a firebase
     * @param doc resive el objeto que se subira
     * @param nameCollection resive el nombre a la coleccion que se desea subir
     * @returns {Promise<DocumentReference<DocumentData>>}
     */
    async function nuevoDoc(doc, nameCollection) {
        return await addDoc(collection(db, nameCollection), doc)
    }

    /**
     * Sube imagenes a firestore esta la asocia a documentos
     * @param collectionReferencia recibe la referencia que contiene el nombre de la coleccion y el id
     * @param imagen recibe la imagen de links de imagenes para subirlas
     * @param valorImagen aqui resive el nombre con el cual se subira
     * @returns {Promise<void>}
     */
    async function subirImagenes(collectionReferencia, imagen, valorImagen) {

        const folderName = collectionReferencia[0] + "/";
        const collecionId = collectionReferencia[1] + "/"
        const nombre = valorImagen + imagen.substring(imagen.lastIndexOf("/") + 1)

        const extension = imagen.substring(imagen.lastIndexOf('.') + 1).toLowerCase();

        try {
            const storageRef = ref(storage, folderName + collecionId + nombre);

            // Convierte los datos de la imagen a un blob
            const respuesta = await fetch(imagen)
            const blob = await respuesta.blob()

            // Subir la imagen a Firebase LocalStorage
            const snapshot = await uploadBytes(storageRef, blob);


            // // Obtener la URL de descarga de la imagen
            // const downloadURL = await getDownloadURL(snapshot.ref);
            //
            // // Retornar la URL de descarga
            // return downloadURL;
        } catch (error) {

            throw new Error("Ocurrio un error al subir las imagenes");
        }
    }


    // Función para modificar un campo en un documento
    async function updateFieldDocumentState(nameColeccion, docId, nuevoValor) {
        const docRef = doc(db, nameColeccion, docId)
        try {
            await updateDoc(docRef, { estado: nuevoValor });
        } catch (err) {
            throw new Error("Fallo al actualizar")
        }
    }

    return {
        getAllDocs,
        subirImagenes,
        nuevoDoc,
        getSitesByStateWhere,
        updateFieldDocumentState,
        deletePlace
    }
}


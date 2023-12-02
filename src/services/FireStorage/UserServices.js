import { getDoc, doc, setDoc, query, where, getDocs, updateDoc } from 'firebase/firestore/lite';
import { FirebaseConfig } from "./FirebaseConfig";
import { collection } from "firebase/firestore/lite";

export const UserServices = () => {
    const { db } = FirebaseConfig();

    //Realiza peticion a la coleccion se usuarios
    //Si el usuario no esta en la collecion es primera ves que se autentica
    //Si el usuario esta autenticado trae el rol
    //Si es primera ves que se autentica el usuario se crea con un rol
    const manageRoleUser = async (uid, email) => {
        const userRef = doc(db, "usuario", uid)
        try {
            const documentSnapshot = await getDoc(userRef);
            if (!documentSnapshot.exists()) {
                setDoc(userRef, {
                    email: email,
                    role: "usuario"
                }).then(x => {
                    return x;
                }).catch(err => {
                    throw new Error("Fallo al subir el documento")
                })
                return manageRoleUser(uid, email)
            }
            return documentSnapshot.data();
        } catch (err) {
            throw new Error("No se encontro el usuario")
        }
    }


    async function getUsersByRol(key, rolValue, collecion) {
        const siteRef = collection(db, collecion);
        const q = query(siteRef, where(key, "==", rolValue));

        try {
            const querySnapshot = await getDocs(q);
            const datos = querySnapshot.docs.map((docs) => {
                const { email, role } = docs.data(); // Obtener solo email y role de cada documento
                return { email, role, id: docs.id };
            })
            return datos;
        } catch (err) {
            throw new Error("No se pudo traer");
        }
    }

    async function searchRoleByEmail(email, collecion) {
        const userRef = collection(db, collecion);
        const q = query(userRef, where("email", "==", email), where("role", "==", "usuario"));

        try {
            const querySnapshot = await getDocs(q);
            const datos = querySnapshot.docs.map((docs) => {
                const { email, role } = docs.data(); // Obtener solo email y role de cada documento

                return { email, role, id: docs.id };
            })
            return datos;
        } catch (err) {
            throw new Error("No se pudo traer");
        }
    }

    async function changeRoleUser(user, newRol, collectionName, documentId,) {
        const docRef = doc(db, collectionName, documentId);
        const newData = {
            email: user,
            role: newRol
        }
        try {
            await updateDoc(docRef, newData);

        } catch (error) {
            throw new Error("No se pudo cambiar el rol");
        }
    }

    return {
        manageRoleUser,
        getUsersByRol,
        changeRoleUser,
        searchRoleByEmail
    }
}
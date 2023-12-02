import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import { redirect } from "react-router-dom";
import { FirebaseConfig } from "../FireStorage/FirebaseConfig";
import { useContext, useEffect, useState } from "react";
import { userCouchInfo } from "../CouchDb/database_roles";
import { useLocation } from "react-router-dom";
import { UserProvider } from "../../main";
export const AutenticacionServices = () => {
    const { userState, setUserState } = useContext(UserProvider);
    const { app } = FirebaseConfig();
    const rutaActual = useLocation().pathname;
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => {
            unsubscribe();
        };
    }, [user]);

    function reloguearse() {

        const roleLocalStorage = localStorage.getItem('role');
        if (roleLocalStorage) {
            setUserState({
                logeado: true,
                role: roleLocalStorage
            })
        }

    }

    const handleSignIn = async () => {

        const login = await signInWithPopup(auth, provider);


        const newRole = {
            email: login.user.email,
            role: "usuario"
        }

        const roleResponse = await userCouchInfo(login.user.uid, newRole);
        localStorage.setItem('role', roleResponse.role);

        setUserState({
            logeado: true,
            role: roleResponse.role
        })

        window.location.href = "/inicio";

    };

    // funcion para cerrar secion
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                localStorage.removeItem('role')
                localStorage.removeItem('email')

            })
            .catch((error) => {

            });
        window.location.href = "/";
    };

    return {
        handleSignIn,
        handleSignOut,
        user,
        reloguearse,
        userEmail: user ? user.email : null, //valida aeso antes de enviar el correo
    };
};
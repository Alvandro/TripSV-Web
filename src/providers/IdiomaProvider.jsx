import React, { createContext, useEffect, useState } from 'react';



export const IdiomaContext = createContext('');

export const IdiomaProvider = ({ children }) => {
    const [idioma, setIdioma] = useState('es');

    /*
    * para cargar el idioma almacenado si hay alguno se comprueva
    * */
    useEffect(() => {
        const idiomaLocal = localStorage.getItem('idioma');
        if (idiomaLocal) {
            setIdioma(idiomaLocal);
        }
    }, []);


    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma }}>
            {children}
        </IdiomaContext.Provider>
    );
};

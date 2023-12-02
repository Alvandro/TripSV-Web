import { NotFoundIdiomas } from "./services/idiomas/NotFoundIdiomas.js";
import { useEffect, useContext } from "react";
import React from "react";
import { IdiomaContext } from "./providers/IdiomaProvider.jsx";
import {redirect} from "react-router-dom";

export default function NotFound() {

    useEffect(() => {
        setTimeout(() => {
            window.location.href ="/inicio"
        }, 2000)
    }, [])

    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <div className={"w-full h-screen bg-black flex justify-center flex-col items-center"}>
            <h1 className={"text-amber-50 font-bold text-3xl"}>{NotFoundIdiomas['Mensaje'][idioma]}</h1>
            <p className={"text-amber-50 text-2xl"}>{NotFoundIdiomas['Notpocible'][idioma]}</p>
            <p>
                <i className={"text-amber-50 text-5xl"}>{NotFoundIdiomas['error'][idioma]}</i>
            </p>
            <p className={"text-amber-50 "}>{NotFoundIdiomas['Redirigir'][idioma]}</p>

        </div>
    );
}
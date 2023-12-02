import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { FooterPage } from "../../services/idiomas/PantallaPresentacion.js"


export default function Footer(){
    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <footer className="bg-black opacity-60 text-white p-4 text-center">
            <div className="max-w-screen-lg mx-auto flex items-center justify-center">
                <img
                    src="https://www.uese.ues.edu.sv/images/minerva_sola_white.png"
                    alt="Logo Universidad de El Salvador"
                    className="w-8 h-10 mr-2"
                />
                <p className="mr-2 text-white font-bold">
                    {FooterPage['nombreU'][idioma]} &copy; 2023
                </p>
            </div>
        </footer>
    )
}
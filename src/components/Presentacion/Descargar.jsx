import {BiLogoPlayStore} from "react-icons/bi";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { descargar } from "../../services/idiomas/PantallaPresentacion"

export default function Descargar(){
    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <section id={"descarga"} className="bg-black bg-opacity-50 text-white p-8">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-4">{descargar['descargaApp'][idioma]}</h2>
                <p className="mb-6">
                    {descargar['descripcionDescarga'][idioma]}
                </p>
                <button className="bg-blue-700 flex items-center gap-4 text-white py-2 px-6 rounded-lg hover:bg-blue-800">
                    {descargar['descargarGooglePlay'][idioma]}
                    <BiLogoPlayStore/>
                </button>
            </div>
        </section>
    )
}
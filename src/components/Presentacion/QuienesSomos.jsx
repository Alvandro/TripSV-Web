import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { SeccionQuienesSomos } from "../../services/idiomas/PantallaPresentacion.js";

export default function QuienesSomos() {
    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <section id="quienes-somos" className="bg-gray-100 p-8">
           
                {/* En dispositivos pequeños, muestra primero la imagen y luego el texto */}
                <div className="sm:w-2/2 p-4 flex flex-col items-center sm:items-start">
                <h2 className="text-3xl font-semibold mb-4">{SeccionQuienesSomos['quienesSomos'][idioma]}</h2>
                    <img
                        src="/img/DSC_0480.jpg"
                        className="w-full h-auto rounded-lg shadow-md mb-4" /* Añadiendo la clase mb-4 para separar la imagen del texto */
                        alt="Equipo de TripSv"
                    />
                    
                </div>
                <div className="sm:w-2/2 p-4">
                    <p className="mb-6">
                        {SeccionQuienesSomos['parrafoUno'][idioma]}
                    </p>
                    <p className="mb-6">
                        {SeccionQuienesSomos['parrafoDos'][idioma]}
                    </p>
                    <p className="mb-6">
                        {SeccionQuienesSomos['parrafoTres'][idioma]}
                    </p>
                    <p className="mb-6">
                        {SeccionQuienesSomos['parrafoCuatro'][idioma]}
                    </p>
                </div>
        
        </section>
    );
}

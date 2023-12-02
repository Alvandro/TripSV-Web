import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { CaracteristicasPage } from "../../services/idiomas/PantallaPresentacion.js";

export default function Caracteristicas() {
    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <section id="caracteristicas" className="bg-gray-100 p-8">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-4">
                    {CaracteristicasPage['Caracter'][idioma]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP1'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP2'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP3'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP4'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP5'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP6'][idioma]}
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl text-amber-500 mr-2">
                            <i className="fas fa-search"></i>
                        </span>
                        {CaracteristicasPage['descripcionP7'][idioma]}
                    </div>
                </div>
            </div>
        </section>

    )
}
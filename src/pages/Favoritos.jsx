import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import { Tarjeta } from "../components/Favoritos/Targeta.jsx";
import { BanerPublicidad } from "../components/banerPublicitario/BanerPublicidad.jsx";
import { PantallaFavorito } from "../services/idiomas/PantallaFavorito.js";
import { PantallaInicio } from "../services/idiomas/PantallaInicio.js";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { getAllSites } from "../services/CouchDb/database_sitios.js";
import { Link } from "react-router-dom";
/**
 * Componente Favoritos
 * @returns {JSX.Element}
 */
export default function Favoritos() {
    const [recargar, setRecargar] = useState(0);
    const [sitios, setSitios] = useState([]);
    const { idioma } = useContext(IdiomaContext);
    const [primeraCarga, setPrimeraCarga] = useState(false);


    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await getAllSites(1);
                const filtro = response.filter((sitio) => {
                    return localStorage.getItem(sitio._id) !== null;
                });
                setSitios(filtro);
                setPrimeraCarga(true); // Marcar como no la primera carga
            } catch (error) {

            }
        };

        if (recargar === 0) {
            fetchSites();
        }
        setRecargar(1);
    }, [recargar]);



    function actualizar() {
        const filtro = sitios.filter((sitio) => {
            return localStorage.getItem(sitio._id) !== null;
        });
        setSitios(filtro);

    }


    return (
        <div className="h-screen overflow-y-scroll p-4">
            <Banner title={PantallaFavorito["tituloTexto"][idioma]} />
            <div className="container mx-auto">
                {primeraCarga && sitios.length === 0 && (
                    <div
                        class="bg-yellow-200 border-l-4 border-yellow-500 p-4 my-4 h-full w-full flex justify-start items-start"
                        x-show="mostrarAdvertencia"
                    >
                        <p class="text-yellow-800 font-bold">
                            {PantallaInicio["advertencia"][idioma]}:&nbsp;
                        </p>
                        <p>{PantallaInicio["mensajeDeAdvertencia"][idioma]}</p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                {sitios.map((sitio, index) => {
                    return <Tarjeta key={index} sitio={sitio} actualizar={actualizar} />
                })}
            </div>
            <BanerPublicidad></BanerPublicidad>
        </div>
    );
}

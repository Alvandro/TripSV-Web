import React, { useContext, useEffect, useState } from "react";
import Card from "../components/AdministrarSitios/Card";
import Banner from "../components/Banner";
import Estadisticas from "../components/AdministrarSitios/Estadisticas";
import { PantallaAdministrarSitios } from "../services/idiomas/PantallaAdministrarSitio";
import { IdiomaContext } from "../providers/IdiomaProvider";
import { getAllSites } from "../services/CouchDb/database_sitios.js";
import { count_site } from "../services/CouchDb/count_site.js";
/*Terminado con exito*/

export default function AdministracionSitios() {

    const arrayVacio = [...Array(10).fill()];
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const [sitios, setSitios] = useState([]);
    const [estado, setEstado] = useState(0)
    const [actualizar, setAcut] = useState(0)

    const [pendientes, setPendientes] = useState(0);
    const [aprobados, setAprobados] = useState(0);
    const [denegados, setDenegados] = useState(0);

    function manejarClic(estado) {
        setEstado(estado)

    }


    useEffect(() => {
        const obtenerRecuentos = async () => {
            try {
                const countPendientes = await count_site(0);
                const countAprobados = await count_site(1);
                const countDenegados = await count_site(2);

                setPendientes(countPendientes);
                setAprobados(countAprobados);
                setDenegados(countDenegados);
            } catch (error) {

            }
        };

        obtenerRecuentos();
        if (actualizar > 0) {
            const timeoutId = setTimeout(async () => {
                const response = await getAllSites(estado);
                setSitios(response);
            }, 2000); // 1000 milisegundos (1 segundo)

            return () => {
                // Limpia el timeout si el componente se desmonta o se actualiza antes de que se cumpla el tiempo
                clearTimeout(timeoutId);
            };
        } else {


            async function loadSites() {
                const response = await getAllSites(estado);
                setSitios(response);
            }

            loadSites();
        }
    }, [estado, actualizar]);


    return (
        <div className="p-4 h-screen w-full overflow-y-scroll">
            <Banner title={PantallaAdministrarSitios['tituloAdministrarSitio'][idioma]} />

            <Estadisticas
                aprobados={aprobados}
                denegados={denegados}
                pendientes={pendientes}
                estado={manejarClic}
                sitiosAprobados={PantallaAdministrarSitios['sitiosAprobados'][idioma]}
                sitiosDenegados={PantallaAdministrarSitios['sitiosDenegados'][idioma]}
                sitiosPendientes={PantallaAdministrarSitios['sitiosPendientes'][idioma]}
            />


            <div className="w-full my-2 box-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sitios.map((sitio, index) => (
                    // 
                    <Card dato={actualizar} fun={setAcut} key={index} sitio={sitio} />
                ))}
            </div>
        </div>
    );
}


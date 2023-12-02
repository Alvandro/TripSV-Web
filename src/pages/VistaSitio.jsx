import HorarioTable from "../components/VistaSitio/HorarioTable.jsx";
import CarruselImages from "../components/VistaSitio/CarruselImages.jsx";
import Precios from "../components/VistaSitio/Precios.jsx";
import OneColumnTable from "../components/VistaSitio/OneColumnTable.jsx";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { useContext } from "react";
import { PantallaVerSitio } from "../services/idiomas/PantallaVerSitio.js";
import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import ServicesCategoriesPriceIdiom from "../services/idiomas/ServicesCategoriesPriceIdiom.js";

export default function VistaSitio() {
    // El estate contiene el sitio que se va a mostrar el sitio como tal tiene toda la informacion
    // de aqui se puede obtendra el sitio para favoritos
    let { state } = useLocation();
    // Hacemos destructuring del sitio para poder mostrar la info
    let {
        imagenes,
        estado,
        email,
        titulo,
        descripcionLugar,
        telefono,
        ubicacion,
        departamento,
        precio,
        servicios,
        categorias,
        horario
    } = state.sitio;
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const [estadoFavorito, setEstadoFavorito] = useState(verificarEnLocalStorage(state.sitio._id));
    const data = ServicesCategoriesPriceIdiom();
    const PriceIdiom = data.PriceIdiom;
    const ServiciosIdiom = data.ServiciosIdiom;
    const CategoriesIdiom = data.CategoriesIdiom;
    const HeadersHorarios = [
        PantallaVerSitio['Dia'][idioma],      // Traduce 'Dia' según el idioma seleccionado
        PantallaVerSitio['Horario'][idioma],  // Traduce 'Horario' según el idioma seleccionado
    ];


    //Verifica si el sitio esta agregado a favorito
    function verificarEnLocalStorage(key) {
        const valor = localStorage.getItem(key);
        return valor !== null;
    }

    //Guarda en favorito o elimina
    const guardarFavorito = () => {
        if (estadoFavorito) {
            localStorage.removeItem(state.sitio._id);
        } else {
            localStorage.setItem(state.sitio._id, "Pendiente");
        }

        setEstadoFavorito(!estadoFavorito)
    }
    /*    "ubicacion": {
            "latitude": 13.695297023750516,
                "longitude": -89.32029720492565
        },*/

    let contUndefined = 0;
    return (
        <div className='w-full h-screen sm:p-4 box-border overflow-y-scroll grid grid-cols-5 '>
            {/*Primera seccion esta mantiene carrusel titulo botones, servicios y categorias*/}
            <div className={"col-span-5 sm:col-span-3 p-2 sm:p-4"}>
                <CarruselImages imagenes={imagenes} />
                {/*Botones*/}
                <div className={" col-span-3 p-2 sm:p-4 grid grid-cols-4 gap-2 items-center"}>
                    <p className={"col-span-2 font-bold text-xl"}>{titulo[idioma].toUpperCase()}
                        {<br />}
                        {departamento}</p>
                    <button
                        onClick={guardarFavorito}
                        className={`rounded py-2 ${estadoFavorito
                            ? 'bg-yellow-300 hover:bg-yellow-400' // Si es favorito, amarillo suave
                            : 'bg-gray-200 hover:bg-gray-300' // Si no es favorito, gris suave
                            }`}
                    >
                        {estadoFavorito
                            ? PantallaVerSitio['Agregado'][idioma]
                            : PantallaVerSitio['Agregar'][idioma]
                        }
                    </button>

                    {ubicacion &&
                        <button
                            className="rounded bg-gray-200 hover:bg-gray-300 py-2"
                            onClick={() => {
                                const url = `https://www.google.com/maps?q=${ubicacion.latitude},${ubicacion.longitude}`;
                                window.open(url, '_blank');
                            }}
                        >
                            {PantallaVerSitio['Ubicacion'][idioma]}
                        </button>
                    }
                </div>
                {/*Descripcion*/}
                <div className={"p-2 sm:p-4"}>
                    <div className={"bg-slate-200 p-4 rounded"}>
                        <p className="py-2 text-lg font-bold">{PantallaVerSitio['Descripcion'][idioma]}</p>
                        <p className={""}> {descripcionLugar[idioma]}</p>
                    </div>
                </div>
                {/*    Servicios y Categorias*/}
                <div className={"grid grid-cols-2 gap-4 p-4"}>
                    <OneColumnTable tituloTabla="Servicios" servicios={servicios} data={ServiciosIdiom} />
                    <OneColumnTable tituloTabla={"Categoria"} servicios={categorias}
                        data={CategoriesIdiom}></OneColumnTable>
                </div>
            </div>

            {/*Esta es la segunda seccion mantiene el horario y mantiene los precios*/}
            <div className={"col-span-5 sm:col-span-2 "}>
                <p className="font-bold text-2xl p-4">{PantallaVerSitio['HorarioVisita'][idioma]}</p>
                <HorarioTable data={horario} headers={["Dia", "Horario"]} />
                <p className="font-bold text-2xl p-4">{PantallaVerSitio['Precios'][idioma]}</p>

                <div className={"col-span-5 grid grid-cols-3 p-4 gap-4"}>
                    {/*Aqui se leera el objeto de precios y se hara un map*/}
                    {/*
                    <Precios titulo={PantallaVerSitio['Estudiantes'][idioma]} precio={PantallaVerSitio['Gratis'][idioma]} />
*/}
                    {
                        precio ? (
                            Object.keys(PriceIdiom).map((k) => (
                                (precio[k] !== undefined && precio[k] !== '') ? (
                                    <Precios key={k} titulo={PriceIdiom[k][idioma]} precio={precio[k]}></Precios>
                                ) : (
                                    contUndefined++,
                                    null
                                )
                            ))
                        ) : (
                            <div></div>
                        )
                    }
                    {
                        contUndefined === 8 ? (
                            <div className="col-span-3">
                                <p className="ml-2 text-black-300">{PantallaVerSitio['ValidacionPrecio'][idioma]}</p>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    {

                    }
                </div>
            </div>
        </div>
    )

}

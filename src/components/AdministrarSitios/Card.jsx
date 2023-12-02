import { AiFillCheckCircle, AiFillFrown } from "react-icons/ai";
import CarruselImages from "../VistaSitio/CarruselImages.jsx";
import OneColumnTable from "../VistaSitio/OneColumnTable.jsx";
import HorarioTable from "../VistaSitio/HorarioTable.jsx";
import React, { useContext } from "react";
import Precios from "../VistaSitio/Precios.jsx";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import couchdb_connection, { host } from "../../services/CouchDb/couchdb_connection.js";
import ServicesCategoriesPriceIdiom from "../../services/idiomas/ServicesCategoriesPriceIdiom.js";
import precios from "../AgregarSitios/Precios.jsx";
import { PantallaVerSitio } from "../../services/idiomas/PantallaVerSitio.js";


export default function Card(props) {
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const id = props.sitio._id
    const rev = props.sitio._rev


    const data = ServicesCategoriesPriceIdiom();

    // Accede a las propiedades del objeto devuelto
    const priceList = data.priceList;
    const PriceIdiom = data.PriceIdiom;
    const categoriesList = data.categoriesList;
    const CategoriesIdiom = data.CategoriesIdiom;
    const servicesList = data.servicesList;
    const ServiciosIdiom = data.ServiciosIdiom;
    const updateEstado = async (_id, _rev, newEstado) => {
        try {
            // Construye la URL completa del documento
            const documentURL = `${host}tripsv-sitios/${_id}`;

            // Realiza una solicitud GET para obtener el documento actual
            const responseGet = await couchdb_connection.get(documentURL);

            if (responseGet.status === 200) {
                // Obtiene el documento actual
                const existingDoc = responseGet.data;

                // Modifica el estado en el documento
                existingDoc.estado = newEstado;

                // Realiza la solicitud PUT para actualizar el documento
                const responsePut = await couchdb_connection.put(documentURL, existingDoc);

                if (responsePut.status === 201) {

                } else {

                }
            } else {

            }
        } catch (error) {

        }
    };



    const DenegarClick = async () => {
        updateEstado(id, rev, 2)
        props.fun(props.dato + 1);
    };

    const Pendientes = async () => {
        updateEstado(id, rev, 0)
        props.fun(props.dato + 1);
    };


    // Manejador de evento para el botón "Aprobar"
    const AprobarClick = () => {
        updateEstado(id, rev, 1)
        props.fun(props.dato + 1);
    };

    return (
        <div className="shadow rounded bg-slate-100 pb-4">
            <CarruselImages imagenes={props.sitio.imagenes} />
            <div className={"p-4"}>
                <p>{props.sitio.titulo[idioma]}</p>
                <p>Email:{props.sitio.email}</p>
                <p>{props.sitio.descripcionLugar[idioma]}</p>
                <HorarioTable data={props.sitio.horario} headers={["Dia", "Horario"]} />
                <div className={"grid grid-cols-2"}>
                    {/* Servicios y Categorias */}
                    <OneColumnTable tituloTabla="Servicios" servicios={props.sitio.servicios} data={ServiciosIdiom} />
                    <OneColumnTable tituloTabla={"Categoria"} servicios={props.sitio.categorias}
                        data={CategoriesIdiom}></OneColumnTable>
                </div>
            </div>
            <div className={"col-span-5 grid grid-cols-3 p-4 gap-4"}>
                {/* Aquí se leerá el objeto de precios y se hará un map */}
                {
                    props.sitio.precio ? (
                        Object.keys(PriceIdiom).map((k) => (
                            props.sitio.precio[k] !== undefined ? (
                                <Precios key={k} titulo={PriceIdiom[k][idioma]} precio={props.sitio.precio[k]}></Precios>
                            ) : null
                        ))
                    ) : (
                        <div></div>
                    )
                }


            </div>
            <div className="w-full p-2 flex justify-around gap-4">
                <button
                    className="text-red-400 p-2 rounded bg-red-200 hover-bg-red-500 flex items-center justify-around gap-2"
                    onClick={Pendientes}
                >
                    <AiFillFrown />
                    <small>Pendiente</small>
                </button>
                <button
                    className="text-red-400 p-2 rounded bg-red-200 hover-bg-red-500 flex items-center justify-around gap-2"
                    onClick={DenegarClick}
                >
                    <AiFillFrown />
                    <small>Denegar</small>
                </button>
                <button
                    className="text-green-400 p-2 rounded flex items-center gap-2 bg-green-200 hover-bg-green-500"
                    onClick={AprobarClick}
                >
                    <AiFillCheckCircle />
                    <small>Aprobar</small>
                </button>
                {props.sitio.ubicacion && (
                    <button
                        className="text-green-400 p-2 rounded flex items-center gap-2 bg-green-200 hover-bg-green-500"
                        onClick={() => {
                            const url = `https://www.google.com/maps?q=${props.sitio.ubicacion.latitude},${props.sitio.ubicacion.longitude}`;
                            window.open(url, '_blank');
                        }}
                    >
                        {PantallaVerSitio['Ubicacion'][idioma]}
                    </button>
                )}

            </div>
        </div>
    );
}
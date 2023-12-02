import React, { useEffect, useState } from "react";
import Banner from "../components/Banner.jsx";
import { Table } from "flowbite-react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { useContext } from "react";
import { PantallaEstadoSitio } from "../services/idiomas/PantaEstadoSitio.js";
import { UserProvider } from "../main.jsx";
import { AutenticacionServices } from "../services/FirebaseAutenticacion/Autenticacion.js";

import couchdb_connection from "../services/CouchDb/couchdb_connection.js";
import { Link } from "react-router-dom";
import { PantallaInicio } from "../services/idiomas/PantallaInicio.js";
import { BanerPublicidad } from "../components/banerPublicitario/BanerPublicidad.jsx";

import { deleteSite, getImage } from "../services/CouchDb/database_sitios.js"


export default function EstadoSitios() {
    const database = "tripsv-sitios";
    const database_image = "tripsv-imagenes";
    const [actualizar, SetActualizar] = useState(false);
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const { userState, setUserState } = useContext(UserProvider)
    const arrayVacio = new Array(20).fill(null);
    const { handleSignIn, handleSignOut, user } = AutenticacionServices();
    const [array, SetArray] = useState([]);
    useEffect(() => {
        async function fetchData() {
            if (user != null) {
                // para ejecutar solo cuando se ha cargado todo
                const data = await getSitesByEmail(user.email);
                SetArray(data);
            }
        }

        fetchData();
    }, [user, actualizar]);

    const getSitesByEmail = async (email) => {
        try {
            const response = await couchdb_connection.get(`${database}/_design/sites-email/_view/email`, {
                params: {
                    key: JSON.stringify(email)
                }
            });

            // Verificar si la solicitud fue exitosa
            if (response.status === 200) {
                // Los documentos de la vista se encuentran en response.data.rows
                const documents = response.data.rows.map(async (row) => {
                    const site = row.value;

                    // Obtener las imágenes del sitio
                    const imagenes = await getImage(`${database_image}/${site._id}`);

                    // Agregar las imágenes al objeto del sitio
                    site.imagenes = imagenes;

                    return site;
                });

                // Esperar a que se resuelvan todas las promesas
                return await Promise.all(documents);
            } else {
                // En caso de error, puedes manejarlo aquí

                return [];
            }
        } catch (error) {

            return [];
        }
    };


    const estadoSitio = [3];
    estadoSitio[0] = PantallaEstadoSitio["espera"][idioma];
    estadoSitio[1] = PantallaEstadoSitio["aprobado"][idioma];
    estadoSitio[2] = PantallaEstadoSitio["denegado"][idioma];

    async function eliminarSitio(Id, Rev) {

        const confirmarEliminacion = window.confirm(PantallaEstadoSitio["confirmarEliminacion"][idioma]);
        if (confirmarEliminacion) {
            try {
                const deletedSiteData = await deleteSite(Id, Rev);

                SetActualizar(!actualizar);
                // Realiza alguna acción adicional después de la eliminación si es necesario
            } catch (error) {

                // Manejo de errores
            }
        } else {

        }

    };


    return (
        <div className={'h-screen p-4 overflow-y-scroll '}>
            <Banner title={PantallaEstadoSitio["tituloTexto"][idioma]} />
            <div className={"my-2 overflow-x-scroll"}>
                <Table striped className={"overflow-x-scroll"}>
                    <Table.Head>
                        <Table.HeadCell>
                            {PantallaEstadoSitio["sitio"][idioma]}
                        </Table.HeadCell>
                        <Table.HeadCell>
                            {PantallaEstadoSitio["estado"][idioma]}
                        </Table.HeadCell>
                        <Table.HeadCell>
                            {PantallaEstadoSitio["fecha"][idioma]}
                        </Table.HeadCell>
                        <Table.HeadCell>
                            {PantallaEstadoSitio["administrar"][idioma]}
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            array.map((sitio, i) => {
                                return <>
                                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {sitio.titulo[idioma]}

                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                estadoSitio[sitio.estado]
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {sitio.fecha}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 flex gap-1 items-center"
                                                to={"/vista-sitio"} state={{ sitio: sitio }}>
                                                <AiFillEye />
                                                <p>{PantallaEstadoSitio["verSitio"][idioma]}</p>
                                            </Link>

                                        </Table.Cell>
                                        <Table.Cell>
                                            <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 flex gap-1 items-center"
                                                onClick={() => eliminarSitio(sitio._id, sitio._rev)}
                                            >
                                                <AiFillDelete />
                                                <p>{PantallaEstadoSitio["eliminar"][idioma]}</p>
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                </>
                            })
                        }

                    </Table.Body>
                </Table>
                <BanerPublicidad></BanerPublicidad>
            </div>

        </div>
    )
}
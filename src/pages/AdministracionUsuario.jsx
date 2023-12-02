import React, { useEffect, useState } from "react";
import { UserServices } from "../services/FireStorage/UserServices";
import { PantallaAdministrarUsuario } from "../services/idiomas/PantallaAdministrarUsuario.js"
import Banner from "../components/Banner.jsx";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { useContext } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getUserInfo } from "../services/CouchDb/database_roles.js";
export default function AdministracionUsuario() {

    const { idioma, setIdioma } = useContext(IdiomaContext);

    const { changeRoleUser, getUsersByRol, searchRoleByEmail } = UserServices();

    const [datos, setDatos] = useState([])
    const [query, setQuery] = useState('');
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
    const [recargar, setRecargar] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const usuarios = await getUserInfo();
            setDatos(usuarios)
        }

        if (recargar) {
            fetchData()

        }
        setRecargar(false)
    }, [recargar])

    function recargarPagina() {
        setRecargar(true);
        setUsuarioEncontrado(null)
    }
    function quitarRol(id) {
        const usuario = usuarios.find(user => user.id === id);
        if (usuario) {
            usuario.role = "usuario";

            recargarPagina();
        }
    }

    function agregarRol(id) {
        const usuario = usuarios.find(user => user.id === id);
        if (usuario) {
            usuario.role = "administrador";

            recargarPagina();
        }
    }
    const handleSearch = () => {

        searchRoleByEmail(query, "usuario").then(x => {

            if (x.length !== 0) {
                setUsuarioEncontrado(x)
            } else {
                alert("No se encontro el usuario")
                setUsuarioEncontrado(null)
            }
        }).catch(err => {

        })
    };

    return (
        <div className="p-4 h-screen w-full overflow-y-scroll">
            <Banner title={PantallaAdministrarUsuario['tituloAdministrarUsuario'][idioma]} />
            <div className="my-2 w-full box-border flex flex-col justify-around items-center">
                <div className="my-2 w-full bg-slate-200 shadow p-2.5 rounded-lg mb-2.5 flex justify-evenly items-center flex-col box-border">
                    <p className="text-2xl font-bold">{PantallaAdministrarUsuario['busqueda'][idioma]}</p>
                    <div className="flex flex-wrap justify-around w-4/5 p-4">
                        <TextInput placeholder={"usuario@gmail.com"} onChange={(event) => setQuery(event.target.value)} className="outline-0"></TextInput>
                        <Button type={"button"} onClick={handleSearch} className="bg-blue-700" pill>
                            {PantallaAdministrarUsuario['buscar'][idioma]}
                        </Button>
                    </div>
                    {(usuarioEncontrado) ? (
                        <div className="w-full  grid text-center justify-evenly items-center p-2">
                            <p className="my-2">{PantallaAdministrarUsuario['usuariosEncontrado'][idioma]} {usuarioEncontrado[0].email}</p>
                            <p className="my-2"> {PantallaAdministrarUsuario['rol'][idioma]}: {usuarioEncontrado[0].role}</p>

                            <Button onClick={() => agregarRol("test", "rev")} color="success" pill className="h-9 w-auto p-2 bg-blue-700">
                                {PantallaAdministrarUsuario['asignar'][idioma]}
                            </Button>
                        </div>
                    ) : (
                        <p>{PantallaAdministrarUsuario['mensaje'][idioma]}</p>
                    )}
                </div>
            </div>

            <div className="w-full overflow-x-scroll ">
                {
                    (datos.length < 1) && (
                        <h2 className="text-center font-bold">Aqui se mostrarán los usuarios administradores</h2>
                    )
                }
                {
                    //                      Tabla de usuarios
                    <Table striped className={"overflow-x-scroll"}>
                        <Table.Head>
                            <Table.HeadCell>{PantallaAdministrarUsuario['correo'][idioma]}</Table.HeadCell>
                            <Table.HeadCell>{PantallaAdministrarUsuario['rol'][idioma]}</Table.HeadCell>
                            <Table.HeadCell>
                                <AiFillDelete className={"text-lg"} />
                            </Table.HeadCell>

                        </Table.Head>
                        <Table.Body>
                            {
                                datos.map((x, index) => {

                                    return <Table.Row key={index}>
                                        <Table.Cell>{x.doc.email}</Table.Cell>
                                        <Table.Cell>{PantallaAdministrarUsuario[x.doc.role][idioma]}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => quitarRol(x.doc.id, x.doc.rev)} pill className="bg-blue-700">
                                                {PantallaAdministrarUsuario['quitarRol'][idioma]}
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                })}
                        </Table.Body>
                    </Table>
                }
            </div>

        </div>
    )
}

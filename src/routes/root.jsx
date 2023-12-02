import React from "react";
import {
    AiFillClockCircle,
    AiFillFileAdd,
    AiFillHome,
    AiFillStar,
    AiOutlineCarryOut, AiOutlineCodeSandbox, AiOutlineGoogle,
    AiOutlineUsergroupAdd,
    AiOutlineLogout
} from "react-icons/ai";
import { Avatar } from 'flowbite-react';
import { Link, useLocation } from "react-router-dom";
import { AutenticacionServices } from "../services/FirebaseAutenticacion/Autenticacion.js";
import { useContext, useEffect, useState } from "react";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { PagesSelecion } from "../services/idiomas/PagesSelecion.js";
import { Idiomas } from "../services/idiomas/Idiomas.js"
import {
    UserProvider
} from "../main.jsx";
const ButtomBar = ({ nombre, ruta, rutaActual, icon }) => {
    return <Link
        className={`${(ruta === rutaActual) ? "bg-slate-400" : "bg-slate-200"}  w-3/4  hover:cursor-pointer lg:w-full flex justify-center lg:justify-between px-4 py-2 rounded my-1 items-center gap-1`} to={ruta}>
        <p className={"hidden md:inline-block text-slate-700 font-bold truncate "}>{nombre}</p>
        {icon}
    </Link>
}

export default function Root() {
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const { userState, setUserState } = useContext(UserProvider);

    const { handleSignIn, handleSignOut, user } = AutenticacionServices();
    const rutaActual = useLocation()

    const [idiomaSelect, setIdiomaSelect] = useState('es')

    const idiomas = Idiomas;

    useEffect(() => {
        const recuperarIdioma = localStorage.getItem("idioma");
        if (recuperarIdioma !== null) {
            setIdioma(recuperarIdioma);
            setIdiomaSelect(recuperarIdioma);
        }


    }, [user, idiomaSelect]);

    const handleSelectChangeIdioma = (event) => {
        localStorage.setItem("idioma", event.target.value);
        setIdiomaSelect(event.target.value);
    };

    return (
        <>
            <div className={"p-2 sm:p-4 h-screen box-border flex flex-col justify-between relative border-r-2"}>
                {/*Logo*/}
                <div className={"box-border flex flex-col sm:flex-row gap-4 justify-center items-center"}>
                    <img className="hidden sm:block" src="/assets/mapWithTextLogo.png" alt="logo" />
                    <img className="block sm:hidden" src="/assets/mapLogo.png" alt="logo" />
                </div>

                {/*Buttoms*/}
                <div className={"w-full h-2/4 box-border  lg:p-2 flex flex-col overflow-y-scroll  items-center scrollbar-hide"}>
                    {
                        Buttom.map((item, index) => {
                            return <ButtomBar key={index} ruta={item.ruta} rutaActual={rutaActual.pathname} icon={item.icon} nombre={PagesSelecion[item.name][idioma]} />
                        })
                    }
                    {/*Idiomas*/}
                    <select value={idiomaSelect} onChange={handleSelectChangeIdioma} className="bg-slate-200 w-3/4 hover:cursor-pointer lg:w-full flex justify-center lg:justify-between px-4 py-2 rounded my-1 items-center gap-1 outline-0 text-xs">
                        {
                            idiomas.map((x, index) => {
                                return <option key={index} value={x.clave} className={"text-xs sm:text-sm invisible"} >{x.idioma}</option>
                            })
                        }
                    </select>
                    {/*Login*/}
                    {
                        (userState.logeado) && (
                            ButtomLogin.map((item, index) => {
                                return <ButtomBar key={index} ruta={item.ruta} rutaActual={rutaActual.pathname} icon={item.icon} nombre={PagesSelecion[item.name.replace(/ /g, "_")][idioma]} />
                            })
                        )
                    }
                    {/*Administracion*/}
                    {
                        (userState.logeado && userState.role === "administrador") && (
                            ButtomsAdmin.map((item, index) => {
                                const selecion = item.name.replace(/ /g, "_").toUpperCase()
                                //
                                return <ButtomBar key={index} ruta={item.ruta} rutaActual={rutaActual.pathname} icon={item.icon} nombre={PagesSelecion[selecion][idioma]} />
                            })
                        )
                    }



                </div>

                {/*Usuario*/}
                <div className="p-2">
                    <div className="w-full xs:p-4 rounded flex flex-col justify-center items-center  gap-2 sm:bg-slate-200 box-border ">
                        {/* eslint-disable-next-line no-undef */}
                        <img className="w-11 h-11 rounded-full bg-amber-50" src={(!user) ? "/assets/viajeros.png" : user.photoURL} alt="img" />
                        {
                            (!user) ? (
                                <div className="hidden xs:inline-block w-full text-center">
                                    <p>{PagesSelecion["TodaviaSeccion"][idioma]} 🥺</p>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col ">
                                    <div className="hidden sm:inline-block truncate text-left  sm:text-center">{user.displayName}</div>
                                    <div className="hidden sm:inline-block text-sm text-left sm:text-center text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                                </div>
                            )
                        }
                    </div>
                </div>



                {/*Inicio de Sesion*/}
                <div className={"w-full box-border  lg:p-2 flex flex-col overflow-y-scroll  items-center scrollbar-hide"}>
                    {
                        // eslint-disable-next-line no-constant-condition
                        (!user) ? (
                            <button
                                onClick={handleSignIn}
                                className={"bg-slate-200 w-3/4 hover:bg-slate-400 hover:cursor-pointer lg:w-full flex justify-center lg:justify-between p-4 rounded my-1 items-center gap-1"} >
                                <p className={"hidden md:inline-block text-slate-700 font-bold truncate "}>{PagesSelecion["IniciarSesion"][idioma]}</p>
                                <AiOutlineGoogle />
                            </button>
                        ) :
                            (
                                <button
                                    onClick={handleSignOut}
                                    className={"bg-slate-200 w-3/4 hover:bg-slate-400 hover:cursor-pointer lg:w-full flex justify-center lg:justify-between p-4 rounded my-1 items-center gap-1"} >
                                    <p className={"hidden md:inline-block text-slate-700 font-bold truncate "}>{PagesSelecion["CerrarSesion"][idioma]}</p>
                                    <AiOutlineLogout />
                                </button>
                            )
                    }
                </div>
            </div>


        </>
    )
}





const Buttom = [
    {
        name: "Inicio",
        ruta: "/inicio",
        icon: <AiFillHome />
    },
    {
        name: "Favoritos",
        ruta: "/favoritos",
        icon: <AiFillStar />
    },
]
const ButtomLogin = [
    {
        name: "Estado Sitios",//replace(/ /g, "_");
        ruta: "/estado",
        icon: <AiFillClockCircle />
    },
    {
        name: "Agregar Sitio",
        ruta: "/agregar-sitio",
        icon: <AiFillFileAdd />
    },
]
const ButtomsAdmin = [
    {
        name: "Administracion Usuario",
        ruta: "/admin-usuarios",
        icon: <AiOutlineUsergroupAdd />
    },
    {
        name: "Administracion Sitios",
        ruta: "/admin-sitios",
        icon: <AiOutlineCarryOut />
    },
    {
        name: "Administracion Anuncios",
        ruta: "/admin-anuncios",
        icon: <AiOutlineCodeSandbox />
    },
]

const IdiomaButtom = [
    {
        name: "Cambiar Idioma",
        icon: "Icono"
    }
]


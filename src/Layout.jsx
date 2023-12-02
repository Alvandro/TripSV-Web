import Root from "./routes/root.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { IdiomaContext } from "./providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { PageCarga } from "./services/idiomas/Layout.js";

// eslint-disable-next-line react/prop-types
export default function Layout() {
    const [load, setLoad] = useState(true)
    const { idioma, setIdioma } = useContext(IdiomaContext);

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 1000)

    }, []);
    return (
        (!load) ? (
            <div id="contenedor" className={"w-full h-auto grid grid-cols-5 box-border bg-[#ffffff] "}>

                <div className={" col-span-1 "}>
                    <Root />
                </div>
                <div className={" col-span-4 "}>
                    <Outlet />
                </div>
            </div>
        ) : (
            <div className={"w-full h-screen flex justify-center items-center flex-col gap-4"}>
                <img className={"w-1/4"} src={"/img/airplane.gif"} alt={"Imagen logo"} />
                <p className={"text-6xl font-bold"}>{PageCarga['name'][idioma]}</p>
                <small className={"text-3xl"}>{PageCarga['tusLugares'][idioma]}</small>
            </div>
        )



    )
}
import {useEffect, useState} from "react";
import {AiOutlineMenu, AiOutlineRight} from "react-icons/ai";
import {IdiomaContext} from "../../providers/IdiomaProvider.jsx";
import React, {useContext} from "react";
import {Menu} from "../../services/idiomas/PantallaPresentacion.js";
import {BotonIdioma} from "./BotonIdioma.jsx";


export default function () {
    const [open, setOpen] = useState(false);
    const {idioma, setIdioma} = useContext(IdiomaContext);

    useEffect(() => {
        if (open) {
            setTimeout((_ => {
                setOpen(false)
            }), 10000)
        }
    }, [open]);

    var lista = [
        {
            nombre: Menu['inicio'][idioma],
            ruta: "/"
        },
        {
            nombre: Menu['introduccion'][idioma],
            ruta: "#introduccion"
        },
        {
            nombre: Menu['caracteristicas'][idioma],
            ruta: "#caracteristicas"
        },
        {nombre: Menu['descarga'][idioma],
            ruta: "#descargar"
        },
        {
            nombre: Menu['captura'][idioma],
            ruta: "#capturas"
        },
        {
            nombre: Menu['quienesSomos'][idioma],
            ruta: "#quienes-somos"
        },
        {
        componente:<BotonIdioma />
        }
    ]


    return (
        <div>
            <button className="sm:hidden" onClick={() => setOpen(true)}>
                <AiOutlineMenu className={"text-3xl text-amber-50"} />
            </button>
            {/* Desktop */}
            <ul className="hidden sm:relative sm:h-auto sm:inline-flex sm:flex-row gap-3 items-center">
                {lista.map((item, index) => {
                    return (
                        <li key={index} className="text-white text-center">
                            {item.componente ? item.componente : (//para aplicar un complemeto aca xd ta malaste carlos jajajaja
                                <a href={item.ruta}>{item.nombre}</a>
                            )}
                        </li>
                    )
                })}
            </ul>
            {/* Mobile y Tablet */}
            {open && (
                <ul className={`absolute w-2/4 right-0 top-0 sm:hidden h-screen bg-purple-900 bg-opacity-70 flex flex-col gap-4 items-center box-border p-4 `}>
                    <button className={"sm:hidden text-white self-end"} onClick={() => setOpen(false)}>
                        <AiOutlineRight className={"text-3xl text-amber-50"} />
                    </button>
                    {lista.map((item, index) => {
                        return (
                            <li className="text-white text-center hover:underline">
                                {item.componente ? item.componente : (
                                    <a onClick={() => setOpen(false)} href={item.ruta}>
                                        {item.nombre}
                                    </a>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )

}



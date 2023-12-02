import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IdiomaContext } from "../../providers/IdiomaProvider";

export const Tarjeta = ({ sitio, actualizar }) => {
    //Funcion para eliminar de localStorage
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const eliminarDeLocalStorage = () => {
        localStorage.removeItem(sitio._id);
        actualizar();
    }

    return (
        <div className={"relative bg-white rounded-lg p-4 shadow-md hover:bg-slate-300 trasition duration-300"}>
            <button onClick={eliminarDeLocalStorage} className={"absolute top-3 right-3 bg-yellow-300 hover:bg-yellow-400 rounded-full p-2 text-slate-50"}><AiFillStar /></button>
            <Link to={"/vista-sitio"} state={{sitio}}>
                <img src={sitio.imagenes[0]} alt={"place name"} className="w-full h-32 object-cover mt-2 rounded-md" />

                <p className="text-lg font-semibold py-2">{sitio.titulo [idioma]}</p>
                <p className="py-2">{sitio.departamento}</p>
            </Link>
        </div>
    );
};

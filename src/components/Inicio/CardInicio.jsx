import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { PantallaInicio } from "../../services/idiomas/PantallaInicio.js";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import MensajeEmergente from './MensajeEmergente.jsx';

const CardInicio = (props) => {
    const [estadoFavorito, setEstadoFavorito] = useState(verificarEnLocalStorage(props.sitio._id));
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const [isMessageVisible, setMessageVisible] = useState(false);

    //Verifica si el sitio esta agregado a favorito
    function verificarEnLocalStorage(key) {
        const valor = localStorage.getItem(key);
        return valor !== null;
    }

    //Guarda en favorito o elimina
    const guardarFavorito = () => {
        setMessageVisible(true);
        setTimeout(() => {
            setMessageVisible(false);
        }, 1000);
        if (estadoFavorito) {
            localStorage.removeItem(props.sitio._id);
        } else {
            localStorage.setItem(props.sitio._id, "Pendiente");
        }

        setEstadoFavorito(!estadoFavorito)
    }


    return (
        <div className="max-w-md mx-auto w-full bg-white rounded-xl overflow-hidden transition-transform duration-300 shadow-md hover:shadow-xl hover:bg-gray-300 hover:bg-opacity-90 transform hover:-translate-y-1">
            {/* Icono de estrella en la parte superior derecha */}
            <div onClick={guardarFavorito} className="absolute top-2 right-2 bg-gray-200 bg-opacity-50 hover:shadow-xl hover:bg-gray-400 p-1 rounded-full">
                <FaStar size={25} color={verificarEnLocalStorage(props.sitio._id) ? "gold" : "white"} />
            </div>



            <img className="h-40 w-full object-cover" src={props.sitio.imagenes[0]} alt="Imagen de la tarjeta" />
            <div className="p-4 flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{props.sitio.titulo[idioma]}</h2>
                <p className="text-gray-700 font-semibold">{props.sitio.departamento}</p>
                <p className="my-2 text-gray-600 line-clamp-1">{props.sitio.description}</p>
                <Link className="inline-block bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded" to={"/vista-sitio"} state={{ sitio: props.sitio }}>
                    {PantallaInicio["botonVerMas"][idioma]}
                </Link>
            </div>
            {isMessageVisible && (
                <MensajeEmergente message={estadoFavorito ? PantallaInicio['mensajeAgregar'][idioma] : PantallaInicio['mensajeEliminar'][idioma]} />
            )}

        </div>
    );
};

export default CardInicio;
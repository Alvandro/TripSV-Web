import React, {useContext} from "react";
import {IdiomaContext} from "../../providers/IdiomaProvider.jsx";
import {PublicidadIdiomas} from "../../services/idiomas/PublicidadIdiomas.js";


/**
 *
 * @param objPro resive las funciones y parametro para el boton
 * @returns {JSX.Element}
 * @constructor
 */
export function BotonsubirImg(objPro) {


    const botonStilosProObj = {
        menos: 'bg-blue-700 border-blue-700 hover:border-blue-500',
        max: 'bg-red-700 border-red-700',
    };
    const {idioma, setIdioma} = useContext(IdiomaContext);

    if (objPro.img.length < 3) {
        return (
            <div className={`text-white  text-2xl text-center`}>
                <div className="p-0.5">
                    <label  className="text-gray-600" htmlFor="archivoInput">{PublicidadIdiomas["seleccionar"][idioma]}:</label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept="image/*"
                        onChange={objPro.Handlerchange}
                        id="archivoInput"
                        title={PublicidadIdiomas["examinar"][idioma]}// Cambia "Seleccionar archivo" por el texto deseado
                        placeholder={PublicidadIdiomas["examinar"][idioma]}//

                    />
                </div>


                <button
                    className={` text-white font-bold py-2 px-4 border-b-4  rounded 
                ${objPro.img.length >= 4 ? botonStilosProObj.max : botonStilosProObj.menos}`}//codigo para que se ponga de colores distintos
                    onClick={objPro.Handlersubir}
                    disabled={objPro.img.length >= 4}>
                    {PublicidadIdiomas["Subir"][idioma]}
                </button>
            </div>
        )
    } else {
        return (<div></div>)
    }


}
import {FiTrash2} from "react-icons/fi";
import React from "react";


/**
 *
 * @param objPro este obj resive el vector de img para mostrar y el handler delete para eliminar
 * @returns {JSX.Element}
 * @constructor
 */
export function GridImgPublicidad(objPro) {

    return (

        <div className="sm:flex-col md:flex-col lg:flex-row lg:flex gap-3 items-center justify-center">

            {/*//se modifico para mostrar datos de couchdb*/}
            {objPro.img.map((imgVector, i) => (
                <div key={imgVector._id}
                     className="flex-col relative overflow-hidden hover:scale-105 hover:shadow-md transform transition-transform duration-300 rounded-2xl">
                    <img src={imgVector.imageUrl} alt={imgVector._id} style={{height: '200px'}}
                         className="mt-2 lg:max-h-80 rounded-2xl w-[320px]"/>

                    <button
                        className="absolute top-3 right-2 bg-white rounded-full p-2 hover:bg-red-500 text-red-500 hover:text-white transition-colors duration-300"
                        onClick={() => objPro.Handler(imgVector._id, imgVector._rev)}
                    >

                        <FiTrash2/>
                    </button>
                </div>
            ))}
        </div>


    )
}
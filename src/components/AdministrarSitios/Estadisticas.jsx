import React, {useEffect, useState} from "react";
import {AiFillClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";
import {count_site} from "../../services/CouchDb/count_site.js";

export default function Estadisticas({
                                         aprobados, denegados, pendientes,
                                         estado, sitiosAprobados,
                                         sitiosDenegados, sitiosPendientes
                                     }) {
    return (
        <div className="my-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 ">
            <div onClick={() => estado(1)} className="bg-green-300 hover:bg-green-500 rounded flex flex-col justify-around items-center p-4">
                <p className="text-xl">{sitiosAprobados}</p>
                <AiOutlineCheckCircle />
                <p className="text-lg font-bold">{aprobados}</p>
            </div>
            <div onClick={() => estado(2)} className="bg-red-300 hover:bg-red-500 rounded flex flex-col justify-around items-center p-4">
                <p className="text-xl">{sitiosDenegados}</p>
                <AiOutlineCloseCircle />
                <p className="text-lg font-bold">{denegados}</p>
            </div>
            <div onClick={() => estado(0)} className="bg-orange-300 hover:bg-orange-500 xs:col-span-2 sm:col-span-1 rounded flex flex-col justify-around items-center p-4">
                <p className="text-xl">{sitiosPendientes}</p>
                <AiFillClockCircle />
                <p className="text-lg font-bold">{pendientes}</p>
            </div>
        </div>
    );
}

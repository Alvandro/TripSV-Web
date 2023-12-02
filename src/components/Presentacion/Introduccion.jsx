import { Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { IntroPage } from "../../services/idiomas/PantallaPresentacion.js";
import IMG from "../../assets/IMG_20231021_162340.png"

export default function Introduccion() {
    const { idioma, setIdioma } = useContext(IdiomaContext);

    return (
        <section id="introduccion" className="bg-black bg-opacity-50  p-8">
            <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center">
                <div className="sm:w-1/3 p-4 flex justify-around">
                    <img
                        src={IMG}
                        className="w-2/4 sm:w-full  rounded-lg shadow-md"
                        alt="Equipo de TripSv"
                    />
                </div>
                <div className="sm:w-2/3 p-4">
                    <p className="text-4xl sm:text-6xl font-bold text-amber-50 text-center sm:text-left">
                        {IntroPage['Bienvenida'][idioma]}
                    </p>
                    <p className="text-amber-50 text-center sm:text-justify">
                        {IntroPage['descripcion'][idioma]}
                    </p>

                    <div className="w-full my-5 flex justify-center sm:justify-start">
                        <Link
                            to="inicio"
                            className="bg-white p-2 text-black rounded text-center flex items-center gap-2"
                        >
                            <MdTravelExplore />
                            {IntroPage['Explora'][idioma]}
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}
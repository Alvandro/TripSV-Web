import {Carousel} from "flowbite-react";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import React, { useContext } from "react";
import { Galeria } from "../../services/idiomas/PantallaPresentacion.js";
import img1 from "../../assets/si1.png"
import img2 from "../../assets/si2.png";
import img3 from "../../assets/si3.png";

export default function GaleriaFotos(){
    const { idioma, setIdioma } = useContext(IdiomaContext);


    return (
        <section id={"capturas"} className="bg-black bg-opacity-50 p-8">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl text-white font-semibold mb-4">{Galeria['galleriaFotos'][idioma]}</h2>
                <Carousel className={"h-[400px] p-4"}>
                    <img src={img1} alt="Image 1" />

                    <img src={img2} alt="Image 2" />


                    <img src={img3} alt="Image 3" />

                </Carousel>
            </div>
        </section>
    )
}
import React from "react";
import Introduccion from "./components/Presentacion/Introduccion";
import Caracteristicas from "./components/Presentacion/Caracteristicas.jsx";
import Menu from "./components/Presentacion/Menu.jsx";
import { useContext, useEffect, useState } from "react";
import { IdiomaContext } from "./providers/IdiomaProvider.jsx";
import { Carousel } from "flowbite-react";
import { BiLogoPlayStore } from "react-icons/bi";
import GaleriaFotos from "./components/Presentacion/GaleriaFotos.jsx";
import Descargar from "./components/Presentacion/Descargar.jsx";
import QuienesSomos from "./components/Presentacion/QuienesSomos.jsx";
import Footer from "./components/Presentacion/Footer.jsx";


function App() {
    const { idioma, SetIdioma } = useContext(IdiomaContext);
    const [alturaPantalla, setAlturaPantalla] = useState(null)

    useEffect(() => {



        if (alturaPantalla === null) {
            setAlturaPantalla(window.screen.height)
        }
    }, []);
    return (
        <>
            <div className={`w-full h-screen bg-trip-travel bg-opacity-25 bg-no-repeat bg-center bg-cover box-border overflow-scroll scroll-smooth`}>
                {/* NavBar */}
                <div className={"w-full p-4 bg-black bg-opacity-50 flex items-center justify-between gap-4 sticky  top-0 z-10"}>
                    <img className="w-10" src="/assets/mapLogoDark.png" alt="Tripsv Logo" />
                    <Menu />
                </div>

                {/*Introduccion*/}
                <Introduccion alturaPantalla={alturaPantalla} />
                {/*Caracteristicas*/}
                <Caracteristicas />

                {/*Galeria de fotos*/}
                <GaleriaFotos />

                {/*Descargar*/}
                <Descargar />
                {/*Quienes somos*/}
                <QuienesSomos />
                {/*Footer*/}
                <Footer />
            </div>
        </>
    )
}

export default App

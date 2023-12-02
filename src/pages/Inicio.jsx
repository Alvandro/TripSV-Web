import React, { useContext, useEffect, useState, useRef } from "react";
import Pagination from "../components/Inicio/Pagination.jsx";
import Banner from "../components/Banner.jsx";
import BotonCategoria from "../components/Inicio/BotonCategoria.jsx";
import BotonDepartamento from "../components/Inicio/BotonDepartamento.jsx";
import CardInicio from "../components/Inicio/CardInicio.jsx";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { PantallaInicio } from "../services/idiomas/PantallaInicio.js";
import ServicesCategoriesPriceIdiom from "../services/idiomas/ServicesCategoriesPriceIdiom.js";
import { BanerPublicidad } from "../components/banerPublicitario/BanerPublicidad.jsx";
import { getAllSites } from "../services/CouchDb/database_sitios.js";
import { AutenticacionServices } from "../services/FirebaseAutenticacion/Autenticacion.js";

export default function Inicio() {
    const { reloguearse } = AutenticacionServices();
    const [iniciando, setIniciando] = useState(1);
    const [recargar, setRecargar] = useState(0);
    const [sitios, setSitios] = useState([]);
    const [sitiosSinFiltrar, setSitiosSinFiltrar] = useState([]);
    const [estadoCategoria, setEstadoCategoria] = useState(0);
    const [estadoDepartamento, setEstadoDepartamento] = useState("Todos");
    const { idioma, setIdioma } = useContext(IdiomaContext);
    const topRef = useRef(); // Ref para el componente superior
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9); // Cantidad de Card por página
    const [primeraCarga, setPrimeraCarga] = useState(false);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {

        if (iniciando === 1) {
            reloguearse();
        }
        const fetchSites = async () => {
            const response = await getAllSites(1);
            setSitios(response);
            setSitiosSinFiltrar(response);
            setPrimeraCarga(true); // Marcar como no la primera carga
        };

        if (recargar === 0) {
            fetchSites();
        }
        setRecargar(1);
        setIniciando(0);
    }, [recargar]);

    const { categoriesList, CategoriesIdiom } = ServicesCategoriesPriceIdiom();

    const categorias = [
        CategoriesIdiom[8][idioma], // 'Todas'
        CategoriesIdiom[1][idioma], // 'Colonial'
        CategoriesIdiom[2][idioma], // 'Playas'
        CategoriesIdiom[3][idioma], // 'Bosques'
        CategoriesIdiom[4][idioma], // 'Sitios Arqueológicos'
        CategoriesIdiom[5][idioma], // 'Museos'
        CategoriesIdiom[6][idioma], // 'Balnearios'
        CategoriesIdiom[7][idioma], // 'Otros'
    ];

    const departamentos = [
        PantallaInicio["todos"][idioma],
        PantallaInicio["ahuachapan"][idioma],
        PantallaInicio["sonsonate"][idioma],
        PantallaInicio["santaAna"][idioma],
        PantallaInicio["chalatenango"][idioma],
        PantallaInicio["laLibertad"][idioma],
        PantallaInicio["sanSalvador"][idioma],
        PantallaInicio["laPaz"][idioma],
        PantallaInicio["cabanas"][idioma],
        PantallaInicio["sanVicente"][idioma],
        PantallaInicio["usulutan"][idioma],
        PantallaInicio["sanMiguel"][idioma],
        PantallaInicio["morazan"][idioma],
        PantallaInicio["laUnion"][idioma],
        PantallaInicio["cuscatlan"][idioma],
    ];

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = sitios.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <div className="relative h-screen overflow-y-scroll p-4">
            <div ref={topRef}>
            </div>
            <Banner
                title={PantallaInicio["tituloTexto"][idioma]}
                imgUrl={
                    "https://cdn0.geoenciclopedia.com/es/posts/8/0/0/montanas_8_600.jpg"
                }
            ></Banner>
            <div className="grid grid-cols-2 sm:gap-4">
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 items-center">
                    <p className="mr-8">{PantallaInicio["categoria"][idioma]}:</p>
                    <BotonCategoria
                        opciones={categorias}
                        departamentos={departamentos}
                        sitios={sitios}
                        setSitios={setSitios}
                        sitiosSinFiltrar={sitiosSinFiltrar}
                        estadoCategoria={estadoCategoria}
                        setEstadoCategoria={setEstadoCategoria}
                        estadoDepartamento={estadoDepartamento}
                        setEstadoDepartamento={setEstadoDepartamento}
                    />
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 items-center">
                    <p className="mr-8">{PantallaInicio["departamento"][idioma]}:</p>
                    <BotonDepartamento
                        opciones={departamentos}
                        sitios={sitios}
                        setSitios={setSitios}
                        sitiosSinFiltrar={sitiosSinFiltrar}
                        estadoCategoria={estadoCategoria}
                        setEstadoCategoria={setEstadoCategoria}
                        estadoDepartamento={estadoDepartamento}
                        setEstadoDepartamento={setEstadoDepartamento}
                    />
                </div>
            </div>
            <div className="container mx-auto">
                {primeraCarga && sitios.length === 0 && (
                    <div
                        class="bg-yellow-200 border-l-4 border-yellow-500 p-4 my-4 h-full w-full flex justify-start items-start"
                        x-show="mostrarAdvertencia"
                    >
                        <p class="text-yellow-800 font-bold">
                            {PantallaInicio["advertencia"][idioma]}:&nbsp;
                        </p>
                        <p>{PantallaInicio["mensajeDeAdvertencia"][idioma]}</p>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentCards.map((sitio, index) => {
                        return <CardInicio key={index} sitio={sitio}></CardInicio>;
                    })}

                </div>
                <Pagination
                    cardsPerPage={cardsPerPage}
                    totalCards={sitios.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
            <BanerPublicidad></BanerPublicidad>
        </div>
    );
}

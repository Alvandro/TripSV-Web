import React, { useContext, useEffect, useState } from "react";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";
import { AgregarSitioIdioma } from "../../services/idiomas/AgregarSitioIdioma.js";

const Horarios = ({ horario, setHorario }) => {
    const aperturaM = document.getElementById("aperturaM");
    const cierreM = document.getElementById("cierreM");
    const aperturaT = document.getElementById("aperturaT");
    const cierreT = document.getElementById("cierreT");

    const [indexHorario, setIndexHorario] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [tituloError, setTituloError] = useState(false);
    const [tarde, setTarde] = useState("");
    const [tardeError, setTardeError] = useState(false);
    const { idioma, setIdioma } = useContext(IdiomaContext);

    const onChange = (e) => {
        setTitulo(e.target.value);
        if (tituloError) {
            setTituloError(false);
        }
    };

    const onBlurTitulo = () => {
        if (titulo.trim() === "") {
            setTituloError(true);
        }
    };

    const onChangeTarde = (e) => {
        setTarde(e.target.value);
        if (tardeError) {
            setTituloError(false);
        }
    };

    const onBlurTarde = () => {
        if (titulo.trim() === "") {
            setTardeError(true);
        }
    };

    const [dias, setDias] = useState([
        {
            name: AgregarSitioIdioma["lunes"][idioma],
            inicial: "L",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["martes"][idioma],
            inicial: "M",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["miercoles"][idioma],
            inicial: "X",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["jueves"][idioma],
            inicial: "J",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["viernes"][idioma],
            inicial: "V",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["sabado"][idioma],
            inicial: "S",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
        {
            name: AgregarSitioIdioma["domingo"][idioma],
            inicial: "D",
            seleccionado: false,
            aperturaM: "-",
            cierreM: "-",
            aperturaT: "-",
            cierreT: "-",
        },
    ]);

    const [recargar, setRecargar] = useState(true);

    useEffect(() => {
        setRecargar(false);
    }, [recargar]);

    function aceptarHorario() {
        const aceptado = dias.map((x) => {
            return {
                dia: x.name,
                horario: !x.seleccionado
                    ? "----"
                    : `${x.aperturaM}AM a ${x.cierreM} - ${x.aperturaT}PM a ${x.cierreT}PM`,
            };
        });
        setHorario(aceptado);
    }

    function recolectarIndex(index) {
        const datos = indexHorario;
        if (!indexHorario.includes(index)) {
            datos.push(index);
            setIndexHorario(datos);
        }

        const updatedDias = [...dias];
        updatedDias[index].seleccionado = true;
        setDias(updatedDias);



    }

    function establecerHorario() {
        indexHorario.forEach((x) => {
            dias[x].seleccionado = true;
            dias[x].aperturaM = aperturaM.value;
            dias[x].cierreM = cierreM.value;
            dias[x].aperturaT = aperturaT.value;
            dias[x].cierreT = cierreT.value;
        });
        setIndexHorario([]);
        aceptarHorario();

    }

    function restablecerHorario() {
        dias.forEach((x) => {
            x.seleccionado = false;
            x.aperturaM = "-";
            x.cierreM = "-";
            x.aperturaT = "-";
            x.cierreT = "-";
        });
        aperturaM.value = "";
        cierreM.value = "";
        aperturaT.value = "";
        cierreT.value = "";
        setRecargar(true);
        setHorario([]);

    }


    return (
        <div className="bg-blue-100 p-4 rounded">
            <div className="flex justify-center gap-10 flex-wrap">
                {dias.map((x, index) => (
                    <button
                        key={index}
                        className={`w-[50px] h-[50px] rounded-full ${x.seleccionado ? "bg-blue-700" : "bg-blue-300"
                            }`}
                        disabled={x.seleccionado}
                        onClick={() => recolectarIndex(index)}
                    >
                        {x.inicial}
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
                <h2 className="font-bold text-lg py-4">{AgregarSitioIdioma["Establece horario"][idioma]}:</h2>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
                <h2 className="font-bold">{AgregarSitioIdioma["Manana"][idioma]}:</h2>
                <div className="flex justify-center gap-20">
                    <div className="flex flex-col items-center">
                        <label htmlFor="aperturaM">{AgregarSitioIdioma["Apertura"][idioma]}:</label>
                        <input
                            type="number"
                            placeholder="00:00"
                            id="aperturaM"
                            className="text-center border-blue-500 rounded w-full sm:w-1/2 xl:w-full lg:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:px-2 md:px-2 lg:px-4 xl:px-4 py-2"
                            onChange={onChange}
                            onBlur={onBlurTitulo}
                        />
                        {tituloError && (
                            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="cierreM">{AgregarSitioIdioma["Cierre"][idioma]}:</label>
                        <input
                            type="number"
                            placeholder="00:00"
                            id="cierreM"
                            className="text-center border-blue-500 rounded w-full sm:w-1/2 xl:w-full lg:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:px-2 md:px-2 lg:px-4 xl:px-4 py-2"
                            onChange={onChange}
                            onBlur={onBlurTitulo}
                        />
                        {tituloError && (
                            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
                <h2 className="font-bold mt-4">{AgregarSitioIdioma["Tarde"][idioma]}</h2>
                <div className="flex justify-center gap-20">
                    <div className="flex flex-col items-center">
                        <label htmlFor="aperturaT">{AgregarSitioIdioma["Apertura"][idioma]}:</label>
                        <input
                            type="number"
                            placeholder="00:00"
                            id="aperturaT"
                            className="text-center border-blue-500 rounded w-full sm:w-1/2 xl:w-full lg:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:px-2 md:px-2 lg:px-4 xl:px-4 py-2"
                            onChange={onChange}
                            onBlur={onBlurTarde}
                        />
                        {tardeError && (
                            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="cierreT">{AgregarSitioIdioma["Cierre"][idioma]}:</label>
                        <input
                            type="number"
                            placeholder="00:00"
                            id="cierreT"
                            className="text-center border-blue-500 rounded w-full sm:w-1/2 xl:w-full lg:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:px-2 md:px-2 lg:px-4 xl:px-4 py-2"
                            onChange={onChange}
                            onBlur={onBlurTarde}
                        />
                        {tardeError && (
                            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6 gap-20 lg:gap-44">
                <button
                    onClick={() => establecerHorario()}
                    className="btn-blue"
                >
                    {AgregarSitioIdioma["Establece horario"][idioma]}

                </button>
                <button
                    onClick={() => restablecerHorario()}
                    className="btn-blue"
                >
                    {AgregarSitioIdioma["Restablecer Horario"][idioma]}
                </button>
            </div>

            <div className="flex flex-col items-center mt-6">
                <h2 className="font-bold text-lg"> {AgregarSitioIdioma["Horario"][idioma]}:</h2>
                <div className="w-80 border border-blue-500 rounded-lg mt-2 p-2 bg-white">
                    {dias.map((x) => (
                        <div
                            key={x.name}
                            className="flex justify-between py-1 border-b border-blue-500"
                        >
                            <p className="w-1/3">{x.name}</p>
                            <p className="w-1/3">
                                {x.aperturaM} - {x.cierreM}
                            </p>
                            <p className="w-1/3">
                                {x.aperturaT} - {x.cierreT}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Horarios;

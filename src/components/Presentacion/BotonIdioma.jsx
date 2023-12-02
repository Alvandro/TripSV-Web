import React, {useContext, useEffect, useState} from 'react';
import {Idiomas} from "../../services/idiomas/Idiomas.js"
import {IdiomaContext} from "../../providers/IdiomaProvider.jsx";


export function BotonIdioma({name}) {
    const [selectedOption, setSelectedOption] = useState("A-Z"); // Inicialmente, puedes establecer la opción seleccionada
    const [idiomaSelect, setIdiomaSelect] = useState('es')
    const listidioma = Idiomas;
    const {idioma, setIdioma} = useContext(IdiomaContext);
    const handleSelectChangeIdioma = (event) => {
        localStorage.setItem("idioma", event.target.value);
        setIdiomaSelect(event.target.value);
    };

    useEffect(() => {
        const recuperarIdioma = localStorage.getItem("idioma");
        if (recuperarIdioma !== null) {
            setIdioma(recuperarIdioma);
            setIdiomaSelect(recuperarIdioma);
        }
    }, [ idiomaSelect]);

    return (

        <select
            value={idiomaSelect}
            onChange={handleSelectChangeIdioma}
            className={"bg-transparent border-0 text-center justify-center" }
        >
            {listidioma.map((x, index) => {
                return (
                    <option className={"bg-transparent   text-center"}
                        key={index} value={x.clave}>
                        {x.idioma}
                    </option>
                );
            })}
        </select>


    );
}

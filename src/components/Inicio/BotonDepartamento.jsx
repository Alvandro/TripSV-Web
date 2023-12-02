import React, { useState, useEffect, useRef } from 'react';

const BotonDepartamento = (props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [select, setSelect] = useState(props.opciones[0]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (opcion) => {
        setDropdownOpen(false);
        setSelect(opcion);
        props.setEstadoDepartamento(opcion);
        if (props.estadoCategoria === 0 && opcion === props.opciones[0]) {
            props.setSitios(props.sitiosSinFiltrar);

        } else {
            var sitiosFiltrados = [];
            if (props.estadoCategoria === 0) {
                sitiosFiltrados = props.sitiosSinFiltrar.filter((sitio) => {
                    return sitio.departamento === opcion;
                });
            } else if (opcion === props.opciones[0]) {
                sitiosFiltrados = props.sitiosSinFiltrar.filter((sitio) => {
                    return sitio.categorias && sitio.categorias.includes(props.estadoCategoria);
                });
            } else {
                sitiosFiltrados = props.sitiosSinFiltrar.filter((sitio) => {
                    return sitio.departamento === opcion;
                });
                sitiosFiltrados = sitiosFiltrados.filter((sitio) => {
                    return sitio.categorias && sitio.categorias.includes(props.estadoCategoria);
                });
            }
            props.setSitios(sitiosFiltrados);
        }
    };

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {select}
            </button>
            <div
                className={`origin-top-right absolute z-50 right-0 mt-2 w-40 rounded-md shadow-lg bg-slate-400 ring-1 ring-black ring-opacity-5 ${isDropdownOpen ? '' : 'hidden'}`}
            >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {props.opciones.map((opcion, index) => (
                        <a
                            key={index}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => closeDropdown(opcion)}
                        >
                            {opcion}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BotonDepartamento;
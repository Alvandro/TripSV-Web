import React from 'react';
import { Table } from 'flowbite-react';
import { IdiomaContext } from '../../providers/IdiomaProvider';
import {useContext} from "react";
import { PantallaVerSitio } from '../../services/idiomas/PantallaVerSitio';


const HorarioTable = ({ headers, data }) => {
    const {idioma, setIdioma} = useContext(IdiomaContext);

    if (data.length == 0 || data == undefined || data == null) {
        return (
            <div className="col-span-3">
                <p className="ml-6 text-black-500">{PantallaVerSitio['ValidacionHorario'][idioma]}</p>
            </div>
        )  
    }else{
        return (
            <Table hoverable striped>
                <Table.Head className="divide-y whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {headers.map((header, index) => (
                        <Table.HeadCell key={index}>
                            {PantallaVerSitio[header][idioma]}
                        </Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="divide-y overflow">
                    {data.map((item, index) => (
                        <Table.Row
                            key={index}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell>
                                {PantallaVerSitio[item.dia][idioma]} {/* Accede a la propiedad "dia" para el nombre del día */}
                            </Table.Cell>
                            <Table.Cell className="text-xs">
                                {item.horario} {/* Accede a la propiedad "horario" para el horario */}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
};

export default HorarioTable;

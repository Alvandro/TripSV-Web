import React, {useContext} from 'react';
import { Table } from 'flowbite-react';
import ServicesCategoriesPriceIdiom from "../../services/idiomas/ServicesCategoriesPriceIdiom.js";
import {IdiomaContext} from "../../providers/IdiomaProvider.jsx";


export default function OneColumnTable({ servicios = [], tituloTabla = "Ejemplo Tituto" ,data=[]}) {

    const {idioma, setIdioma} = useContext(IdiomaContext);

    return (
        <Table className="table-fixed bg-slate-100 rounded">
            <Table.Head>
                <Table.HeadCell>{tituloTabla}</Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {servicios.map((x, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{data[x][idioma]}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

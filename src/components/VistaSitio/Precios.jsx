import { Table } from 'flowbite-react';
import React from "react";
export default function Precios({titulo, precio}){
    return (
        <Table hoverable  striped className={""}>
            <Table.Head className="divide-y whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Table.HeadCell >
                        {titulo}
                    </Table.HeadCell>
            </Table.Head>
            <Table.Body className={"divide-y"}>
                    <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell  >
                            ${precio}
                        </Table.Cell>
                    </Table.Row>
            </Table.Body>
        </Table>
    )
}
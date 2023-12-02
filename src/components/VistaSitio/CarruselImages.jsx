import React from 'react';
import { Carousel } from 'flowbite-react';

export default function CarruselImages({ imagenes }) {

    return (
        <Carousel className={"h-[400px] p-4"}>
            {
                imagenes.map((imagen, index) => {
                    return <img
                        key={index}
                        alt="imagen del sitio"
                        src={imagen}
                    />
                })
            }
        </Carousel>
    )
}
import React from 'react';
import ImgRandom from "./ImgRamdom";

export function BanerPublicidad() {
    const randomImages = ImgRandom();

    // Verificar si hay imágenes disponibles
    if (randomImages.length === 0) {
        return <div>Cargando imágenes...</div>;
    }

    // Obtener una imagen al azar seleccionando un índice aleatorio
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const randomImage = randomImages[randomIndex];

    return (
        <footer className="bottom-0">
            <div className="bg-gray-100">
                <img
                    className="rounded-3xl p-4 w-full h-48 object-fill transition-all duration-300 rounded-lg "
                    src={randomImage.imageUrl} // Aquí se usa la imagen seleccionada al azar
                    alt={`Imagen`}
                />
            </div>
        </footer>
    );
}

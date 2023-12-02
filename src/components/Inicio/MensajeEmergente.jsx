import React, { useState, useEffect } from "react";

const MensajeEmergente = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000); // Oculta el mensaje después de 1 segundos

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        isVisible && (
            <div className="absolute top-10 right-10 p-2 bg-gray-400  text-white font-semibold text-center rounded-tl-md rounded-tr-lg rounded-bl-md rounded-br-md shadow-lg inline-block">
                <span className="absolute w-4 h-4 bg-gray-400  rounded-tl-full rounded-br-full -right-1 -top-1"></span>
                {message}
            </div>

        )
    );
};

export default MensajeEmergente;

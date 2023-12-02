
import React from "react"


/**
 *
 * @param title titulo del banner
 * @param imgUrl el url de la imagen papus pd una en hd xd
 * @returns {JSX.Element}
 * @constructor
 */
export default function Banner({ title = "Title Example", imgUrl }) {
    return (
        <div className=" h-1/6  bg-playa bg-center text-center flex items-center justify-center rounded">
            <p className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-black">
                {title}
            </p>
        </div>

    )
}
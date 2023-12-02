import React, { useState, useEffect, useContext } from "react";
import { AgregarSitioIdioma } from "../../services/idiomas/AgregarSitioIdioma.js";
import { IdiomaContext } from "../../providers/IdiomaProvider.jsx";

const PanelImagenes = ({ imagenes, setImagenes }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedFileNames, setSelectedFileNames] = useState([]);
  const { idioma, setIdioma } = useContext(IdiomaContext);
  useEffect(() => {
    const names = selectedImages.map((file) => file.name);
    // setSelectedFileNames(names);
    setImagenes(selectedImages);
  }, [selectedImages, setImagenes]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => prevImages.concat(files));
    const newImages = selectedImages.concat(files);
    setSelectedImages(newImages);
    setImagenes = newImages;
    //
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    // const updatedFileNames = [...selectedFileNames];

    // updatedImages.splice(index, 1);
    // updatedFileNames.splice(index, 1);

    // setSelectedImages(updatedImages);
    // setSelectedFileNames(updatedFileNames);
    // setImagenes = updatedImages;
    //
  };

  return (
    <div>
      <p className="text9">{AgregarSitioIdioma["fotos"][idioma]}</p>
      <p className="text9">
        {AgregarSitioIdioma["descripcionFotos"][idioma]}
      </p>
      <br />
      <div className="flex flex-col items-center">
        <div
          className={`${selectedImages.length === 0
              ? "flex flex-col items-center border border-blue-500 p-4 mb-4"
              : "hidden"
            }`}
          style={{ width: "70vw", backgroundColor: "#EEFAFF" }}
        >
          <p>{AgregarSitioIdioma["cuadroFotos"][idioma]}</p>

        </div>
        {selectedImages.length > 0 && (
          <div className="border border-solid border-1 border-blue-500 bg-blue-100 text-blue-500 p-10 w-95">
            <div className="flex flex-row flex-wrap">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 mr-4 relative"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Imagen ${index + 1}`}
                    style={{ maxWidth: "100px" }}
                  />
                  {/* <div className="absolute top-0 right-0"> */}
                  <button
                    className=" flex justify-center items-center text-lowercase text-base font-bold absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                    onClick={() => handleImageRemove(index)}
                  >
                    x
                  </button>

                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
        <label className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg">
          {AgregarSitioIdioma["botonFoto"][idioma]}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="uploadInput"
          />
        </label>
      </div>
    </div>
  );
};

export default PanelImagenes;

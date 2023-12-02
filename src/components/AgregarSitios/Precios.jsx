import React, { useEffect } from "react";

const Precios = ({ precios, precio, setPrecio, precioRegex }) => {

  useEffect(() => {
    if (precio) {
      setPrecio((prevState) => {
        const newState = { ...prevState };
        precios.forEach((x) => {
          if (!newState[x.id]) {
            newState[x.id] = "";
          }
        });
        return newState;
      });
    }
  }, []);
  const handleInputChange = (name, value) => {
    if (precioRegex.test(value) || value === "") {
      // Actualizar el estado 'precio' directamente
      setPrecio((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-lg mt-4">Precios del Lugar:</h2>
      <h3 className="text-gray-600 mt-2">Ingresa los precios, si se deja en blanco es gratis.</h3>
      <div className="m-6 ml-[0em]">
        {precios.map((x, index) => {
          return <div className="flex items-center bg-white rounded-md p-2" key={index}>
            <span className="bg-blue-600 text-white px-[2.2em] w-3/4 py-1 rounded-l-md">
              {x.name}
            </span>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <input
                  type="number"
                  className="flex-1 border-l border-t border-b border-blue-500 rounded-r-md px-3 py-1"
                  placeholder="$0.00"
                  min="0"
                  inputMode="numeric"
                  id="precioEstudiantes"
                  onChange={(e) => handleInputChange(x.id, e.target.value)}
                // onBlur={onBlurEstudiantes}
                />
              </div>
            </div>
          </div>

        })}
      </div>
    </div>
  );
};

export default Precios;

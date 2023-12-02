import React, { useCallback } from "react";

const CheckBox = ({
  titulo = "titulo",
  checkValue,
  setCheckValue,
  values = [],
}) => {

  const manejarInputs = useCallback(
    (nombre, valor) => {
      let updateValors = [...checkValue];

      if (!valor) {
        updateValors = updateValors.filter((item) => item !== nombre);
      } else if (!updateValors.includes(nombre)) {
        updateValors.push(nombre);
      }

      setCheckValue(updateValors);
    },
    [checkValue, setCheckValue]
  );
  return (
    <div className="">
      {/*  Divs de Categorias*/}
      <div className="flex flex-col w-full sm:w-auto">
        <div className="m-6 ml-0">
          <div className="flex flex-col  bg-white rounded-md p-2 border border-blue-500 rounded-md ">
            <span className="bg-blue-600 text-white px-6 py-1 rounded-t-md block">
              {titulo}
            </span>
            {
              values.map((x, index) => {
                return (<div className="flex flex-row gap-4 mt-4" key={index}>
                  <div className="w-full sm:w-1/2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="Servicios"
                        checked={checkValue.includes(x.id)}
                        onChange={(e) => manejarInputs(x.id, e.target.checked)}
                      />
                      <label htmlFor="checkbox1" className="pl-5"> {x.name} </label>
                    </div>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
import React, { useContext, useState } from "react";
import PanelImagenes from "../components/AgregarSitios/PanelImagenes";
import Horarios from "../components/AgregarSitios/Horarios";
import Banner from "../components/Banner.jsx";
import MapView from "../components/AgregarSitios/Mapa";
import { BanerPublicidad } from "../components/banerPublicitario/BanerPublicidad.jsx";
import "leaflet/dist/leaflet.css";
import * as AgregarSitioController from "../components/AgregarSitios/AgregarSitioController";
import { IdiomaContext } from "../providers/IdiomaProvider.jsx";
import { AgregarSitioIdioma } from "../services/idiomas/AgregarSitioIdioma.js";
import CheckBox from "../components/AgregarSitios/Checkbox";
import ServicesCategoriesPriceIdiom from "../services/idiomas/ServicesCategoriesPriceIdiom";
import Precios from "../components/AgregarSitios/Precios"
import Swal from "sweetalert2";
import { AutenticacionServices } from "../services/FirebaseAutenticacion/Autenticacion";
const Agregar = () => {

  const { handleSignIn, handleSignOut, userEmail, reloguearse } = AutenticacionServices();


  const paterns = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)/i,
    telefono: /^[0-9]+$/i,
    precio: /^\d*\.?\d{0,2}$/
  };

  const [categorias, setCategorias] = useState([])
  const [servicios, setServicios] = useState([])
  const [horario, setHorario] = useState([]);
  const [ubicacion, setUbicacion] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [precios, setPrecios] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [tituloError, setTituloError] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [descripcionError, setDescripcionError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const { idioma, setIdioma } = useContext(IdiomaContext);

  const { categoriesList, servicesList, priceList } = ServicesCategoriesPriceIdiom();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onChange = (e) => {
    const nuevoValor = e.target.value.replace(/\+/g, '');
    setTitulo(nuevoValor);
    if (tituloError) {
      setTituloError(false);
    }
  };

  const onBlurTitulo = () => {
    if (titulo.trim() === "") {
      setTituloError(true);
    }
  };

  const onChangeDescripcion = (e) => {
    const nuevoValor = e.target.value.replace(/\+/g, '');
    setDescripcion(nuevoValor);
    if (descripcionError) {
      setDescripcionError(false);
    }
  };

  const onBlurDescripcion = () => {
    if (descripcion.trim() === "") {
      setDescripcionError(true);
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  };

  const GuardarDatos = async () => {
    const { value: isConfirmed } = await Swal.fire({
      title: "Guardando Sitio",
      text: "¿Está seguro de que los datos son correctos?",
      icon: "warning",
      showCancelButton: true, // Mostrar botones de "Sí" y "No"
      confirmButtonText: "Sí", // Texto del botón "Sí"
      cancelButtonText: "No", // Texto del botón "No"
    });

    if (isConfirmed) {
      Swal.fire({
        title: "Se están subiendo el sitio",
        icon: "info",
        showConfirmButton: false, // No mostrar el botón "OK"
        timer: 3000 // Duración en milisegundos antes de que se cierre automáticamente
      });

      const result = await AgregarSitioController.GuardaDato(userEmail, imagenes, titulo, descripcion, ubicacion, precios, selectedOption, servicios, categorias, horario);


      if (result === true) {
        Swal.fire("Se ha subido el sitio con éxito.", "", "success", {
          timer: 2000,
        });

        setTimeout(() => {
          // resetCampos();
          // window.location.reload();
        }, 2000);
      } else if (result === false) {
        Swal.fire("Faltan campos por llenar.", "", "error", {
          timer: 3500,
        });
      }
    }
  };


  // const resetCampos = () => {
  //   setImagenes([]);
  //   setTitulo("");
  //   setDescripcion("");
  //   setUbicacion("");
  //   // setEstudiantes("");
  //   // setExtranjeros("");
  //   // setGeneral("");
  //   // setNino("");
  //   // setParqueo("");
  //   // setAdultoMayor("");
  //   setSelectedOption("");
  // };


  return (
    <div className="p-4 h-screen  overflow-y-auto">
      <Banner title={AgregarSitioIdioma["tituloBaner"][idioma]} />
      <br />
      <div className="h-1 w-87 bg-gray-500 bg-opacity-50 mt-25 ml-50"></div>
      <br />
      <div>
        <PanelImagenes imagenes={imagenes} setImagenes={setImagenes} /> <br />
      </div>
      <div className="h-1 w-87 bg-gray-500 bg-opacity-50 mt-25 ml-50"></div>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {/* Divs de los inputs*/}
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mt-4">
            {AgregarSitioIdioma["titulo"][idioma]}:
          </h2>
          <h3 className="text-gray-600 mt-2">Ingrese un titulo para su sitio.</h3>
          <input
            id="titulo"
            type="text"
            className="ml-30 mt-4 p-5 rounded-md w-150 h-2 text-sm outline-gainsboro border-blue-500 "
            placeholder="Titulo"
            value={titulo}
            onChange={onChange}
            onBlur={onBlurTitulo}
          ></input>
          {tituloError && (
            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mt-4">
            {AgregarSitioIdioma["telefono"][idioma]}:
          </h2>
          <h3 className="text-gray-600 mt-2">Ingrese su número sin clave de área.</h3>
          <input
            className="ml-30 mt-4 p-5 rounded-md w-150 h-2 text-sm outline-gainsboro background-cover background-left border-blue-500 "
            type="number"
            style={{ WebkitAppearance: "textfield" }}
            placeholder="Telefono (Opcional)"
            id="telefono"
            min="1"
            inputMode="numeric"

          ></input>
        </div>
      </div>
      <br />
      {/* Fin de los Divs de los inputs*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {/* Divs de los descrpcion*/}
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mt-4">
            {AgregarSitioIdioma["descripcionTitulo"][idioma]}:
          </h2>
          <h3 className="text-gray-600 mt-2">
            {AgregarSitioIdioma["descripcionSubTitulo"][idioma]}
          </h3>
          <textarea
            className="border rounded-md mt-4 p-4 w-full border-blue-500 "
            id="dsp"
            placeholder="Descripcion"
            style={{ height: 100, resize: "none" }}
            value={descripcion}
            onChange={onChangeDescripcion}
            onBlur={onBlurDescripcion}
          ></textarea>
          {descripcionError && (
            <p className="text-red-500 text-sm mt-1">{AgregarSitioIdioma["Campo requerido"][idioma]}*</p>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mt-4">
            {AgregarSitioIdioma["direccion"][idioma]}:
          </h2>
          <h3 className="text-gray-600 mt-2">Seleccione la ubicación en el mapa.</h3>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg mt-10 w-36 mx-auto block"
            onClick={openModal}
          >
            {" "}
            {AgregarSitioIdioma["boton1"][idioma]}{" "}
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black opacity-50"></div>
          )}
          {isModalOpen && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 bg-white p-4 rounded-lg shadow-md">
              <div className="w-full h-96">
                <MapView ubicacion={ubicacion} setUbicacion={setUbicacion} />
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {AgregarSitioIdioma["Cerrar Mapa"][idioma]}

                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <br /> {/* Fin de los Divs de descrpcion*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {/*  Divs de Precios*/}
        <Precios precio={precios} setPrecio={setPrecios} precios={priceList} precioRegex={paterns.precio} />
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mt-4"> {AgregarSitioIdioma["Departamentos"][idioma]}:</h2>
          <h3 className="text-gray-600 mt-2">Elige un departamento.</h3>
          <select
            id="Departamentos"
            className="border border-blue-500  text-blue-600 mt-5 w-1/2 h-10 rounded px-2  mx-auto"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="">{AgregarSitioIdioma["selector"][idioma]}</option>
            <option value="Ahuachapán">Ahuachapán</option>
            <option value="Cabañas">Cabañas</option>
            <option value="Chalatenango">Chalatenango</option>
            <option value="Cuscatlán">Cuscatlán</option>
            <option value="La Libertad">La Libertad</option>
            <option value="La Paz">La Paz</option>
            <option value="La Unión">La Unión</option>
            <option value="Morazán">Morazán</option>
            <option value="Santa Ana">Santa Ana</option>
            <option value="San Miguel">San Miguel</option>
            <option value="San Salvador">San Salvador</option>
            <option value="San Vicente">San Vicente</option>
            <option value="Sonsonate">Sonsonate</option>
            <option value="Usulután">Usulután</option>
          </select>
          {selectedOption === "" && (
            <div className="text-red-500 mt-2  mx-auto">{AgregarSitioIdioma["Campo requerido"][idioma]}*</div>
          )}
        </div>
      </div>{" "}
      {/* Fin de los Divs de Precios*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">

        <CheckBox titulo={AgregarSitioIdioma["servicioTitulo"][idioma]} checkValue={servicios} setCheckValue={setServicios} values={servicesList} />
        {/* Fin de Divs de Categorias*/}
        <CheckBox titulo={AgregarSitioIdioma["categoriaTitulo"][idioma]} checkValue={categorias} setCheckValue={setCategorias} values={categoriesList} />

      </div>
      <div>
        <h2 className="font-bold text-lg mt-4"> {AgregarSitioIdioma["horarioTitulo"][idioma]}:</h2>
        <h3 className="text-gray-600 mt-2">
          {AgregarSitioIdioma["horarioSubTitulo"][idioma]}
        </h3>
        <br />
        <div className="h-1 w-87 bg-gray-500 bg-opacity-50 mt-25 ml-50"></div>
        <br />
        <Horarios horario={horario} setHorario={setHorario} />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={GuardarDatos}
        >
          {AgregarSitioIdioma["botonGuardar"][idioma]}
        </button>
      </div>
      <BanerPublicidad></BanerPublicidad>
      {successAlert && (
        <div className="bg-green-500 text-white p-2 absolute top-0 right-0 m-4 rounded">
          *** ¡{AgregarSitioIdioma["Datos Guardados con Éxito"][idioma]}! ***
        </div>
      )}
      {errorAlert && (
        <div className="bg-red-500 text-white p-2 absolute top-0 right-0 m-4 rounded">
          *** {AgregarSitioIdioma["Faltan Campos"][idioma]} ***
        </div>
      )}
    </div>
  );
};
export default Agregar;

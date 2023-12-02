import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import AdministracionAnuncios from "./pages/AdministracionAnuncios.jsx";
import AdministracionSitios from "./pages/AdministracionSitios.jsx";
import AdministracionUsuario from "./pages/AdministracionUsuario.jsx";
import AgregarSitio from "./pages/AgregarSitio.jsx";
import EstadoSitios from "./pages/EstadoSitios.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Inicio from "./pages/Inicio.jsx";
import VistaSitio from "./pages/VistaSitio.jsx";
import { IdiomaProvider } from "./providers/IdiomaProvider.jsx";
import Layout from "./Layout.jsx";
import NotFound from './NotFound.jsx';
import Mapa from "./services/MapLeaflet/Mapa.jsx";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad.jsx";

export const UserProvider = createContext({});

export default function Main() {

  const [userState, setUserState] = useState({
    logeado: false,
    role: "usuario"
  });

  useEffect(() => {

  }, [userState.role])


  return (
    <React.StrictMode>
      <IdiomaProvider>
        <UserProvider.Provider value={{ userState, setUserState }}>
          <BrowserRouter basename="/">
            <Routes>
              <Route exact path="/" element={<App />} />
              <Route exact path="/privacidad" element={<PoliticaPrivacidad />} />
              {/*<Route path="/*" element={<NotFound />} />*/}
              <Route path="/mapa/:parametro" element={<Mapa />}>
              </Route>
              {/*Paginas adentro del layout*/}
              <Route element={<Layout />} >
                <Route exact path="/favoritos" element={<Favoritos />} />
                <Route exact path="/inicio" element={<Inicio />} />
                <Route exact path="/vista-sitio" element={<VistaSitio />} />
                {/*  Paginas de administracion se veran solo cuando esten logeados*/}
                {
                  (userState.logeado) && (
                    <>
                      <Route exact path="/estado" element={<EstadoSitios />} />
                      <Route exact path="/agregar-sitio" element={<AgregarSitio />} />
                    </>
                  )
                }
                {/* Paginas de administracion que se vera cuando enten con role admin */}
                {
                  (userState.role === "administrador") && (
                    <>
                      <Route path={"/admin-usuarios"} element={<AdministracionUsuario />} />
                      <Route path={"/admin-sitios"} element={<AdministracionSitios />} />
                      <Route path={"/admin-anuncios"} element={<AdministracionAnuncios />} />
                    </>
                  )
                }

              </Route>

            </Routes>
            <Routes>

            </Routes>
          </BrowserRouter>
        </UserProvider.Provider>
      </IdiomaProvider>
    </React.StrictMode>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)

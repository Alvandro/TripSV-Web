import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerShadowUrl from "./img/marker-shadow.png";
import markerIconUrl from "./img/marker-icon.png";
import { redirect, useParams } from "react-router-dom";

function MyMarker({ position, onLocationChange }) {
  const [markerPosition, setMarkerPosition] = useState(position);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationChange({ lat, lng });
    },
  });

  return (
    <Marker
      position={markerPosition}
      icon={L.icon({
        iconUrl: markerIconUrl,
        shadowUrl: markerShadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      })}
    >
      <Popup>Esta será tu ubicación</Popup>
    </Marker>
  );
}

function Mapa({ }) {
  // Accede a los valores pasados en las props
  const { parametro } = useParams();


  const [currentLocation, setCurrentLocation] = useState(null);
  const [recargar, setRecargar] = useState(true);
  const webViewRef = useRef(null);
  useEffect(() => {

    if (parametro !== "nativo") {

      window.location.href = "/inicio"
    } else if ("geolocation" in navigator && recargar === true) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setRecargar(false);
        },
        (error) => {
          alert("No se pudo obtener los permisos")
          setRecargar(true);
        }
      );
    }

  }, [recargar]);

  function enviarUbicacionALaApp(ubicacion) {
    window.postMessage(JSON.stringify({
      tipo: "ubicacion",
      datos: ubicacion,
    }), "*");
  }

  // Función para manejar el cambio de ubicación
  const handleLocationChange = (newLocation) => {
    setCurrentLocation(newLocation);
    enviarUbicacionALaApp(newLocation);
  };

  if (currentLocation === null) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-6xl font-bold">Tripsv - Maps</h1>
        <p className="text-2xl py-2">Necesitamos acceso a tu ubicación para que puedas elegir una ubicación</p>
        <p className="text-2xl py-2">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <MapContainer className="w-full h-full" center={currentLocation} zoom={13}>
        <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        <MyMarker position={currentLocation} onLocationChange={handleLocationChange} />
      </MapContainer>
    </div>
  );
}

export default Mapa;

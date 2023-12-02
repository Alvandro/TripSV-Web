import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIconUrl from "../AgregarSitios/img/marker-icon.png";
import markerShadowUrl from "../AgregarSitios/img/marker-shadow.png";

const MarkerIcon = L.icon({
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl
});

const CustomMarker = (props) => {
  const markerRef = useRef(null);

  const initMarker = () => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  return (
    <Marker ref={markerRef} eventHandlers={{ add: initMarker }} {...props} />
  );
};

const MapView = ({ ubicacion, setUbicacion }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const zoom = 12;
  const [recargar, setRecargar] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator && recargar === true) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {

        }
      );
    } else {

    }

    setRecargar(false);
  }, [recargar]);

  const ChangeMapView = ({ center, zoom }) => {
    const map = useMapEvents({
      click: (e) => {
        setClickedLocation(e.latlng);
        setUbicacion(e.latlng);
      },
    });

    useEffect(() => {
      map.setView(center, zoom);
    }, [map, center, zoom]);

    return null;
  };

  return (
    <div className="w-full h-full">
      {currentLocation && (
        <MapContainer
          center={currentLocation}
          zoom={zoom}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />
          <ChangeMapView center={currentLocation} zoom={zoom} />
          {clickedLocation && (
            <CustomMarker position={clickedLocation} icon={MarkerIcon}>
              <Popup>
                <pre>
                  {"Latitude: " +
                    clickedLocation.lat.toFixed(2) +
                    ", Longitude: " +
                    clickedLocation.lng.toFixed(2)}
                </pre>
              </Popup>
            </CustomMarker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
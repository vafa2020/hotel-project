// import { useHotel } from "../../context/HotelProvider";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotel } from "../../context/HotelProvider";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../../hook/useGeoLocation";
export const Map = () => {
  const [searchparams] = useSearchParams();
  const [mapCenter, setMapCenter] = useState([32.4279, 53.688]);
  const latitude = searchparams.get("lat");
  const longitude = searchparams.get("lon");
  const { hotels } = useHotel();
  const { isGeoLoading, geoPosition, getGeoPosition } =
    useGeoLocation();
  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter([latitude, longitude]);
    }
  }, [latitude, longitude]);
  useEffect(() => {
    if (geoPosition.latitude && geoPosition.longitude) {
      setMapCenter([geoPosition.latitude, geoPosition.longitude]);
    }
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getGeoPosition}>
          {isGeoLoading ? "loading..." : "Access Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter positon={mapCenter} />

        {hotels.map((item) => (
          <Marker position={[item.latitude, item.longitude]} key={item.id}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ positon }) {
  const map = useMap();
  map.setView(positon);
  return null;
}

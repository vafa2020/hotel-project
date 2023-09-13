import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../../hook/useGeoLocation";
import { useLatLng } from "../../hook/useLatLng";
export const Map = ({ MarkerList }) => {
  const [lat, lng] = useLatLng();
  const [mapCenter, setMapCenter] = useState([32.4279, 53.688]);

  ///this state is for button access your loction .👇
  const { isGeoLoading, geoPosition, getGeoPosition } = useGeoLocation();
  ///-----
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
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
        <DetectBookMark />
        {MarkerList?.map((item) => (
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
function DetectBookMark() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

import { useState } from "react";

export const useGeoLocation = () => {
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [geoPosition, setGeoPosition] = useState({});

  function getGeoPosition() {
    if (!navigator.geolocation) {
      setGeoError("not access to geoLocation");
    }
    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoPosition(position.coords);
        setIsGeoLoading(false);
      },
      (error) => {
        setGeoError(error.message);
        setIsGeoLoading(false);
      }
    );
  }

  return { isGeoLoading, geoError, geoPosition, getGeoPosition };
};

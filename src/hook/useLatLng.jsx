import { useSearchParams } from "react-router-dom";

export const useLatLng = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat") || 30;
  const lng = searchParams.get("lng") || 2;
  if (lat === null || lng === null) {
    return <p>isLoading...</p>;
  }
  return [lat, lng];
};

import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";

const hotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `smart_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  ///
  //   const { data, isLoading } = useFetch(
  //     "http://localhost:5000/hotels",
  //     `q=${destination|| ""}&accommodates_gte=${room || 1}`
  //   );
  //(Full-text search)/وقتی تو کوِئری از ----q---- استفاده میکنیم یعنی کلمه سرچ شده تو همه ی پراپرتی های سرور سرچ میشود
  return (
    <hotelContext.Provider value={{ hotels, isLoading }}>
      {children}
    </hotelContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useHotel() {
  return useContext(hotelContext);
}

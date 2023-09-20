import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import axios from "axios";

const hotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [currentHotel, setCurrentHotel] = useState({});
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

  async function getCurrentHotel(id) {
    if (currentHotel?.id === Number(id)) return;
    try {
      const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <hotelContext.Provider
      value={{ hotels, isLoading, currentHotel, getCurrentHotel }}
    >
      {children}
    </hotelContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useHotel() {
  return useContext(hotelContext);
}

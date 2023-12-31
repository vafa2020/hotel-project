import { Outlet } from "react-router-dom";
import { Map } from "../Map/Map";
import { useHotel } from "../../context/HotelProvider";

export const AppLayout = () => {
  const { hotels } = useHotel();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map MarkerList={hotels} />
    </div>
  );
};

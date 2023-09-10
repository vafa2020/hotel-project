import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">map</div>
    </div>
  );
};

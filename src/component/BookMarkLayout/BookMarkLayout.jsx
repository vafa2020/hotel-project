import { Outlet } from "react-router-dom";
import { Map } from "../Map/Map";
import { useBookmark } from "../../context/BookmarkProvider";

export const BookMarkLayout = () => {
  const { data } = useBookmark();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map MarkerList={data} />
    </div>
  );
};

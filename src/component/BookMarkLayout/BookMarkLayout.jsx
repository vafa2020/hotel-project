import { Outlet } from "react-router-dom";
import { Map } from "../Map/Map";
import { useBookmark } from "../../context/BookmarkProvider";

export const BookMarkLayout = () => {
  const { bookmark_list } = useBookmark();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map MarkerList={bookmark_list} />
    </div>
  );
};

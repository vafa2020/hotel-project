import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkProvider";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

export const BookmarkList = () => {
  const { isLoading, bookmark_list, current_bookmark, deleteBookMark } =
    useBookmark();

  if (isLoading) {
    return <p>loading...</p>;
  }
  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteBookMark(id);
  };
  return (
    <div className="bookmarkList">
      {bookmark_list.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={
              current_bookmark?.id === item.id
                ? "bookmarkItem current-bookmark"
                : "bookmarkItem"
            }
          >
            <ReactCountryFlag svg countryCode={item.countryCode} />
            <strong>{item.cityName}</strong>
            <span>{item.country}</span>
            <button
              className="trash"
              onClick={(e) => deleteHandler(e, item.id)}
            >
              <HiTrash />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

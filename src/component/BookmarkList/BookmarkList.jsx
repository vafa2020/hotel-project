import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkProvider";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

export const BookmarkList = () => {
  const { data, isLoading, currentBookmark } = useBookmark();
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="bookmarkList">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={
              currentBookmark.id === item.id ? "bookmarkItem current-bookmark" : "bookmarkItem"
            }
          >
            <ReactCountryFlag svg countryCode={item.countryCode} />
            <strong>{item.cityName}</strong>
            <span>{item.country}</span>
            <button className="trash">
              <HiTrash />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

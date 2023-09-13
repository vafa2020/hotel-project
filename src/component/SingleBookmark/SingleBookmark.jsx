import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";

export const SingleBookmark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, getCurrentBookmark, current_bookmark } = useBookmark();
  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);
  if (isLoading || !current_bookmark) {
    return <p>loading...</p>;
  }
  return (
    <div className="bookmarklist">
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr;Back
      </button>
      <h2 style={{ margin: "5px 0" }}>{current_bookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={current_bookmark.countryCode} />
        <strong>{current_bookmark.cityName}</strong>
        <span>{current_bookmark.country}</span>
      </div>
    </div>
  );
};

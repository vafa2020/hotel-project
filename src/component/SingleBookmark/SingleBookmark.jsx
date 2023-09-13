import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";

export const SingleBookmark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:5000/bookmarks/${id}`);
  const { setCurrentBookmark } = useBookmark();
  useEffect(() => {
    setCurrentBookmark(data);
  }, [data, setCurrentBookmark]);
  if (isLoading) {
    return <p>loading...</p>;
  }
  console.log(data, id);
  return (
    <div className="bookmarklist">
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr;Back
      </button>
      <h2 style={{margin:"5px 0"}}>{data.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={data.countryCode} />
        <strong>{data.cityName}</strong>
        <span>{data.country}</span>
      </div>
    </div>
  );
};

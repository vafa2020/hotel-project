import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkProvider";

export const SingleBookmark = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:5000/bookmarks/${id}`);
  const { setCurrentBookmark } = useBookmark();
  useEffect(() => {
    setCurrentBookmark(data);
  }, [data, setCurrentBookmark]);
  if (isLoading) {
    return <p>loading...</p>;
  }
  console.log(data,id);
  return (
    <div className="room">
      <div className="roomDetail">
        <strong>{data.cityName}</strong>
        <div>
          {data.country} reviews &bull; {data.host_location}
        </div>
      </div>
    </div>
  );
};

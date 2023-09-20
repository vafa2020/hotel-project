import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import { useHotel } from "../../context/HotelProvider";
import { useEffect } from "react";

export const SingleHotel = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:5000/hotels/${id}`);
  const { getCurrentHotel } = useHotel();
  useEffect(() => {
    getCurrentHotel(id);
  }, [id, getCurrentHotel]);
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img src={data?.xl_picture_url} alt={data.name} />
      </div>
    </div>
  );
};

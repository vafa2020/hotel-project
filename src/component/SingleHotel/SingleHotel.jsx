import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleHotel = () => {
  const [hotel, setHotel] = useState({});
  const params = useParams();
  const id = parseInt(params.id);
  useEffect(() => {
    fetchHotel(id);
  }, [id]);

  async function fetchHotel(id) {
    const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
    setHotel(data);
  }
  return (
    <div className="searchItem">
      <img src={hotel?.picture_url?.url} alt={hotel.name} />
      <div className="searchItemDesc">
        <p className="location">{hotel.smart_location}</p>
        <p className="name">{hotel.name}</p>
        <p className="price">
          €&nbsp;{hotel.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
};

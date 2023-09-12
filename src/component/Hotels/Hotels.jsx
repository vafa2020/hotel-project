import { Link } from "react-router-dom";
import { useHotel } from "../../context/HotelProvider";

export const Hotels = () => {
  const { hotels, isLoading, currentHotel } = useHotel();
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={
              currentHotel.id === item.id
                ? "searchItem current-hotel"
                : "searchItem"
            }
          >
            <img src={item?.picture_url?.url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;<span>night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

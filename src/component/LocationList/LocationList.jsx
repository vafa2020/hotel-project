import { useFetch } from "../../hook/useFetch";

export const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels");
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="nearbyLoaction">
      <h2>Nearby Loaction</h2>
      <div className="locationList">
        {data?.map((item) => (
          <Location data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

function Location({ data }) {
  return (
    <div className="locationItem">
      <img src={data?.picture_url?.url} alt={data.name} />
      <div className="locationItemDesc">
        <p className="location">{data.smart_location}</p>
        <p className="name">{data.name}</p>
        <p className="price">
          €&nbsp;{data.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
}

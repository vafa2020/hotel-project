import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";

export const Hotels = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `smart_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  ///
  //   const { data, isLoading } = useFetch(
  //     "http://localhost:5000/hotels",
  //     `q=${destination|| ""}&accommodates_gte=${room || 1}`
  //   );
  //(Full-text search)/وقتی تو کوِئری از ----q---- استفاده میکنیم یعنی کلمه سرچ شده تو همه ی پراپرتی های سرور سرچ میشود 
  if (isLoading) {
    return <p>loading...</p>;
  }
  return <div>{data.length}</div>;
};

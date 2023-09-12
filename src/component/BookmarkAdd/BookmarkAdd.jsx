import { useSearchParams } from "react-router-dom";

export const BookmarkAdd = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log(lat, lng);
  return (
    <form action="">
      <div className="formControl">
        <div className="flag"></div>
        <label htmlFor="">add marker</label>
        <input type="text" />
      </div>
      <button className="buttons btn">add</button>
    </form>
  );
};

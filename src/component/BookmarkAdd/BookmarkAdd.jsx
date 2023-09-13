import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLatLng } from "../../hook/useLatLng";

const BASE_URL_GEO = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const BookmarkAdd = () => {
  const [lat, lng] = useLatLng();
  const [inputValues, setInputValues] = useState({
    country: "",
    cityName: "",
    countryCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getLocation() {
      try {
        const {
          data: { countryName, city, countryCode },
        } = await axios.get(`${BASE_URL_GEO}?latitude=${lat}&longitude=${lng}`);
        setInputValues({
          cityName: city,
          country: countryName,
          countryCode: countryCode,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [lat, lng]);
  const submitHandler = async (e) => {
    e.preventDefault();

    const newBookMark = {
      ...inputValues,
      latitude: lat,
      longitude: lng,
      host_location: `${inputValues.cityName} ${inputValues.country}`,
      id: Math.floor(Math.random() * 10000),
    };
    await axios.post("http://localhost:5000/bookmarks", newBookMark);
    navigate("/bookmark");
  };
  return (
    <div>
      <h2>Add New Bookmark</h2>
      <form onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            placeholder="city..."
            defaultValue={inputValues.cityName}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="country..."
            defaultValue={inputValues.country}
          />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr;Back
          </button>
          <button className="btn btn--primary" type="submit">
            AddNewBookmark
          </button>
        </div>
      </form>
    </div>
  );
};

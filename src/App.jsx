import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header/Header";
import { LocationList } from "./component/LocationList/LocationList";
import "./App.css";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { Hotels } from "./component/Hotels/Hotels";
import { HotelProvider } from "./context/HotelProvider";
import { SingleHotel } from "./component/SingleHotel/SingleHotel";

function App() {
  return (
    <>
      <Header />
      <HotelProvider>
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
        </Routes>
      </HotelProvider>
    </>
  );
}

export default App;

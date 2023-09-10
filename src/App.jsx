import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header/Header";
import { LocationList } from "./component/LocationList/LocationList";
import "./App.css";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { Hotels } from "./component/Hotels/Hotels";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<>single hotels</>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

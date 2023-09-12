import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header/Header";
import { LocationList } from "./component/LocationList/LocationList";
import "./App.css";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { Hotels } from "./component/Hotels/Hotels";
import { HotelProvider } from "./context/HotelProvider";
import { SingleHotel } from "./component/SingleHotel/SingleHotel";
import { BookmarkList } from "./component/BookmarkList/BookmarkList";
import { BookmarkAdd } from "./component/BookmarkAdd/BookmarkAdd";
import { BookMarkLayout } from "./component/BookMarkLayout/BookMarkLayout";
import { BookmarkProvider } from "./context/BookmarkProvider";
import { SingleBookmark } from "./component/SingleBookmark/SingleBookmark";

function App() {
  return (
    <>
      <Header />
      <BookmarkProvider>
        <HotelProvider>
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookMarkLayout />}>
              <Route index element={<BookmarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<BookmarkAdd />} />
            </Route>
          </Routes>
        </HotelProvider>
      </BookmarkProvider>
    </>
  );
}

export default App;

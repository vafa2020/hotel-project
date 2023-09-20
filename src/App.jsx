import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header/Header";
import { LocationList } from "./component/LocationList/LocationList";
import "./App.css";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { Hotels } from "./component/Hotels/Hotels";
import { HotelProvider } from "./context/HotelProvider";
import { SingleHotel } from "./component/SingleHotel/SingleHotel";
import { BookmarkList } from "./component/BookmarkList/BookmarkList";
import { BookMarkLayout } from "./component/BookMarkLayout/BookMarkLayout";
import { BookmarkProvider } from "./context/BookmarkProvider";
import { SingleBookmark } from "./component/SingleBookmark/SingleBookmark";
import { BookmarkAdd } from "./component/BookmarkAdd/BookmarkAdd";
import { Login } from "./component/Login/Login";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelProvider>
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmarks" element={<BookMarkLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <BookmarkList />
                  </ProtectedRoute>
                }
              />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<BookmarkAdd />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;

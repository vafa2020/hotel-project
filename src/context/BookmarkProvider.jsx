import { createContext, useContext, useState } from "react";
import { useFetch } from "../hook/useFetch";

const bookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});

  const { data, isLoading } = useFetch("http://localhost:5000/bookmarks");
  return (
    <bookmarkContext.Provider
      value={{ data, isLoading, currentBookmark, setCurrentBookmark }}
    >
      {children}
    </bookmarkContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useBookmark() {
  const result = useContext(bookmarkContext);
  if (!result) {
    console.log("not provider  useBookmark");
  }
  return result;
}

import { createContext, useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
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
  return useContext(bookmarkContext);
}

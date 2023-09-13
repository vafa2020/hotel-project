import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const bookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
    async function getBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/bookmarks");
        setBookMarkList(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getBookmarkList();
  }, []);

  async function createNewBookMark(newBookMark) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/bookmarks",
        newBookMark
      );
      setCurrentBookmark(data);
      setBookMarkList([...bookMarkList, data]);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <bookmarkContext.Provider
      value={{
        bookMarkList,
        isLoading,
        currentBookmark,
        setCurrentBookmark,
        createNewBookMark,
      }}
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

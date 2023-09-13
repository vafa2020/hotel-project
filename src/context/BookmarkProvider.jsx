import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const bookmarkContext = createContext();

const initialState = {
  isLoading: false,
  bookmark_list: [],
  current_bookmark: null,
  error: null,
};
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded/bookmark":
      return {
        ...state,
        isLoading: false,
        current_bookmark: action.payload,
      };
    case "loaded/bookmarks":
      return {
        ...state,
        isLoading: false,
        bookmark_list: action.payload,
      };
    case "loaded/created":
      return {
        ...state,
        isLoading: false,
        bookmark_list: [...state.bookmark_list, action.payload],
        current_bookmark: action.payload,
      };
    case "loaded/deleted":
      return {
        ...state,
        isLoading: false,
        bookmark_list: state.bookmark_list.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "loaded/rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
};
export const BookmarkProvider = ({ children }) => {
  const [{ isLoading, bookmark_list, current_bookmark, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);

  useEffect(() => {
    async function getBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get("http://localhost:5000/bookmarks");
        dispatch({ type: "loaded/bookmarks", payload: data });
      } catch (error) {
        dispatch({ type: "loaded/rejected", payload: error.message });
      }
    }
    getBookmarkList();
  }, []);

  async function createNewBookMark(newBookMark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/bookmarks",
        newBookMark
      );
      dispatch({ type: "loaded/created", payload: data });
    } catch (error) {
      dispatch({ type: "loaded/rejected", payload: error.message });
    }
  }

  async function deleteBookMark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "loaded/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "loaded/rejected", payload: error.message });
    }
  }

  async function getCurrentBookmark(id) {
    if (current_bookmark?.id === Number(id)) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "loaded/bookmark", payload: data });
    } catch (error) {
      dispatch({ type: "loaded/rejected", payload: error.message });
    }
  }
  return (
    <bookmarkContext.Provider
      value={{
        isLoading,
        bookmark_list,
        current_bookmark,
        createNewBookMark,
        deleteBookMark,
        getCurrentBookmark,
        error,
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
    console.log("not provider useBookmark");
  }
  return result;
}

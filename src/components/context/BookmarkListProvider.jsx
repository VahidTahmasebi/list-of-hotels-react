import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useFetch from "../../hooks/useFetch";

const BASE_URL = "http://localhost:5000/";

const BookmarkContext = createContext();

const BookmarkListProvider = ({ children }) => {
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        isLoadingCurrBookmark,
        bookmarks,
        getBookmark,
        currentBookmark,
      }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}

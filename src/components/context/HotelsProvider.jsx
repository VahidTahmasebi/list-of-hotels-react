import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import useFetch from "../../hooks/useFetch";

const BASE_URL = "http://localhost:5000/hotels";

const HotelContext = createContext();

const HotelsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);

  //   jsonServer commands:
  //   q = condition check on all data
  //   _like = condition if available
  //   _gte = condition greater than or equal to
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ isLoading, isLoadingCurrHotel, hotels, getHotel, currentHotel }}>
      {children}
    </HotelContext.Provider>
  );
};

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}

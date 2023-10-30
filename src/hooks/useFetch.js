import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, query]);

  return { isLoading, data };
}

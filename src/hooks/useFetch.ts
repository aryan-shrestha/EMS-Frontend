import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import axios from "@/axios/instance";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const response = await axios.get<T>(url);

        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      } catch (err) {
        const error = err as AxiosError;
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

export default useFetch;

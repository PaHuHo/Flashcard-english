import { useEffect, useState, useCallback  } from "react";
import URL_API from "./api";

export function useFetchData<T>(url: string) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      
      const res = await URL_API.get(url);
      setResult(res.data);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { result, loading, error, fetchData };
}

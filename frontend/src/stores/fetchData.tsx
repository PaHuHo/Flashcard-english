import { useEffect, useState, useCallback } from "react";
import URL_API from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetchData<T>(url: string, initialParams: any = {}) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(
    async (overrideParams?: any) => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = overrideParams ?? params;

        const res = await URL_API.get(url, { params: queryParams });
        setResult(res.data.data);
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    },
    [url, params]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { result, loading, error, fetchData, setParams };
}

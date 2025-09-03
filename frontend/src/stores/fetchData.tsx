import { useEffect, useState, useCallback  } from "react";
import URL_API from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetchData<T>(url: string,data?:any) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let res;

      if (data) {
        // Nếu muốn gửi theo body (POST)
        res = await URL_API.get(url, data);

        // Nếu muốn gửi dạng query params thì đổi thành:
        // res = await URL_API.get(url, { params: data });
      } else {
        res = await URL_API.get(url);
      }
      
      setResult(res.data.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }, [url,data]);
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { result, loading, error, fetchData };
}

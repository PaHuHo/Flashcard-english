import axios from "axios";
import { useAuthStore } from "./auth";
import { toast } from "react-toastify";


const URL_API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

URL_API.interceptors.request.use(
  (config) => {
     const { token } = useAuthStore.getState(); // lấy token mới nhất
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
URL_API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401||error.response?.status === 403) {
      toast.error("User login is expired")
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default URL_API;

import axios from "axios";
import { redirect } from "next/navigation"; // ✅ if you are using Next.js

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiospublicApi = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivateApi = axios.create({
  baseURL: BASE_URL,
});

// ✅ Request Interceptor (add token if exists)
axiosPrivateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (handle 401)
axiosPrivateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      redirect("/login"); // 🚨 this only works in client-side Next.js components
    }
    return Promise.reject(error);
  }
);

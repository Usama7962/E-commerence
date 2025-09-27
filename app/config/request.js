import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const axiospublicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const axiosPrivateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


const handleLogout = () => {
  localStorage.removeItem("token");
  Router.replace("/login");
};


let tokenErrorToastShown = false;
const showTokenErrorToast = (msg) => {
  if (!tokenErrorToastShown) {
    toast.error(msg);
    tokenErrorToastShown = true;
  }
};


axiosPrivateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showTokenErrorToast("Token missing. Please login.");
      handleLogout();
      throw new axios.Cancel("No token found.");
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosPrivateApi.interceptors.response.use(
  (response) => {
    
    const newToken = response.headers["x-access-token"];
    if (newToken) {
      localStorage.setItem("token", newToken);
      axiosPrivateApi.defaults.headers.common["Authorization"] =
        "Bearer " + newToken;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosPrivateApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken=localStorage.getItem('refreshToken')
      console.log(refreshToken,'redfredfredfre')

      try {
      
        const res = await axiospublicApi.post("/auth/refresh",{refreshToken});
        console.log("🔄 Refresh token request starting...");

        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);

          axiosPrivateApi.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;

          processQueue(null, newAccessToken);

          originalRequest.headers["Authorization"] =
            "Bearer " + newAccessToken;

          return axiosPrivateApi(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        showTokenErrorToast("Session expired. Please log in again.");
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

  
    if (!error.response) {
      toast.error("Network error. Check your internet.");
    } else if (status >= 400 && status < 500) {
      toast.warn(error.response.data?.message || "Client error occurred.");
    } else if (status >= 500) {
      toast.error("Server error. Try again later.");
    }

    return Promise.reject(error);
  }
);

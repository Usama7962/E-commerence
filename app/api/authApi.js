
import { axiospublicApi, axiosPrivateApi } from "../config/request";

export const signup = async (userData) => {
  const res = await axiospublicApi.post(`/auth/signup`, userData);
  return res.data;
};


export const login = async (credentials) => {
  const res = await axiospublicApi.post(`/auth/login`, credentials);
  return res.data;
};


export const forgetPassword = async (emailData) => {
  const res = await axiospublicApi.post(`/auth/forget-password`, emailData);
  return res.data;
};


export const verifyOtp = async (otpData) => {
  const res = await axiospublicApi.post(`/auth/verify-otp`, otpData);
  return res.data;
};


export const resetPassword = async (passwordData) => {
  const res = await axiospublicApi.post(`/auth/reset-password`, passwordData);
  return res.data;
};


export const getUserProfile = async () => {
  const res = await axiosPrivateApi.get(`/auth/profile`);
  return res.data;
};

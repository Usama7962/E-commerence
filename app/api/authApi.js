// 📌 api/authApi.js
import { axiospublicApi, axiosPrivateApi } from "../config/request";

// ✅ Signup (Public)
export const signup = async (userData) => {
  const res = await axiospublicApi.post(`/auth/signup`, userData);
  return res.data;
};

// ✅ Login (Public)
export const login = async (credentials) => {
  const res = await axiospublicApi.post(`/auth/login`, credentials);
  return res.data;
};

// ✅ Forget Password (Public)
export const forgetPassword = async (emailData) => {
  const res = await axiospublicApi.post(`/auth/forget-password`, emailData);
  return res.data;
};

// ✅ Verify OTP (Public)
export const verifyOtp = async (otpData) => {
  const res = await axiospublicApi.post(`/auth/verify-otp`, otpData);
  return res.data;
};

// ✅ Reset Password (Public)
export const resetPassword = async (passwordData) => {
  const res = await axiospublicApi.post(`/auth/reset-password`, passwordData);
  return res.data;
};

// ✅ Example (Private - needs token)
export const getUserProfile = async () => {
  const res = await axiosPrivateApi.get(`/auth/profile`);
  return res.data;
};

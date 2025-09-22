import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";
const BASE_URL = "https://my-backend.vercel.app/api/auth";


// ✅ Signup
export const signup = async (userData) => {
  console.log("userData", userData);
  const res = await axios.post(`${BASE_URL}/signup`, userData);
  return res.data;
};

// ✅ Login
export const login = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials);
  return res.data;
};

// ✅ Forget Password
export const forgetPassword = async (emailData) => {
  const res = await axios.post(`${BASE_URL}/forget-password`, emailData);
  return res.data;
};

// ✅ Verify OTP
export const verifyOtp = async (otpData) => {
  const res = await axios.post(`${BASE_URL}/verify-otp`, otpData);
  return res.data;
};

// ✅ Reset Password
export const resetPassword = async (passwordData) => {
  const res = await axios.post(`${BASE_URL}/reset-password`, passwordData);
  return res.data;
};

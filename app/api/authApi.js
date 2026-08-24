import { axiospublicApi } from "../config/request";

export const login = async (credentials) => {
  const res = await axiospublicApi.post("/auth/login", credentials);
  return res.data;
};

export const forgetPassword = async (emailData) => {
  const res = await axiospublicApi.post("/auth/forget-password", emailData);
  return res.data;
};

export const verifyOtp = async (otpData) => {
  const res = await axiospublicApi.post("/auth/verify-otp", otpData);
  return res.data;
};

export const resetPassword = async (passwordData) => {
  const res = await axiospublicApi.post("/auth/reset-password", passwordData);
  return res.data;
};

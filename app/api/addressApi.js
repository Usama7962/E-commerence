// 📌 api/addressApi.js
import { axiosPrivateApi } from "../config/request";

// ✅ Get Address by User
export const getAddress = async () => {
  const res = await axiosPrivateApi.get("/address");
  return res.data;
};

// ✅ Add Address
export const addAddress = async (addressData) => {
  const res = await axiosPrivateApi.post("/address", addressData);
  return res.data;
};

// ✅ Update Address
export const updateAddress = async (id, addressData) => {
  const res = await axiosPrivateApi.put(`/address/${id}`, addressData);
  return res.data;
};

// ✅ Delete Address
export const deleteAddress = async (id) => {
  const res = await axiosPrivateApi.delete(`/address/${id}`);
  return res.data;
};

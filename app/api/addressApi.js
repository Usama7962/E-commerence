import axios from "axios";

const BASE_URL = "http://localhost:5000/api/address";

// ✅ Get Address by User
export const getAddress = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Add Address
export const addAddress = async (addressData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(BASE_URL, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update Address
export const updateAddress = async (id, addressData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BASE_URL}/${id}`, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Delete Address
export const deleteAddress = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

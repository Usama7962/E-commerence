import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/orders";
const BASE_URL = "https://e-commerencebackend-tan.vercel.app/api/orders";


export const placeOrder = async (addressId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const res = await axios.post(
    BASE_URL,
    { addressId }, // ✅ sirf id bhejenge
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data; // { success: true, orders: [...] }
};
export const deleteOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
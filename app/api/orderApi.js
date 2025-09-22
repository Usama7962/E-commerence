// 📌 api/orderApi.js
import { axiosPrivateApi } from "../config/request";

// ✅ Place Order
export const placeOrder = async (addressId) => {
  const res = await axiosPrivateApi.post("/orders", { addressId }); 
  return res.data;
};

// ✅ Get All Orders
export const getAllOrders = async () => {
  const res = await axiosPrivateApi.get("/orders");
  return res.data; // { success: true, orders: [...] }
};

// ✅ Delete Order
export const deleteOrder = async (orderId) => {
  const res = await axiosPrivateApi.delete(`/orders/${orderId}`);
  return res.data;
};


import { axiosPrivateApi } from "../config/request";

export const placeOrder = async (addressId) => {
  const res = await axiosPrivateApi.post("/orders", { addressId }); 
  return res.data;
};


export const getAllOrders = async () => {
  const res = await axiosPrivateApi.get("/orders");
  return res.data; 
};

export const deleteOrder = async (orderId) => {
  const res = await axiosPrivateApi.delete(`/orders/${orderId}`);
  return res.data;
};

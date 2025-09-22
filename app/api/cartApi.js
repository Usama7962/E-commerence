
import { axiosPrivateApi } from "../config/request";


export const getCart = async () => {
  const res = await axiosPrivateApi.get("/cart");
  return res.data;
};


export const addToCart = async (productId, quantity, selectedSize) => {
  const res = await axiosPrivateApi.post("/cart/add", {
    productId,
    quantity,
    selectedSize,
  });
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axiosPrivateApi.delete(`/cart/${productId}`);
  return res.data;
};

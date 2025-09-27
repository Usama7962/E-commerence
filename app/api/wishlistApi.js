
import { axiosPrivateApi } from "../config/request";


export const getWishlist = async () => {
  const res = await axiosPrivateApi.get("/wishlist");
  return res.data;
};


export const toggleWishlist = async (productId) => {
  const res = await axiosPrivateApi.post(`/wishlist/${productId}`, {}); 
  return res.data;
};


export const removeFromWishlist = async (productId) => {
  const res = await axiosPrivateApi.delete(`/wishlist/${productId}`);
  return res.data;
};

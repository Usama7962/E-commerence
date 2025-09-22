// 📌 api/wishlistApi.js
import { axiosPrivateApi } from "../config/request";

// ✅ Get Wishlist (Private)
export const getWishlist = async () => {
  const res = await axiosPrivateApi.get("/wishlist");
  return res.data;
};

// ✅ Toggle Wishlist (Add/Remove a product by ID)
export const toggleWishlist = async (productId) => {
  const res = await axiosPrivateApi.post(`/wishlist/${productId}`, {}); 
  return res.data;
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (productId) => {
  const res = await axiosPrivateApi.delete(`/wishlist/${productId}`);
  return res.data;
};

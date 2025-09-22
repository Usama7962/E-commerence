import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/wishlist";
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist`;

export const getWishlist = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const toggleWishlist = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const res = await axios.post(
    `${BASE_URL}/${productId}`, // productId goes in the URL
    {}, // empty body, backend doesn't need extra data
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
export const removeFromWishlist = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

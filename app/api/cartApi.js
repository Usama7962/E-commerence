import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/cart";
const BASE_URL = "https://e-commerencebackend-tan.vercel.app/api/cart";


export const getCart = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToCart = async (productId, quantity, selectedSize, token) => {
  const res = await axios.post(
    `${BASE_URL}/add`,
    { productId, quantity, selectedSize },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

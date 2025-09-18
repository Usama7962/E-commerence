import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cart";

export const getCart = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToCart = async (productId, quantity, token) => {
  const res = await axios.post(
    `${BASE_URL}/add`,
    { productId, quantity },
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

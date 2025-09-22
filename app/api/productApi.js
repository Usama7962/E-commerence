import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/products";
const BASE_URL = "https://e-commerencebackend-tan.vercel.app/api/products";


// ✅ Create Product (with image)
export const createProduct = async (formData) => {
  const res = await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Get all products
export const getProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// ✅ Get product by category
export const getProductsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/category/${category}`);
  return res.data;
};

// ✅ Get product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// ✅ Update product (with image)
export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Delete product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

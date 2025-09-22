// 📌 api/productApi.js
import { axiospublicApi, axiosPrivateApi } from "../config/request";

// ✅ Create Product (Private - with image)
export const createProduct = async (formData) => {
  const res = await axiosPrivateApi.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Get all products (Public)
export const getProducts = async () => {
  const res = await axiospublicApi.get("/products");
  return res.data;
};

// ✅ Get product by category (Public)
export const getProductsByCategory = async (category) => {
  const res = await axiospublicApi.get(`/products/category/${category}`);
  return res.data;
};

// ✅ Get product by ID (Public)
export const getProductById = async (id) => {
  const res = await axiospublicApi.get(`/products/${id}`);
  return res.data;
};

// ✅ Update product (Private - with image)
export const updateProduct = async (id, formData) => {
  const res = await axiosPrivateApi.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Delete product (Private)
export const deleteProduct = async (id) => {
  const res = await axiosPrivateApi.delete(`/products/${id}`);
  return res.data;
};

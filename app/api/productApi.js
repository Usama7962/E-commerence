
import { axiospublicApi, axiosPrivateApi } from "../config/request";


export const createProduct = async (formData) => {
  const res = await axiosPrivateApi.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const getProducts = async () => {
  const res = await axiospublicApi.get("/products");
  return res.data;
};


export const getProductsByCategory = async (category) => {
  const res = await axiospublicApi.get(`/products/category/${category}`);
  return res.data;
};


export const getProductById = async (id) => {
  const res = await axiospublicApi.get(`/products/${id}`);
  return res.data;
};


export const updateProduct = async (id, formData) => {
  const res = await axiosPrivateApi.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const deleteProduct = async (id) => {
  const res = await axiosPrivateApi.delete(`/products/${id}`);
  return res.data;
};

"use client";
import React, { useState } from "react";
import { createProduct } from "../../api/productApi";

const Createproducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
    usage: "",
    benefits: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      await createProduct(data);
      alert("Product Added Successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        ingredients: "",
        usage: "",
        benefits: "",
        image: null,
      });
      setPreview(null);
      e.target.reset();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 mt-6 rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-xl mb-3 border" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl mb-3 text-gray-400 text-sm">
              No Image
            </div>
          )}
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="block text-sm text-gray-600" />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ashwagandha Extract Capsules"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            placeholder="Brief product description (shown on product card)"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-1">Price (Rs.) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 1200"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Herbal Supplements"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              required
            />
          </div>
        </div>

        <hr className="border-gray-200" />
        <p className="text-sm font-bold text-gray-700">Product Details (shown on detail page)</p>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-semibold mb-1">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Ashwagandha Root Extract 500mg, Black Pepper Extract 5mg, Vegetable Capsule Shell"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        {/* Usage */}
        <div>
          <label className="block text-sm font-semibold mb-1">How to Use</label>
          <textarea
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Take 1-2 capsules daily with warm water after meals. Best taken in the evening for stress relief."
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-semibold mb-1">Benefits</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Reduces stress & anxiety, Improves sleep quality, Boosts energy & stamina, Supports immune system"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Createproducts;

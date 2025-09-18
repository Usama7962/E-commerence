"use client";
import React from "react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white p-4 space-y-6">
      <h2 className="text-lg font-bold mb-4">Product Categories</h2>
      <ul className="space-y-2">
        {/* ✅ All Products Button */}
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
              !selectedCategory
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Products
          </button>
        </li>

        {/* ✅ Other Categories */}
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

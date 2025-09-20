"use client";
import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Product Categories</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          {isOpen ? (
          <IoIosArrowDropup size={20} />
          ) : (
            <IoIosArrowDropdown size={20} />
          )}
        </button>
      </div>
      <ul className={`space-y-2 ${isOpen ? 'block' : 'hidden lg:block'}`}>
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
              className={`w-full text-left px-3 py-2 rounded-lg  text-sm font-medium transition ${
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

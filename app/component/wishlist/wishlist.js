"use client";
import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../api/wishlistApi.js";
import { ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "../Navbar/Navbar.js";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Wishlist fetch only
  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data); // wishlist array with products
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No items in your wishlist.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Buttons */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* ✅ Delete Button instead of Heart */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>

                  {/* Add to Cart button */}
                  <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 flex-1 flex flex-col">
                <p className="font-semibold text-gray-900 text-sm md:text-lg">
                  {product.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600 flex-1">
                  {product.description}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-base md:text-xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Wishlist;

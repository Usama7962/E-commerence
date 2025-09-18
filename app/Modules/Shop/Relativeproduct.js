"use client";
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Slice } from "lucide-react";
import { getProductsByCategory } from "../../api/productApi.js";
import { toggleWishlist, getWishlist } from "../../api/wishlistApi.js";
import { useRouter } from "next/navigation";


const Relativeproduct = ({ category }) => {
    const router = useRouter();
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch related products
  const fetchProducts = async () => {
    try {
      const data = await getProductsByCategory(category);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist();
      setWishlistIds(wishlist.map((item) => item._id));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [category]);

  // Toggle Wishlist
  const handleToggleWishlist = async (productId) => {
    try {
      await toggleWishlist(productId);
      setWishlistIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      console.error(`Error toggling wishlist for ${productId}:`, error);
    }
  };

  return (
    <div className="w-full md:w-6xl px-4 py-10 bg-gray-50">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-left">
        Related Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No products found. Please add some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="relative group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              onClick={() => router.push(`/products/${product._id}`)}
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Buttons */}
                <div className="absolute inset-0 flex flex-col items-end justify-start p-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      wishlistIds.includes(product._id)
                        ? "text-pink-600 bg-white"
                        : "text-gray-700 bg-white"
                    } hover:text-pink-500`}
                    onClick={() => handleToggleWishlist(product._id)}
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Relativeproduct;

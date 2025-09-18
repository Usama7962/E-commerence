"use client";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../../api/productApi.js";
import { Heart, ShoppingCart } from "lucide-react";
import { toggleWishlist, getWishlist } from "../../api/wishlistApi.js";
import { useRouter } from "next/navigation";

const AllProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]); // ✅ wishlist state
  const router = useRouter();

  // ✅ Products fetch karna
  const fetchProducts = async () => {
    try {
      let response;
      if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory);
      } else {
        response = await getProducts();
      }
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Wishlist fetch karna
  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist();
      setWishlistIds(wishlist.map((item) => item._id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist(); // load wishlist on component mount
  }, [selectedCategory]);

  // ✅ Wishlist toggle karna
  const handleToggle = async (productId) => {
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
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No products found. Please add some!
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/products/${product._id}`)}
              className="relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover Buttons */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition cursor-pointer">
                    <ShoppingCart size={20} />
                  </button>

                  <button
                    className={`p-2 rounded-full transition cursor-pointer ${
                      wishlistIds.includes(product._id)
                        ? "bg-white text-pink-600" // ✅ Add → Blue
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleToggle(product._id)}
                  >
                    <Heart size={20} />
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
  );
};

export default AllProducts;

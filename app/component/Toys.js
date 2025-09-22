"use client";
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { getProductsByCategory } from "../api/productApi";
import { toggleWishlist, getWishlist } from "../api/wishlistApi";
import Navbar from "./Navbar/Navbar.js";
import { useRouter } from "next/navigation";
import WhatsappBtn from "../Modules/Shop/Whatsappbtn";
import Footer from "./Footer/Footer";


const CategoryProducts = ({ category, title, icon }) => {
    const router = useRouter();
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProductsByCategory("toys");
      setProducts(data);
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    }
  };
  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist();
      setWishlistIds(wishlist.map((item) => item._id));
    } catch (error) {
      console.error(`Error fetching ${category} wishlist:`, error);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [category]);
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
    <>
    <div>
      <Navbar />
    <div className="mt-8 md:mt-0 p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left flex items-center gap-2">
        All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No products found. Please add some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              onClick={() => router.push(`/products/${product._id}`)}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Action Buttons */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 gap-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition cursor-pointer">
                    <ShoppingCart size={20} />
                  </button>
                  <button
                    className={`p-2 rounded-full transition cursor-pointer ${
                      wishlistIds.includes(product._id)
                        ? "bg-white text-pink-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleToggle(product._id)}
                  >
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-semibold text-gray-900 text-lg">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600 flex-1">
                  {product.description}
                </p>
                <div className="mt-1 flex items-center gap-2 flex-row justify-between">
                  <span className="text-xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <WhatsappBtn />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    <Footer />  
    </>
  );
};

export default CategoryProducts;

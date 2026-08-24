"use client";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../../api/productApi.js";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toggleWishlist, getWishlist } from "../../api/wishlistApi.js";
import { useRouter } from "next/navigation";
import WhatsappBtn from "./Whatsappbtn.js";

const AllProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      setProducts([]);
    }
  };

  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist();
      setWishlistIds(wishlist.map((item) => item._id));
    } catch (err) {
      // Guest user - no wishlist yet
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchWishlist()]);
      setLoading(false);
    };
    loadData();
  }, [selectedCategory]);

  const handleToggle = async (productId) => {
    try {
      await toggleWishlist(productId);
      setWishlistIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      console.error("Wishlist error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">
            {selectedCategory || "All Products"}
          </h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            {loading ? "Loading..." : `${products.length} products found`}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
            <ShoppingCart size={24} className="text-[var(--primary)]" />
          </div>
          <p className="text-[var(--muted)] text-lg">No products found in this category</p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card-hover group bg-white rounded-2xl overflow-hidden border border-[var(--border)]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggle(product._id); }}
                      className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                        wishlistIds.includes(product._id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
                      }`}
                    >
                      <Heart size={16} fill={wishlistIds.includes(product._id) ? "white" : "none"} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/products/${product._id}`); }}
                      className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-[var(--primary)]">
                  {product.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-3 md:p-4">
                <h3
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="font-semibold text-[var(--foreground)] text-sm line-clamp-1 cursor-pointer hover:text-[var(--primary)] transition-colors"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-3 gap-2">
                  <span className="text-base md:text-lg font-bold text-[var(--primary)]">
                    Rs.{product.price.toLocaleString()}
                  </span>
                  <WhatsappBtn
                    name={product.name}
                    price={product.price}
                    description={product.description}
                  />
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

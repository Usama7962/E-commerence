"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts, getProductsByCategory, getCategories } from "../../api/productApi.js";
import { Heart, ShoppingCart, Leaf, Eye } from "lucide-react";
import { toggleWishlist, getWishlist } from "../../api/wishlistApi.js";

const ShopContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {}
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

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
    } catch (err) {}
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
    } catch (error) {}
  };

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            {selectedCategory || "All Products"}
          </h1>
          <p className="text-[var(--muted)] mt-2">
            Natural herbal remedies for your wellness journey
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-[var(--primary)] text-white shadow-md"
                : "bg-white text-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-white text-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <p className="text-sm text-[var(--muted)] mb-6">
          {loading ? "Loading..." : `Showing ${products.length} products`}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
              <Leaf size={24} className="text-[var(--primary)]" />
            </div>
            <p className="text-[var(--muted)] text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/products/${product._id}`)}
                className="card-hover cursor-pointer group bg-white rounded-2xl overflow-hidden border border-[var(--border)]"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--primary-light)]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggle(product._id); }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${
                      wishlistIds.includes(product._id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Heart size={16} fill={wishlistIds.includes(product._id) ? "white" : "none"} />
                  </button>

                  {/* Category */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-[var(--primary)] flex items-center gap-1">
                    <Leaf size={10} />
                    {product.category}
                  </span>

                  {/* Add to Cart overlay */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium flex items-center justify-center gap-2">
                      <Eye size={14} />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-base md:text-lg font-bold text-[var(--primary)]">
                      Rs.{product.price.toLocaleString()}
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

export default ShopContent;

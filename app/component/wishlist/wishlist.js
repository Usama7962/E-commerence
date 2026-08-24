"use client";
import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../api/wishlistApi.js";
import { Heart, Trash2, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import Link from "next/link";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-12 min-h-screen bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">My Wishlist</h1>
            <p className="text-[var(--muted)] mt-2 text-sm">
              {wishlist.length > 0
                ? `${wishlist.length} item(s) saved for later`
                : "Your wishlist is empty"}
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <Heart size={32} className="text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No Saved Items</h2>
              <p className="text-[var(--muted)] mb-6 text-center">
                Start adding herbal products you love to your wishlist
              </p>
              <Link
                href="/Shop"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Leaf size={16} />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="card-hover cursor-pointer group bg-white rounded-2xl overflow-hidden border border-[var(--border)]"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-square overflow-hidden bg-[var(--primary-light)]"
                    onClick={() => router.push(`/products/${product._id}`)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveFromWishlist(product._id); }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full shadow-md flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Category */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-[var(--primary)] flex items-center gap-1">
                      <Leaf size={10} />
                      {product.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3 md:p-4" onClick={() => router.push(`/products/${product._id}`)}>
                    <h3 className="font-semibold text-[var(--foreground)] text-sm line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-3">
                      <span className="text-base md:text-lg font-bold text-[var(--primary)]">
                        Rs.{product.price?.toLocaleString()}
                      </span>
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

export default Wishlist;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Leaf } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/cartSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full gradient-herbal flex items-center justify-center">
              <Leaf size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]">
              Herbal<span className="text-[var(--primary)]">Cure</span>
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              {!showSearch ? (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-full hover:bg-[var(--primary-light)] transition-colors"
                >
                  <Search size={19} className="text-[var(--muted)]" />
                </button>
              ) : (
                <input
                  type="text"
                  placeholder="Search herbal products..."
                  className="w-44 sm:w-56 px-4 py-2 text-sm border border-[var(--border)] rounded-full outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  onBlur={() => setShowSearch(false)}
                  autoFocus
                />
              )}
            </div>

            <Link href="/wishlist" className="p-2.5 rounded-full hover:bg-[var(--primary-light)] transition-colors">
              <Heart size={19} className="text-[var(--muted)]" />
            </Link>

            <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-[var(--primary-light)] transition-colors">
              <ShoppingCart size={19} className="text-[var(--muted)]" />
              {cartItems?.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4.5 h-4.5 flex items-center justify-center bg-[var(--primary)] text-white text-[10px] font-bold rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";
import { logout } from "../../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/cartSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, token]);
   const handlelogout = ()=>{
    dispatch(logout());
    // Force a page reload to ensure all states are reset
    window.location.href = '/';
   }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/Shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    
  ];

  return (
    <div className="w-full px-6 md:px-12 flex justify-between items-center py-3">
      {/* Logo */}
      <div>
        <img src="/image/Logo.svg" alt="logo" className="w-16 h-16" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex justify-center items-center">
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`${
                  pathname === link.path ? "underline font-bold" : ""
                } hover:text-blue-600`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side (icons + login) */}
      <div className="flex items-center space-x-5">
        {/* Search */}
        <div>
          {!showSearch ? (
            <CiSearch
              size={28}
              className="cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <input
              type="text"
              placeholder="Search..."
              className="w-[150px] px-3 py-1 border rounded-md"
              onBlur={() => setShowSearch(false)}
              autoFocus
            />
          )}
        </div>

        {/* Favorite */}
        <Link href="/wishlist">
          <MdFavoriteBorder size={24} className="cursor-pointer" />
        </Link>

        {/* Cart */}
        <Link href="/cart">
 <div className="relative cursor-pointer">
          <HiOutlineShoppingCart size={28} />
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {cartItems.length}
            </span>
          )}
        </div>
        </Link>
        <div>
        {/* ✅ Agar user login nahi hua to Login dikhao */}
        {!token ? (
          <button className="bg-black px-4 py-2 rounded-md text-white">
            Login
          </button>
        ) : (
          <button
            onClick={handlelogout}
            className="bg-black px-4 py-2 rounded-md text-white "
          >
            Logout
          </button>
        )}
      </div>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          {menuOpen ? (
            <HiX size={28} onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          ) : (
            <HiMenu size={28} onClick={() => setMenuOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full flex flex-col justify-center items-center bg-white shadow-lg p-6 md:hidden z-50">
          <ul className="flex flex-col justify-center items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${
                    pathname === link.path ? "underline font-bold" : ""
                  } hover:text-blue-600`}
                  onClick={() => setMenuOpen(false)} // ✅ menu close on click
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Mobile Login Button */}
          <button className="mt-4 w-fit flex  px-2 border-2 py-2 bg-black text-white rounded">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

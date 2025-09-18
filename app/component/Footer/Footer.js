"use client";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-300 pt-12 pb-6 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Krist</h2>
          <p className="mb-2">📞 (704) 5550127</p>
          <p className="mb-2">✉️ krist@example.com</p>
          <p>📍 3891 Ranchview Dr. Richardson, California 62639</p>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Login</a></li>
            <li><a href="#" className="hover:underline">My Cart</a></li>
            <li><a href="#" className="hover:underline">My Wishlist</a></li>
            <li><a href="#" className="hover:underline">Checkout</a></li>
          </ul>
        </div>

        {/* Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Delivery Information</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="mb-4 text-sm">
            Enter your email below to be the first to know about new collections and product launches.
          </p>
          <div className="flex items-center border border-gray-500 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 bg-transparent text-gray-300 outline-none"
            />
            <button className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-5xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Payment Icons */}
        <div className="flex gap-4 text-2xl text-gray-400">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">
          ©2023 Krist All Rights Reserved
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-400 text-xl">
          <a href="#"><FaFacebookF className="hover:text-white" /></a>
          <a href="#"><FaInstagram className="hover:text-white" /></a>
          <a href="#"><FaTwitter className="hover:text-white" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

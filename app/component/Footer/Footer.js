"use client";
import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a2e1a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full gradient-herbal flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Herbal<span className="text-green-400">Cure</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted source for premium herbal remedies and natural wellness products. Nurturing health through the power of nature.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone size={14} className="text-green-400" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail size={14} className="text-green-400" />
                <span>info@herbalcure.pk</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin size={14} className="text-green-400" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-green-400 transition-colors">All Products</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-400 hover:text-green-400 transition-colors">My Cart</Link></li>
              <li><Link href="/wishlist" className="text-sm text-gray-400 hover:text-green-400 transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2.5">
              <li><Link href="/?category=Herbal+Supplements" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Herbal Supplements</Link></li>
              <li><Link href="/?category=Essential+Oils" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Essential Oils</Link></li>
              <li><Link href="/?category=Herbal+Teas" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Herbal Teas</Link></li>
              <li><Link href="/?category=Natural+Skincare" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Natural Skincare</Link></li>
              <li><Link href="/?category=Honey+%26+Superfoods" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Honey & Superfoods</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get wellness tips and exclusive offers on herbal products.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-green-900 rounded-l-lg text-sm text-white outline-none focus:border-green-500 placeholder-gray-500"
              />
              <button className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-r-lg transition-colors text-sm">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2024 HerbalCure. All rights reserved. Powered by Nature.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

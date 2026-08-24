"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white p-5 h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
          <LayoutGrid size={18} className="text-[var(--primary)]" />
          Categories
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <ul className={`space-y-1 ${isOpen ? "block" : "hidden lg:block"}`}>
        <li>
          <button
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-[var(--primary)] text-white shadow-md shadow-cyan-500/20"
                : "hover:bg-[var(--primary-light)] text-[var(--muted)]"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Products
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-md shadow-cyan-500/20"
                  : "hover:bg-[var(--primary-light)] text-[var(--muted)]"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

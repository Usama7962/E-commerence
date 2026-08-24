"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./sidebar";
import AllProducts from "./Allproducts";
import { getCategories } from "../../api/productApi.js";

const Userallproducts = () => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-16">
      {/* Sidebar */}
      <div className="md:w-64 w-full border-r border-[var(--border)]">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Products */}
      <div className="flex-1 bg-[var(--background)]">
        <AllProducts selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Userallproducts;

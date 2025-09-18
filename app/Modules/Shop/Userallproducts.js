"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import AllProducts from "./Allproducts";

const Userallproducts = () => {
  const categories = ["man", "woman", "Baby Clothes"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full border-r">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* All Products */}
      <div className="flex-1">
        <AllProducts selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Userallproducts;

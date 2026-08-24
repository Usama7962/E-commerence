"use client";
import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { getProductsByCategory } from "../../api/productApi.js";
import { useRouter } from "next/navigation";

const Relativeproduct = ({ category, currentProductId }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProductsByCategory(category);
      setProducts(data.filter((p) => p._id !== currentProductId));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (category) fetchProducts();
  }, [category]);

  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.slice(0, 4).map((product) => (
          <div
            key={product._id}
            onClick={() => router.push(`/products/${product._id}`)}
            className="card-hover cursor-pointer group bg-white rounded-2xl overflow-hidden border border-[var(--border)]"
          >
            <div className="relative aspect-square overflow-hidden bg-[var(--primary-light)]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-[var(--primary)] flex items-center gap-1">
                <Leaf size={10} />
                {product.category}
              </span>
            </div>

            <div className="p-3 md:p-4">
              <h3 className="font-semibold text-[var(--foreground)] text-sm line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-[var(--muted)] mt-1 line-clamp-1">
                {product.description}
              </p>
              <span className="block mt-2 text-base font-bold text-[var(--primary)]">
                Rs.{product.price?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Relativeproduct;

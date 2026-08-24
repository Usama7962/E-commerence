"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "../../api/productApi.js";
import { ShoppingCart, Eye, Leaf } from "lucide-react";

const FeaturedProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to load products");
      }
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">Best Sellers</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mt-1">Featured Products</h2>
          </div>
          <button
            onClick={() => router.push("/Shop")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition-all"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-[var(--primary)] flex items-center gap-1">
                  <Leaf size={10} />
                  {product.category}
                </span>
                {/* Quick View */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[var(--primary-dark)] transition-colors">
                    <ShoppingCart size={14} />
                    View Product
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-[var(--foreground)] text-sm line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-[var(--primary)]">
                    Rs.{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="text-center mt-8 sm:hidden">
          <button
            onClick={() => router.push("/Shop")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-medium"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

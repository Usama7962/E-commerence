"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "../../api/productApi.js";
import { Pill, Droplets, Coffee, Sparkles, Cherry } from "lucide-react";

const categoryIcons = {
  "Herbal Supplements": Pill,
  "Essential Oils": Droplets,
  "Herbal Teas": Coffee,
  "Natural Skincare": Sparkles,
  "Honey & Superfoods": Cherry,
};

const categoryImages = {
  "Herbal Supplements": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
  "Essential Oils": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&q=80",
  "Herbal Teas": "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&q=80",
  "Natural Skincare": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",
  "Honey & Superfoods": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80",
};

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mt-2">Shop by Category</h2>
          <p className="text-[var(--muted)] mt-3 max-w-md mx-auto">
            Explore our curated collection of herbal and natural wellness products
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Pill;
            const image = categoryImages[cat];

            return (
              <div
                key={cat}
                onClick={() => router.push(`/Shop?category=${encodeURIComponent(cat)}`)}
                className="card-hover cursor-pointer group relative rounded-2xl overflow-hidden aspect-[3/4]"
              >
                {/* Background Image */}
                <img
                  src={image}
                  alt={cat}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm">{cat}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

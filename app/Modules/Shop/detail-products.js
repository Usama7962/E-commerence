"use client";
import { getProductById } from "@/app/api/productApi";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar/Navbar";
import { useRouter } from "next/navigation";
import Relativeproduct from "./Relativeproduct";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/app/redux/cartSlice";
import { toast } from "react-toastify";
import Footer from "@/app/component/Footer/Footer";
import { ShoppingCart, Heart, Leaf, Truck, ShieldCheck, ArrowLeft, Pill, BookOpen, Sparkles } from "lucide-react";

const ProductDetailPage = ({ productId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProductDetails = async (id) => {
    try {
      const response = await getProductById(id);
      setProductData(response);
    } catch (error) {
      console.error("Error getting the product:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addItemToCart(productData._id, quantity, null));
      toast.success("Added to cart!");
      router.push("/cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  if (!productData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-12 min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Shop</span>
          </button>

          {/* Product Section */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[var(--border)] shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square bg-[var(--primary-light)] p-8 flex items-center justify-center">
                <img
                  src={productData.imageUrl}
                  alt={productData.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <span className="absolute top-6 left-6 px-3 py-1.5 text-xs font-semibold bg-white rounded-full text-[var(--primary)] flex items-center gap-1 shadow-sm">
                  <Leaf size={12} />
                  {productData.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="space-y-5">
                  <div>
                    <p className="text-[var(--primary)] text-sm font-medium uppercase tracking-wide">{productData.category}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-1">
                      {productData.name}
                    </h1>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[var(--primary)]">
                      Rs.{productData.price?.toLocaleString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--muted)] leading-relaxed">
                    {productData.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)] rounded-full">
                      <Leaf size={12} /> 100% Natural
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                      <ShieldCheck size={12} /> Lab Tested
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">
                      <Truck size={12} /> Free Delivery
                    </span>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Quantity</label>
                    <div className="inline-flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
                      <button onClick={handleDecrement} className="px-4 py-2.5 text-lg hover:bg-gray-50 transition-colors">-</button>
                      <span className="px-5 py-2.5 font-semibold text-[var(--foreground)] border-x border-[var(--border)]">{quantity}</span>
                      <button onClick={handleIncrement} className="px-4 py-2.5 text-lg hover:bg-gray-50 transition-colors">+</button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3.5 px-6 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/10"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => router.push("/wishlist")}
                      className="w-12 h-12 flex items-center justify-center border-2 border-[var(--border)] rounded-xl text-[var(--muted)] hover:border-red-300 hover:text-red-500 transition-colors"
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          {(productData.ingredients || productData.usage || productData.benefits) && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {productData.ingredients && (
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                      <Pill size={18} className="text-[var(--primary)]" />
                    </div>
                    <h3 className="font-bold text-[var(--foreground)]">Ingredients</h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                    {productData.ingredients}
                  </p>
                </div>
              )}

              {productData.usage && (
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                      <BookOpen size={18} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-[var(--foreground)]">How to Use</h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                    {productData.usage}
                  </p>
                </div>
              )}

              {productData.benefits && (
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <Sparkles size={18} className="text-green-600" />
                    </div>
                    <h3 className="font-bold text-[var(--foreground)]">Benefits</h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                    {productData.benefits}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Related Products */}
          <div className="mt-12">
            <Relativeproduct category={productData.category} currentProductId={productData._id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

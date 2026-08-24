"use client";
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/app/api/cartApi";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingCart, Leaf, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Addtocart = () => {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.product._id !== productId),
        totalPrice: prevCart.items
          .filter((item) => item.product._id !== productId)
          .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart || !cart.items?.length) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-6">
          <ShoppingCart size={32} className="text-[var(--primary)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Your Cart is Empty</h2>
        <p className="text-[var(--muted)] mb-6 text-center">
          Explore our herbal products and add something to your cart
        </p>
        <Link
          href="/Shop"
          className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-full font-semibold transition-all"
        >
          <Leaf size={16} />
          Browse Products
        </Link>
      </div>
    );
  }

  const subtotal = cart.totalPrice || 0;
  const deliveryCharge = subtotal >= 1000 ? 0 : 150;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-2 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Continue Shopping</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">Your Cart</h1>
            <p className="text-[var(--muted)] text-sm mt-1">{cart.items.length} item(s) in cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[var(--border)] hover:shadow-sm transition-shadow"
              >
                {/* Product Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--primary-light)]">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm md:text-base truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-0.5 flex items-center gap-1">
                    <Leaf size={10} className="text-[var(--primary)]" />
                    Natural Herbal Product
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-[var(--muted)]">Qty: {item.quantity}</span>
                    <span className="text-sm font-bold text-[var(--primary)]">
                      Rs.{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="p-2.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)] sticky top-24">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-5">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Subtotal</span>
                  <span className="font-semibold text-[var(--foreground)]">Rs.{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Delivery</span>
                  <span className={`font-semibold ${deliveryCharge === 0 ? "text-green-600" : "text-[var(--foreground)]"}`}>
                    {deliveryCharge === 0 ? "Free" : `Rs.${deliveryCharge}`}
                  </span>
                </div>

                {deliveryCharge > 0 && (
                  <p className="text-xs text-[var(--primary)] bg-[var(--primary-light)] rounded-lg px-3 py-2">
                    Add Rs.{(1000 - subtotal).toLocaleString()} more for free delivery!
                  </p>
                )}

                <hr className="border-[var(--border)] my-3" />

                <div className="flex justify-between text-base">
                  <span className="font-bold text-[var(--foreground)]">Total</span>
                  <span className="font-bold text-[var(--primary)] text-lg">Rs.{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/address")}
                className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/10 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/Shop"
                className="block text-center mt-3 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;

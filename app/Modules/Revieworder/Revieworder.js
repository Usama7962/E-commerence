"use client";
import React, { useEffect, useState } from "react";
import { getCart } from "@/app/api/cartApi";
import { getAddress } from "@/app/api/addressApi";
import { placeOrder } from "@/app/api/orderApi";
import { useRouter } from "next/navigation";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer/Footer";
import { ArrowLeft, MapPin, Leaf, CheckCircle, Truck } from "lucide-react";

const Revieworder = () => {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [placing, setPlacing] = useState(false);

  const router = useRouter();

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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

  const fetchAddress = async () => {
    try {
      const res = await getAddress();
      setAddress(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    if (address.length === 0) {
      alert("Please add an address before placing order");
      return;
    }

    try {
      setPlacing(true);
      await placeOrder(address[0]._id);
      setShowModal(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!cart) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <p className="text-[var(--muted)]">No items found in cart.</p>
        </div>
      </>
    );
  }

  const subtotal = cart.totalPrice || 0;
  const deliveryCharge = subtotal >= 1000 ? 0 : 150;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-12 min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">Review Your Order</h1>
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] px-4 py-2 rounded-full mb-8">
            <Truck size={14} className="text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--primary)]">
              Estimated delivery: {getEstimatedDeliveryDate()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)]">Order Items ({cart.items.length})</h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--primary-light)] flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[var(--foreground)] text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-[var(--muted)] mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[var(--primary)] text-sm">
                        Rs.{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
                <h3 className="font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-[var(--primary)]" />
                  Shipping Address
                </h3>
                {address.length > 0 ? (
                  <div className="text-sm text-[var(--muted)]">
                    <p className="font-semibold text-[var(--foreground)]">{address[0].fullName}</p>
                    <p className="mt-1">{address[0].address}</p>
                    <p>{address[0].city}, {address[0].state}</p>
                    <p className="mt-1">{address[0].phone}</p>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--muted)]">No address found.</p>
                )}
              </div>
            </div>

            {/* Right Side - Order Summary */}
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

                  <hr className="border-[var(--border)] my-3" />

                  <div className="flex justify-between text-base">
                    <span className="font-bold text-[var(--foreground)]">Total</span>
                    <span className="font-bold text-[var(--primary)] text-lg">Rs.{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Leaf size={16} />
                  {placing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)]">Order Confirmed!</h2>
            <p className="text-[var(--muted)] mt-2 text-sm">
              Thank you for choosing HerbalCure! Your order is being prepared with care.
              We'll notify you when it ships.
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-xl font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Revieworder;

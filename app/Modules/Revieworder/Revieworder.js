"use client";
import React, { useEffect, useState } from "react";
import { getCart } from "@/app/api/cartApi";
import { getAddress } from "@/app/api/addressApi";
import { placeOrder } from "@/app/api/orderApi"; // ✅ order api import
import {  useRouter } from "next/navigation";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer/Footer";
import { ArrowLeft } from "lucide-react";

const Revieworder = () => {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // ✅ modal state
  const [placing, setPlacing] = useState(false); // ✅ loading while placing order

  const router = useRouter();

  // ✅ Date calculation (today + 4 days)
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4); // add 4 days
    return today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await getCart(token);
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

  // ✅ Place Order Handler
  const handlePlaceOrder = async () => {
    if (address.length === 0) {
      alert("Please add an address before placing order");
      return;
    }

    try {
      setPlacing(true);
      const res = await placeOrder(address[0]._id); // ✅ address ka id pass
      console.log("Order placed:", res);
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
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <span className="ml-3 text-lg font-semibold">Loading your order...</span>
      </div>
    );
  }

  if (!cart) return <p className="text-center mt-10">No items found in cart.</p>;

  const subtotal = cart.totalPrice || 0;
  const deliveryCharge = 5;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col md:flex-row justify-between p-10 gap-5">
      {/* Left Side */}
      <div className=" w-full md:w-2/3 space-y-6">
        <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
    >
      <ArrowLeft size={20} />
      Back
    </button>
        <h2 className="text-2xl font-bold">Review Your Order</h2>

        <p className="font-semibold">
          Estimated delivery:{" "}
          <span className="text-gray-700">{getEstimatedDeliveryDate()}</span>
        </p>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p>${item.product.price}</p>
                <p>Size: {item.selectedSize}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-bold">Shipping Address</h3>
          {address.length > 0 ? (
            <div className="mt-2">
              <p className="font-semibold">{address[0].fullName}</p>
              <p>
                {address[0].city}, {address[0].address} {address[0].phone}
              </p>
            </div>
          ) : (
            <p>No address found.</p>
          )}
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="w-full md:w-1/3 border p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery Charge</span>
          <span>${deliveryCharge}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>${grandTotal}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {placing ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                🛍️
              </div>
            </div>
            <h2 className="text-xl font-semibold">Your order is confirmed</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Thanks for shopping! Your order hasn’t shipped yet, but we will
              send you an email when it’s done.
            </p>

            {/* Buttons */}
            <div className="mt-5 space-y-2">
            
              <button
                onClick={() => router.push("/")}
                className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Revieworder;

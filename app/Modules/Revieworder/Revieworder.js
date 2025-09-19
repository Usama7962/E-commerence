"use client";
import React, { useEffect, useState } from "react";
import { getCart } from "@/app/api/cartApi";
import { getAddress } from "@/app/api/addressApi";

const Revieworder = () => {
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  console.log("addresses", addresses);
  const [loading, setLoading] = useState(true);

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

  const fetchAddresses = async () => {
    try {
      const res = await getAddress();
      setAddresses(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

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
    <div className="flex flex-col md:flex-row justify-between p-10 gap-5">
      {/* Left Side */}
      <div className=" w-full md:w-2/3 space-y-6">
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
          {addresses.length > 0 ? (
            <div className="mt-2">
              <p className="font-semibold">{addresses[0].fullName}</p>
              <p>
                {addresses[0].city}, {addresses[0].address}{" "}
                {addresses[0].phone}
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

        <button className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Revieworder;

"use client";
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/app/api/cartApi";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const Addtocart = () => {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // ✅ Cart fetch
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

  useEffect(() => {
    fetchCart();
  }, [router]);

  // ✅ Remove item
  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      // frontend state update
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

  // const handleApplyDiscount = () => {
  //   if (discount === "FLAT50") {
  //     setAppliedDiscount(50);
  //   } else {
  //     alert("Invalid coupon code");
  //   }
  // };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!cart || !cart.items?.length) return <div className="text-center py-10">Your cart is empty.</div>;

  const subtotal = cart.totalPrice || 0;
  const deliveryCharge = 5;
  const grandTotal = subtotal - appliedDiscount + deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT SIDE: Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="flex flex-row justify-between ">
         <div className="w-[80%]"> <p>Product</p></div>
        <div className="w-[20%] flex flex-row gap-4 mr-10">  
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p></div>
        </div>
        <div className="space-y-6">
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500 text-sm">Size: {item.selectedSize}</p>
                </div>
              </div>

              {/* Price + Quantity + Subtotal + Delete */}
              <div className="flex items-center gap-6">
                <span className="font-semibold">${item.product.price}</span>

                <div className="flex items-center border rounded">
                  <span className="px-3">{item.quantity}</span>
                </div>

                <span className="font-semibold">
                  ${item.product.price * item.quantity}
                </span>

                {/* 🗑️ Delete icon */}
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Summary */}
      <div className="border p-6 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal}</span>
        </div>

       

        <div className="flex justify-between mb-2">
          <span>Delivery Charge</span>
          <span>${deliveryCharge}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Grand Total</span>
          <span>${grandTotal}</span>
        </div>

        <button
          onClick={() => router.push("/address")}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Addtocart;

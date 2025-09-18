"use client";
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/app/api/cartApi";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, fetchCartItems } from "@/app/redux/cartSlice";

const Addtocart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]); // ✅ track selected items

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await getCart(token);
      setCart(res);
      dispatch(fetchCartItems()); // Update Redux store

      // ✅ default: select all items
      setSelectedItems([]);
    } catch (error) {
      console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
useEffect(() => {
    fetchCart();
  }, [router]);
    const handleRemove = async (productId) => {
      console.log("Removing product:", productId);
    try {
      const token = localStorage.getItem("token"); // token le liya
      await removeFromCart(productId, token);
await fetchCart();
      console.log("Product removed:", productId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleApplyDiscount = () => {
    if (discount === "FLAT50") {
      setAppliedDiscount(50);
    } else {
      alert("Invalid coupon code");
    }
  };

  const toggleSelect = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!cart || !cart.items?.length)
    return <div className="text-center py-10">Your cart is empty.</div>;

  // ✅ Calculate subtotal only for selected items
  const selectedCartItems = cart.items.filter((_, i) =>
    selectedItems.includes(i)
  );
  const subtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = selectedCartItems.length > 0 ? 5 : 0;
  const grandTotal = subtotal - appliedDiscount + deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT SIDE: Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="space-y-6">
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* ✅ Checkbox */}
              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => toggleSelect(index)}
                className="mr-3 size-6 bg-orange-500 text-white"
              />

              {/* Product info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Size: {item.selectedSize}
                  </p>
                </div>
              </div>

              {/* Price + Quantity + Subtotal */}
              <div className="flex items-center gap-6">
                <span className="font-semibold">Rs. {item.product.price}</span>

                <div className="flex items-center border rounded">
                  <button className="px-3">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-3">+</button>
                </div>

                <span className="font-semibold">
                  Rs. {item.product.price * item.quantity}
                </span>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} /> {/* ✅ Trash Icon */}
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
          <span>Subtotal ({selectedCartItems.length} items)</span>
          <span className="font-semibold">Rs. {subtotal}</span>
        </div>


        <div className="flex justify-between mb-2">
          <span>Shipping Fee</span>
          <span>Rs. {deliveryCharge}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>Rs. {grandTotal}</span>
        </div>

        <button
          disabled={selectedCartItems.length === 0}
          onClick={() => router.push(`/address?subtotal=${subtotal}&items=${selectedCartItems.length}&shipping=${deliveryCharge}&total=${grandTotal}`)}
          className={`w-full py-3 rounded-lg ${
            selectedCartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Proceed to Checkout ({selectedCartItems.length})
        </button>
      </div>
    </div>
  );
};

export default Addtocart;

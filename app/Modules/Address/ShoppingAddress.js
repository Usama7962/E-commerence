"use client";
import React, { useEffect, useState } from "react";
import { getAddress, addAddress, updateAddress, deleteAddress } from "@/app/api/addressApi";
import { useRouter } from "next/navigation";
import { getCart } from "@/app/api/cartApi";
import { ArrowLeft } from "lucide-react";

const ShoppingAddress = () => {
  const router = useRouter();
  const [address, setAddress] = useState([]);
  console.log("address", address);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  console.log("cart", cart);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    state: "",
  });
  const subtotal = cart?.totalPrice || 0;
  const deliveryCharge = 5;
  const grandTotal = subtotal + deliveryCharge;
  const [editingId, setEditingId] = useState(null);
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

  

  // ✅ Fetch all address
  const fetchAddress = async () => {
    try {
      const res = await getAddress();
      setAddress(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchCart();
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update
  const handleSubmit = async (e) => {
    console.log("Form submitted:", formData);
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await addAddress(formData);
      }
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        state: "",
      });
      setEditingId(null);
      fetchAddress();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      fetchAddress();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit
  const handleEdit = (address) => {
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
      state: address.state,
    });
    setEditingId(address._id);
  };
  const handleDeliverHere = () => {
    router.push("/revieworder");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left: Address */}
      <div className="lg:col-span-2 space-y-6">
         <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
    >
      <ArrowLeft size={20} />
      Back
    </button>
        <h2 className="text-2xl font-bold">Shipping Address</h2>

        {/* Saved Address */}
        <div className="grid sm:grid-cols-2 gap-4">
          {address.length > 0 ? (
            address.map((addr) => (
              <div
                key={addr._id}
                className="border rounded-lg p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <p className="font-semibold">{addr.fullName}</p>
                  <p>{addr.addressLine1}</p>
                  <p>{addr.addressLine2}</p>
                  <p>
                    {addr.city}, {addr.state} - {addr.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">📞 {addr.phone}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No address saved yet.</p>
          )}
        </div>

        <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
          onClick={ handleDeliverHere}
        >
          Deliver Here
        </button>

        {/* Add New Address Form */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Address" : "Add a new address"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {/* <input
              type="text"
              name="addressLine1"
              placeholder="Flat, House no, Building, Apartment"
              value={formData.addressLine1}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            /> */}
            <input
              type="text"
              name="address"
              placeholder="Area, Colony, Street, Village"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select City</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
              </select>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select State</option>
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="KPK">KPK</option>
              </select>
            </div>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              {editingId ? "Update Address" : "Add New Address"}
            </button>
          </form>
        </div>
      </div>

      {/* Right: Order Summary */}
       <div className=" h-fit border p-6 rounded-lg bg-gray-50">
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

      
      </div>
    </div>
  );
};

export default ShoppingAddress;

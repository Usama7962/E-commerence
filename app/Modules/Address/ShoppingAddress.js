"use client";
import React, { useEffect, useState } from "react";
import { getAddress, addAddress, updateAddress, deleteAddress } from "@/app/api/addressApi";
import { useRouter } from "next/navigation";
import { getCart } from "@/app/api/cartApi";
import { ArrowLeft, MapPin, Pencil, Trash2, Leaf } from "lucide-react";

const ShoppingAddress = () => {
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    state: "",
  });
  const subtotal = cart?.totalPrice || 0;
  const deliveryCharge = subtotal >= 1000 ? 0 : 150;
  const grandTotal = subtotal + deliveryCharge;
  const [editingId, setEditingId] = useState(null);

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
      setAddress(Array.isArray(res) ? res : res.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
        addressLine1: "",
        addressLine2: "",
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

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      fetchAddress();
    } catch (err) {
      console.error(err);
    }
  };

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
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Cart</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-8">Shipping Address</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Addresses */}
            {address.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Saved Addresses</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {address.map((addr) => (
                    <div
                      key={addr._id}
                      className="bg-white border border-[var(--border)] rounded-2xl p-5 flex flex-col justify-between hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={14} className="text-[var(--primary)]" />
                          <p className="font-semibold text-[var(--foreground)]">{addr.fullName}</p>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{addr.address}</p>
                        <p className="text-sm text-[var(--muted)]">
                          {addr.city}, {addr.state} - {addr.postalCode}
                        </p>
                        <p className="text-sm text-[var(--muted)] mt-1">{addr.phone}</p>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleEdit(addr)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)] rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(addr._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleDeliverHere}
                  className="mt-2 inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/10"
                >
                  <Leaf size={16} />
                  Deliver Here
                </button>
              </div>
            )}

            {address.length === 0 && (
              <p className="text-[var(--muted)] text-sm">No address saved yet. Add one below.</p>
            )}

            {/* Add New Address Form */}
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-5">
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Area, Colony, Street, Village"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                  </select>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="KPK">KPK</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-xl font-semibold transition-all"
                >
                  {editingId ? "Update Address" : "Add New Address"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAddress;

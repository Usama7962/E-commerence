"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/authSlice.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, role, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token && role === "admin") {
      router.push("/admin/all-products");
    }
  }, [token, role, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Login to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="admin@example.com"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/admin/forgot-password" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;

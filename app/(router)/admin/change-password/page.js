"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../../api/authApi.js";
import { toast } from "react-toastify";

const AdminChangePassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("Session expired, please try again");
      router.push("/admin/forgot-password");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({ email, password });
      toast.success("Password reset successful!");
      localStorage.removeItem("resetEmail");
      router.push("/admin/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;

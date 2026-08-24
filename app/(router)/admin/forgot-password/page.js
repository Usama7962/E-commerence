"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgetPassword } from "../../../api/authApi.js";
import { toast } from "react-toastify";

const AdminForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await forgetPassword({ email });
      toast.success("OTP sent to your email");
      localStorage.setItem("resetEmail", email);
      router.push("/admin/otp");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your admin email to receive a reset OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/admin/login")}
            className="text-sm text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "../../../api/authApi.js";
import { toast } from "react-toastify";

const AdminOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("Session expired, please try again");
      router.push("/admin/forgot-password");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp({ email, otp });
      toast.success("OTP verified");
      router.push("/admin/change-password");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900 text-center text-lg tracking-widest"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminOtpPage;

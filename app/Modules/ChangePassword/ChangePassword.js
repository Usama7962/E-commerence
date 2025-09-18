"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuccessModal from "../../component/Model/SuccessModal.js";
import { resetPassword } from "../../api/authApi";

const ChangePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("forgotEmail");
    const savedOtp = localStorage.getItem("otp");
    if (savedEmail) setEmail(savedEmail);
    if (savedOtp) setOtp(savedOtp);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({ email, otp, password });

      localStorage.removeItem("forgotEmail");
      localStorage.removeItem("otp");

      setShowModal(true);

      
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-4xl min-h-screen flex pt-2">
        {/* Left side image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/image/otp.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 text-sm mb-6 hover:text-black"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-2">Change Password</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Update password for{" "}
            <span className="text-black font-medium">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Password changed successfully ✅"
      />
    </div>
  );
};

export default ChangePassword;

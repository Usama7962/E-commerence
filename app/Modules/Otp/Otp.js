"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "../../api/authApi"; // ✅ yahan import karo

const Otp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("forgotEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ API call function se
      const res = await verifyOtp({
        email,
        otp: otp.join(""),
      });

      setSuccess(res?.msg || "OTP verified ✅");

      setTimeout(() => {
        router.push("ChangePassword");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 👇 baaki aapka UI same rahega
     <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white ">
        {/* Left side (image) */}
        <div className="hidden md:block md:w-1/2 ">
          <img
            src="/image/otp.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
         
        </div>

        {/* Right side (form) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 text-sm mb-6 hover:text-black"
          >
            ← Back
          </button>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Enter OTP</h2>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            We have shared a code on your registered email address <br />
            <span className="text-black font-medium">
              {email || "your email"}
            </span>
          </p>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 justify-center flex-wrap">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 text-center text-xl border rounded focus:ring-2 focus:ring-black outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {/* Messages */}
          {error && <p className="text-red-600 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Otp;

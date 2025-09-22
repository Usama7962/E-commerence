"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { forgetPassword } from "../../api/authApi"; // ✅ import API

const Forgot_Password = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // ✅ API call yahan se
      const res = await forgetPassword({ email });

      setSuccess(res?.msg || "OTP sent to your email! 📩");
      localStorage.setItem("forgotEmail", email);

      setTimeout(() => {
        router.push("/Otp");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 ">
      <div className="w-4xl flex h-auto pt-2">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img src="/image/forgot.svg" alt="background" className="w-full h-full" />
          <img src="/image/Logo.svg" alt="logo" className="absolute w-16 h-16 md:w-20 md:h-20 top-4 left-4" />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 text-sm mb-6 hover:text-black"
          >
            ← Back
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Enter your registered email address. We’ll send you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          {error && <p className="text-red-600 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;

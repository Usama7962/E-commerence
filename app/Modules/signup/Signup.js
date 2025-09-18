"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../api/authApi.js"; 

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // ✅ call API function
      const res = await signup({
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Signup successful! 🎉");
      console.log("api response:", res);

      setFormData({
        firstName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/Login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full md:max-w-4xl bg-white ">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/image/signup.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <img
            src="/image/Logo.svg"
            alt="logo"
            className="absolute w-16 h-16 md:w-20 md:h-20 top-4 left-4"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create New Account</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* ✅ Already have account button */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/Login")}
                className="text-black font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>

          {error && <p className="text-red-600 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice.js";
import { useRouter } from "next/navigation"; // ✅ import
import Link from "next/link.js";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, role, token } = useSelector((state) => state.auth);
  console.log(token,'ddddd');

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // ✅ Redirect after login success
  useEffect(() => {
    if (token && role) {
      if (role === "admin") {
        router.push("/admin/all-products");
      } else {
        router.push("/");
      }
    }
  }, [token, role, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F3F2F3]">
      <div className="md:w-4xl flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/image/Rectangle3463273.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <img
            src="/image/Logo.svg"
            alt="logo"
            className="absolute w-16 h-16 md:w-20 md:h-20 top-4 left-4"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 bg-white">
          <h2 className="text-2xl sm:text-3xl font-medium mb-2">Welcome 👋</h2>
          <p className="mb-4 text-sm sm:text-base text-[#A4A1AA]">
            Please login here
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded outline-none"
                onChange={handleChange}
              />
            </div>

            <div className="mb-2 flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link href="/Forgot_Password">
                <button
                  type="button"
                  className="text-sm text-black hover:underline"
                >
                  Forgot Password?
                </button>
              </Link>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded mb-4 outline-none"
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          {/* ✅ Signup Button */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/Signup">
                <button className="text-black font-medium hover:underline">
                  Signup
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

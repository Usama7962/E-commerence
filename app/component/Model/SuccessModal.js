"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null; // Agar modal open na ho to kuch bhi render na ho

  return (
    <div className="fixed inset-0 bg-gray-200/80 flex items-center justify-center bg-opacity-10 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 text-center">
        {/* Icon */}
        
        <div className="flex items-center justify-center w-18 h-18 rounded-full bg-gray-200/40 mx-auto mb-4 ">
        <div className="flex items-center justify-center w-15 h-15 rounded-full bg-gray-200/80">
            <div className="flex items-center justify-center w-12 h-12  rounded-full bg-black">
            <div className="bg-white rounded-full w-5 h-5 flex justify-center items-center">
          <span className=" text-sm font-semibold text-black">✓</span>
          </div>
          </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold mb-2">Password Changed Successfully</h2>
        <p className="text-gray-500 mb-6">
          Your password has been updated successfully
        </p>

        {/* Button */}
        <button
          onClick={() => {
            onClose(); // Modal close
            router.push("/Login"); // Route to Login
          }}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

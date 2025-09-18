"use client";
import { getProductById } from "@/app/api/productApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/component/Navbar/Navbar";
import { useRouter } from "next/navigation";
import Relativeproduct from "./Relativeproduct";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/app/redux/cartSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = ({ productId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = [
    { label: "S", inStock: true },
    { label: "M", inStock: true },
    { label: "L", inStock: false },
    { label: "XL", inStock: true },
  ];

  // ✅ Fetch product
  const fetchProductDetails = async (id) => {
    try {
      const response = await getProductById(id);
      setProductData(response);

      // ✅ Default size to first available
      if (response?.sizes?.length > 0) {
        setSelectedSize(response.sizes[0]);
      }
    } catch (error) {
      console.error("Error getting the product:", error);
    }
  };
   const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        router.push("/login");
        return;
      }

      const result = await dispatch(addItemToCart(productData._id, quantity));
      toast.success("Product added to cart!");
      return result;
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  if (!productData) return <div className="text-center py-10">Loading...</div>;

  // ✅ Quantity handlers
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Navbar />

      <div className="w-full md:max-w-6xl px-4 py-10 flex flex-col lg:flex-row justify-evenly items-center gap-5">
        {/* LEFT: Images */}
        <div className="rounded-md overflow-hidden max-w-sm w-full">
          <img
            src={productData.imageUrl}
            alt={productData.name}
            width={500}
            height={500}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="text-gray-600">{productData.subtitle}</p>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-yellow-500 text-sm">
            {"⭐".repeat(Math.round(productData.rating || 5))}
            <span className="text-gray-600 ml-2">
              ({productData.reviews} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-black">
              ${productData.price}
            </span>
            <span className="text-gray-400 line-through">
              ${productData.originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm">{productData.description}</p>

          {/* Color Options */}
          {/* <div>
            <label className="block text-sm font-semibold mb-1">Color</label>
            <div className="flex gap-2">
              {productData.colors?.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div> */}

          {/* Size Options */}
          <div className="flex-col gap-2">
            <label className="block text-sm font-semibold mb-1 ">Size</label>
            {sizes.map((sizeObj) => (
              <button
                key={sizeObj.label}
                onClick={() => {
                  if (sizeObj.inStock) setSelectedSize(sizeObj.label);
                }}
                disabled={!sizeObj.inStock}
                className={` px-3 py-1 border rounded transition m-2 ${
                  selectedSize === sizeObj.label
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                } ${!sizeObj.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {sizeObj.label}
              </button>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={handleDecrement} className="px-3 py-1">
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button onClick={handleIncrement} className="px-3 py-1">
                +
              </button>
            </div>

            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              className="text-2xl text-gray-400 hover:text-red-500"
              onClick={() => router.push("/wishlist")} // ✅ Route to wishlist
            >
              ♡
            </button>
          </div>
        </div>
      </div>
      <Relativeproduct category={productData.category}/>
      
    </div>
  );
};

export default ProductDetailPage;

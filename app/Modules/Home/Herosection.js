"use client";
import Image from "next/image";
import Link from "next/link";

const Herosection = () => {
  return (
    <section className="w-full bg-gray-50 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left Content */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        <h4 className="text-gray-600 text-lg">Classic Exclusive</h4>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Women’s Collection
        </h1>
        <p className="text-gray-600 text-lg">UPTO 40% OFF</p>

        <Link
          href="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-md mt-4 hover:bg-gray-800 transition"
        >
          Shop Now →
        </Link>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-end">
        <div className="relative">
          <Image
            src="/image/Rectangle3463273.svg"
            alt="Women's Collection"
            width={500}
            height={500}
            className="object-contain relative z-10"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Herosection;

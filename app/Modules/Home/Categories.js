"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Woman",
    path: "/Woman",
    image: "/image/pexels-maksgelatin-6702630.jpg",
  },
  {
    name: "Baby Clothes",
    path: "/Baby-Clothes",
    image: "/image/pexels-vika-glitter-392079-1648377.jpg",
  },
  {
    name: "Man",
    path: "/Man",
    image: "/image/pexels-bubi-2709563.jpg",
  },
  {
    name: "Toys",
    path: "/Toys",
    image: "/image/toys.jpg",
  },
];

const Categories = () => {
  const router = useRouter();
  return (
    <div className="w-full px-6 md:px-16 py-10">
      <h2 className="text-2xl font-bold mb-6">Shop by Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            onClick={() => {
              router.push(`${cat.path}`);
            }}
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md group"
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={cat.name}
              width={400}
              height={300}
              className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category Name */}
            <div className="absolute w-full bottom-4 left-1/2 transform -translate-x-1/2 px-4">
              <span className="block bg-white w-full text-center text-gray-900 px-4 py-2 rounded-lg font-medium shadow capitalize">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

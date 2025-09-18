"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { logout } from "../../redux/authSlice.js";
import { useDispatch,useSelector } from "react-redux";


const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Create Product", href: "/admin/create-product" },
    { name: "All Products", href: "/admin/all-products" },
    { name: "Users", href: "/admin/users" },
    { name: "Orders", href: "/admin/orders" },
  ];

  // 🔹 handle navigation (mobile dropdown links)
  const handleNav = (href) => {
    setIsOpen(false); // close menu
    router.push(href); // navigate
  };
  const handlelogout = ()=>{
      dispatch(logout());
     }

  return (
    <>
      {/* 🔹 Top Bar (Mobile Only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50 shadow-md">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 Mobile Dropdown (links) */}
      {isOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 bg-gray-900 text-white flex flex-col px-4 py-3 space-y-2 shadow-md z-40">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-left block px-3 py-2 rounded transition ${
                pathname === link.href ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}

      {/* 🔹 Sidebar (Desktop) */}
      <div className="md:block hidden fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded transition ${
                pathname === link.href ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <button
            onClick={handlelogout}
            className="px-4 py-2 rounded-md text-white  cursor-pointer"
          >
            Logout
          </button>
      </div>
    </>
  );
};

export default AdminSidebar;

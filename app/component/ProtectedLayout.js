"use client";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ allowed public routes (like login, signup, forgot password)
  const publicRoutes = ["/Login", "/Signup", "/Forgot_Password", "/ChangePassword","/Otp",];

  useEffect(() => {
    // agar login nahi h aur route public ni h
    if (!user && !token && !publicRoutes.includes(pathname)) {
      router.push("/Login");
    }

    // agar login h aur login page par gaya to home per redirect
    if ((user || token) && pathname === "Login") {
      router.push("/");
    }
  }, [user, token, pathname, router]);

 

  return <>{children}</>;
}

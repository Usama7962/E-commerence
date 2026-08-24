"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || role !== "admin") {
      router.replace("/admin/login");
    }
  }, [token, role, router]);

  if (!token || role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}

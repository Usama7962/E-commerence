"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/forgot-password");
  }, [router]);
  return null;
}

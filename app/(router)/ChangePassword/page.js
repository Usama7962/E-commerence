"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/change-password");
  }, [router]);
  return null;
}

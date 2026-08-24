"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OtpRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/otp");
  }, [router]);
  return null;
}

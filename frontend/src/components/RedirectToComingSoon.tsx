"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToComingSoon() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sap-ra-mat");
  }, [router]);

  return (
    <p className="py-20 text-center text-sm text-muted-foreground">
      Đang chuyển trang...
    </p>
  );
}
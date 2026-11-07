"use client";

import GuideForm from "@/Components/GuideForm";
import { hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function NewGuidePage() {
  const user = useAuth();
  if (!hasPermission(user, "guides:manage")) return <p className="text-neutral-400">Bạn không có quyền quản lý cẩm nang.</p>;
  return <GuideForm />;
}
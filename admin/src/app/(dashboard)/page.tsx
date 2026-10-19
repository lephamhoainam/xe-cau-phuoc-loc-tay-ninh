"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function OverviewPage() {
  const user = useAuth();
  const [newCount, setNewCount] = useState<number | null>(null);
  const canRead = hasPermission(user, "quotes:read");

  useEffect(() => {
    if (!canRead) return;
    api<{ total: number }>("/api/admin/quotes?status=new&limit=1")
      .then((d) => setNewCount(d.total))
      .catch(() => setNewCount(null));
  }, [canRead]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Xin chào, {user?.username}</h1>

      {canRead ? (
        <Link
          href="/quotes"
          className="block max-w-xs rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-amber-400"
        >
          <div className="text-sm text-neutral-400">Yêu cầu báo giá mới</div>
          <div className="mt-1 text-4xl font-bold text-amber-400">{newCount ?? "-"}</div>
        </Link>
      ) : (
        <p className="text-neutral-400">
          Tài khoản của bạn chưa được cấp quyền nào. Hãy liên hệ quản trị viên.
        </p>
      )}
    </div>
  );
}
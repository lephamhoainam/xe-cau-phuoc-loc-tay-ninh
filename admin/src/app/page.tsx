"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearSession, getToken, hasPermission, type User } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    api<User>("/api/auth/me")
      .then(setUser)
      .catch(() => router.replace("/login"));
  }, [router]);

  function logout() {
    clearSession();
    router.replace("/login");
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        Đang tải...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-400">Phước Lộc Admin</h1>
          <button onClick={logout} className="text-sm text-neutral-400 hover:text-white">
            Đăng xuất
          </button>
        </header>

        <p>
          Xin chào <b>{user.username}</b> ({user.role === "superAdmin" ? "Quản trị cao nhất" : "Nhân viên"})
        </p>

        <ul className="space-y-2 text-neutral-300">
          {hasPermission(user, "quotes:read") && <li>Có quyền xem báo giá</li>}
          {user.role === "superAdmin" && <li>Có quyền quản lý tài khoản</li>}
        </ul>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api, clearSession, getToken, hasPermission, type User } from "@/lib/api";
import { AuthContext } from "@/lib/auth-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const nav = [
    { href: "/", label: "Tổng quan", show: true },
    { href: "/posts", label: "Bài viết", show: hasPermission(user, "posts:manage") },
    { href: "/quotes", label: "Báo giá", show: hasPermission(user, "quotes:read") },
    { href: "/guides", label: "Cẩm nang", show: hasPermission(user, "guides:manage") },
    { href: "/users", label: "Tài khoản", show: user.role === "superAdmin" },
  ].filter((item) => item.show);

  return (
    <AuthContext.Provider value={user}>
      <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 md:flex-row">
        <aside className="border-b border-neutral-800 bg-neutral-900 md:w-56 md:border-b-0 md:border-r">
          <div className="p-4 text-lg font-bold text-amber-400">Phước Lộc Admin</div>

          <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                    active
                      ? "bg-amber-400 font-semibold text-neutral-900"
                      : "text-neutral-300 hover:bg-neutral-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden border-t border-neutral-800 p-4 text-sm md:mt-6 md:block">
            <div className="font-medium">{user.username}</div>
            <div className="mb-2 text-xs text-neutral-400">
              {user.role === "superAdmin" ? "Quản trị cao nhất" : "Nhân viên"}
            </div>
            <button onClick={logout} className="text-neutral-400 hover:text-white">
              Đăng xuất
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="text-sm text-neutral-400">{user.username}</span>
            <button onClick={logout} className="text-sm text-neutral-400 hover:text-white">
              Đăng xuất
            </button>
          </div>
          {children}
        </main>
      </div>
    </AuthContext.Provider>
  );
}
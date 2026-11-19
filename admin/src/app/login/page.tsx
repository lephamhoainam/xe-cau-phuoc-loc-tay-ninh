"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, saveSession, type User } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api<{ token: string; user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      saveSession(data.token, data.user);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
      >
        <h1 className="text-xl font-bold text-amber-400">Phước Lộc Admin</h1>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Tên đăng nhập</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-amber-400"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-400 py-2 font-semibold text-neutral-900 disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type Guide = { _id: string; title: string; tag?: string; author?: string; status: "draft" | "published"; updatedAt: string };
type GuideList = { items: Guide[]; total: number; page: number; pages: number };

export default function GuidesPage() {
  const user = useAuth();
  const allowed = hasPermission(user, "guides:manage");
  const [data, setData] = useState<GuideList | null>(null);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    if (!allowed) return;
    setError("");
    try {
      const p = new URLSearchParams({ page: String(page), limit: "20" });
      if (status) p.set("status", status);
      if (q) p.set("q", q);
      setData(await api<GuideList>(`/api/admin/guides?${p}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }, [allowed, page, status, q]);

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  async function remove(g: Guide) {
    if (!confirm(`Xóa "${g.title}"? Không thể khôi phục.`)) return;
    try {
      await api(`/api/admin/guides/${g._id}`, { method: "DELETE" });
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  if (!allowed) return <p className="text-neutral-400">Bạn không có quyền quản lý cẩm nang.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-amber-400">Nội dung</div>
          <h1 className="text-2xl font-bold">Cẩm nang</h1>
          <p className="text-sm text-neutral-400">Bài nháp không hiển thị công khai.</p>
        </div>
        <Link href="/guides/new" className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900">
          Viết bài mới
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tiêu đề"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Nháp</option>
        </select>
        {data && <span className="self-center text-sm text-neutral-400">{data.total} bài viết</span>}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <tbody className="divide-y divide-neutral-800">
            {!data && <tr><td className="px-3 py-6 text-center text-neutral-400">Đang tải...</td></tr>}
            {data?.items.length === 0 && <tr><td className="px-3 py-6 text-center text-neutral-400">Chưa có bài nào.</td></tr>}
            {data?.items.map((g) => (
              <tr key={g._id}>
                <td className="px-3 py-3">
                  <div className="font-medium">{g.title}</div>
                  <div className="text-xs text-neutral-500">{g.author}</div>
                </td>
                <td className="px-3 py-3 text-neutral-300">{g.tag}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${g.status === "published" ? "bg-emerald-400/15 text-emerald-300" : "bg-neutral-700/50 text-neutral-300"}`}>
                    {g.status === "published" ? "Đã xuất bản" : "Nháp"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-neutral-400">{new Date(g.updatedAt).toLocaleDateString("vi-VN")}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  <Link href={`/guides/${g._id}`} className="mr-3 text-xs text-sky-400">Sửa</Link>
                  <button onClick={() => remove(g)} className="text-xs text-red-400">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span>Trang {data.page}/{data.pages}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40">Trước</button>
            <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40">Sau</button>
          </div>
        </div>
      )}
    </div>
  );
}
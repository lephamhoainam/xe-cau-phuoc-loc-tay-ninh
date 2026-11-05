"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type Post = {
  slug: string;
  _id: string;
  title: string;
  excerpt?: string;
  tag?: string;
  author?: string;
  image?: string;
  featured?: boolean;
  status: "draft" | "published";
  publishedAt?: string;
  updatedAt: string;
  
};

type PostList = { items: Post[]; total: number; page: number; pages: number };

export default function PostsPage() {
  const user = useAuth();
  const allowed = hasPermission(user, "posts:manage");

  const [data, setData] = useState<PostList | null>(null);
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
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (status) params.set("status", status);
      if (q) params.set("q", q);
      setData(await api<PostList>(`/api/admin/posts?${params}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }, [allowed, page, status, q]);

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  async function remove(p: Post) {
    if (!confirm(`Xóa bài "${p.title}"? Không thể khôi phục.`)) return;
    try {
      await api(`/api/admin/posts/${p._id}`, { method: "DELETE" });
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  if (!allowed) return <p className="text-neutral-400">Bạn không có quyền quản lý bài viết.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
          <p className="text-sm text-neutral-400">Quản lý trạng thái và nội dung các bài viết.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
          <Link
            href="/posts/new"
            className="whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900"
          >
            + Viết bài mới
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
        >
          <option value="">Trạng thái: Tất cả</option>
          <option value="published">Đã đăng</option>
          <option value="draft">Nháp</option>
        </select>
        {data && <span className="text-sm text-neutral-400">{data.total} bài viết</span>}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="px-3 py-2 font-medium">Tiêu đề</th>
              <th className="px-3 py-2 font-medium">Danh mục</th>
              <th className="px-3 py-2 font-medium">Trạng thái</th>
              <th className="px-3 py-2 font-medium">Cập nhật</th>
              <th className="px-3 py-2 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {!data && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-neutral-400">
                  Đang tải...
                </td>
              </tr>
            )}
            {data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-neutral-400">
                  Chưa có bài viết nào.
                </td>
              </tr>
            )}
            {data?.items.map((p) => (
              <tr key={p._id} className="align-top">
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                    )}
                    <div>
                      <div className="font-medium">
                        {p.title}
                        {p.featured && (
                          <span className="ml-2 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">
                            Nổi bật
                          </span>
                        )}
                      </div>
                      <div className="line-clamp-1 text-xs text-neutral-500">{p.excerpt}</div>
                      <div className="text-xs text-neutral-500">Người đăng: {p.author}</div>
                      <div className="text-xs text-neutral-600">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-neutral-300">{p.tag}</td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      p.status === "published"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-neutral-700/50 text-neutral-300"
                    }`}
                  >
                    {p.status === "published" ? "Đã đăng" : "Nháp"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-neutral-400">
                  {new Date(p.updatedAt).toLocaleString("vi-VN")}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  <Link href={`/posts/${p._id}`} className="mr-3 text-xs text-sky-400 hover:text-sky-300">
                    Sửa
                  </Link>
                  <button onClick={() => remove(p)} className="text-xs text-red-400 hover:text-red-300">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span>
            Trang {data.page}/{data.pages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40"
            >
              Trước
            </button>
            <button
              disabled={page >= data.pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
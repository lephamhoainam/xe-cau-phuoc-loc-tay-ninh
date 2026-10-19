"use client";

import { useCallback, useEffect, useState } from "react";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type Status = "new" | "contacted" | "done";

type Quote = {
  _id: string;
  name: string;
  phone: string;
  craneType?: string;
  location?: string;
  note?: string;
  status: Status;
  createdAt: string;
};

type QuoteList = { items: Quote[]; total: number; page: number; pages: number };

const STATUS_LABEL: Record<Status, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  done: "Đã chốt",
};

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-amber-400/15 text-amber-300",
  contacted: "bg-sky-400/15 text-sky-300",
  done: "bg-emerald-400/15 text-emerald-300",
};

export default function QuotesPage() {
  const user = useAuth();
  const canRead = hasPermission(user, "quotes:read");
  const canUpdate = hasPermission(user, "quotes:update");
  const canDelete = hasPermission(user, "quotes:delete");

  const [data, setData] = useState<QuoteList | null>(null);
  const [status, setStatus] = useState<"" | Status>("");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chờ người dùng ngừng gõ 0,4 giây rồi mới tìm
  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    if (!canRead) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (status) params.set("status", status);
      if (q) params.set("q", q);
      setData(await api<QuoteList>(`/api/admin/quotes?${params}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }, [canRead, page, status, q]);

  useEffect(() => {
  const t = setTimeout(load, 0);
  return () => clearTimeout(t);
}, [load]);

  async function changeStatus(id: string, newStatus: Status) {
    try {
      await api(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  async function remove(quote: Quote) {
    if (!confirm(`Xóa yêu cầu của "${quote.name}"? Không thể khôi phục.`)) return;
    try {
      await api(`/api/admin/quotes/${quote._id}`, { method: "DELETE" });
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  if (!canRead) {
    return <p className="text-neutral-400">Bạn không có quyền xem báo giá.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Yêu cầu báo giá</h1>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc số điện thoại"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400 sm:max-w-xs"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "" | Status);
            setPage(1);
          }}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="done">Đã chốt</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="px-3 py-2 font-medium">Khách hàng</th>
              <th className="px-3 py-2 font-medium">Nhu cầu</th>
              <th className="px-3 py-2 font-medium">Thời gian</th>
              <th className="px-3 py-2 font-medium">Trạng thái</th>
              {canDelete && <th className="px-3 py-2" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {loading && !data && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-neutral-400">
                  Đang tải...
                </td>
              </tr>
            )}
            {data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-neutral-400">
                  Không có yêu cầu nào.
                </td>
              </tr>
            )}
            {data?.items.map((item) => (
              <tr key={item._id} className="align-top">
                <td className="px-3 py-3">
                  <div className="font-medium">{item.name}</div>
                  <a href={`tel:${item.phone}`} className="text-amber-400 hover:underline">
                    {item.phone}
                  </a>
                </td>
                <td className="px-3 py-3 text-neutral-300">
                  <div>{item.craneType || "-"}</div>
                  <div className="text-neutral-500">{item.location}</div>
                  {item.note && <div className="mt-1 text-neutral-400">{item.note}</div>}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-neutral-400">
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="px-3 py-3">
                  {canUpdate ? (
                    <select
                      value={item.status}
                      onChange={(e) => changeStatus(item._id, e.target.value as Status)}
                      className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs outline-none focus:border-amber-400"
                    >
                      <option value="new">Mới</option>
                      <option value="contacted">Đã liên hệ</option>
                      <option value="done">Đã chốt</option>
                    </select>
                  ) : (
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${STATUS_STYLE[item.status]}`}
                    >
                      {STATUS_LABEL[item.status]}
                    </span>
                  )}
                </td>
                {canDelete && (
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={() => remove(item)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Xóa
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span>
            Trang {data.page}/{data.pages} ({data.total} yêu cầu)
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
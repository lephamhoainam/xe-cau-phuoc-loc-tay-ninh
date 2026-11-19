"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type AdminUser = {
  _id: string;
  username: string;
  role: "superAdmin" | "staff";
  permissions: string[];
  isActive: boolean;
};

const PERM_LABEL: Record<string, string> = {
  "quotes:read": "Xem báo giá",
  "quotes:update": "Đổi trạng thái báo giá",
  "quotes:delete": "Xóa báo giá",
  "posts:manage": "Quản lý bài viết",
  "services:manage": "Quản lý dịch vụ",
  "guides:manage": "Quản lý cẩm nang",
};

const GROUPS: { title: string; perms: string[] }[] = [
  { title: "Báo giá", perms: ["quotes:read", "quotes:update", "quotes:delete"] },
  { title: "Bài viết", perms: ["posts:manage"] },
  { title: "Dịch vụ", perms: ["services:manage"] },
  { title: "Cẩm nang", perms: ["guides:manage"] },
];

// Sửa/xóa báo giá bắt buộc kèm quyền xem
function normalize(perms: string[]): string[] {
  const set = new Set(perms);
  if (set.has("quotes:update") || set.has("quotes:delete")) set.add("quotes:read");
  return [...set];
}

function PermissionPicker({
  all,
  value,
  onChange,
}: {
  all: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const allSelected = all.length > 0 && all.every((p) => value.includes(p));

  function toggle(p: string, checked: boolean) {
    let next = checked ? [...value, p] : value.filter((x) => x !== p);
    if (!checked && p === "quotes:read") {
      next = next.filter((x) => x !== "quotes:update" && x !== "quotes:delete");
    }
    onChange(normalize(next));
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onChange(allSelected ? [] : all)}
        className="text-xs text-amber-400 hover:underline"
      >
        {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
      </button>

      {GROUPS.map((g) => {
        const perms = g.perms.filter((p) => all.includes(p));
        if (perms.length === 0) return null;
        return (
          <div key={g.title}>
            <div className="mb-1 text-xs font-semibold uppercase text-neutral-500">{g.title}</div>
            <div className="grid gap-1 sm:grid-cols-2">
              {perms.map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm text-neutral-300">
                  <input
                    type="checkbox"
                    checked={value.includes(p)}
                    onChange={(e) => toggle(p, e.target.checked)}
                  />
                  {PERM_LABEL[p] ?? p}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const inputCls =
  "rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400";

export default function UsersPage() {
  const me = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [allPerms, setAllPerms] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPerms, setNewPerms] = useState<string[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [editPerms, setEditPerms] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const [list, perms] = await Promise.all([
        api<AdminUser[]>("/api/admin/users"),
        api<string[]>("/api/admin/users/permissions"),
      ]);
      setUsers(list);
      setAllPerms(perms);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  async function run(fn: () => Promise<unknown>, success: string) {
    setError("");
    setOk("");
    try {
      await fn();
      await load();
      setOk(success);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  function createUser(e: React.FormEvent) {
    e.preventDefault();
    run(async () => {
      await api("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({ username: username.trim(), password, permissions: newPerms }),
      });
      setUsername("");
      setPassword("");
      setNewPerms([]);
    }, "Đã tạo tài khoản");
  }

  function savePerms(id: string) {
    run(async () => {
      await api(`/api/admin/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ permissions: editPerms }),
      });
      setEditId(null);
    }, "Đã cập nhật quyền");
  }

  function toggleActive(u: AdminUser) {
    run(
      () =>
        api(`/api/admin/users/${u._id}`, {
          method: "PATCH",
          body: JSON.stringify({ isActive: !u.isActive }),
        }),
      u.isActive ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản"
    );
  }

  function resetPassword(u: AdminUser) {
    const pw = prompt(`Mật khẩu mới cho "${u.username}" (tối thiểu 8 ký tự):`);
    if (!pw) return;
    run(
      () =>
        api(`/api/admin/users/${u._id}`, {
          method: "PATCH",
          body: JSON.stringify({ password: pw }),
        }),
      "Đã đặt lại mật khẩu"
    );
  }

  function remove(u: AdminUser) {
    if (!confirm(`Xóa tài khoản "${u.username}"? Không thể khôi phục.`)) return;
    run(() => api(`/api/admin/users/${u._id}`, { method: "DELETE" }), "Đã xóa tài khoản");
  }

  if (me?.role !== "superAdmin") {
    return <p className="text-neutral-400">Chỉ superAdmin mới xem được trang này.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        <p className="text-sm text-neutral-400">
          Tạo tài khoản nhân viên và chọn quyền cho từng người. Quyền có hiệu lực ngay.
        </p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {ok && <p className="text-sm text-emerald-400">{ok}</p>}

      <form
        onSubmit={createUser}
        className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
      >
        <h2 className="font-semibold text-amber-400">Tạo tài khoản nhân viên</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên đăng nhập (tối thiểu 3 ký tự)"
            required
            minLength={3}
            className={inputCls}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu (tối thiểu 8 ký tự)"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputCls}
          />
        </div>
        <PermissionPicker all={allPerms} value={newPerms} onChange={setNewPerms} />
        <button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900">
          Tạo tài khoản
        </button>
      </form>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u._id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-medium">{u.username}</span>{" "}
                <span className="text-xs text-neutral-400">
                  {u.role === "superAdmin" ? "Quản trị cao nhất" : "Nhân viên"}
                </span>
                {!u.isActive && <span className="ml-2 text-xs text-red-400">Đã khóa</span>}
              </div>

              {u.role !== "superAdmin" && (
                <div className="flex flex-wrap gap-3 text-xs">
                  <button
                    onClick={() => {
                      setEditId(editId === u._id ? null : u._id);
                      setEditPerms(u.permissions);
                    }}
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Phân quyền
                  </button>
                  <button onClick={() => toggleActive(u)} className="text-amber-400">
                    {u.isActive ? "Khóa" : "Mở khóa"}
                  </button>
                  <button onClick={() => resetPassword(u)} className="text-neutral-300">
                    Đặt lại mật khẩu
                  </button>
                  <button onClick={() => remove(u)} className="text-red-400">
                    Xóa
                  </button>
                </div>
              )}
            </div>

            {u.role === "superAdmin" ? (
              <p className="mt-2 text-xs text-neutral-500">Có toàn quyền.</p>
            ) : editId === u._id ? (
              <div className="mt-3 space-y-3">
                <PermissionPicker all={allPerms} value={editPerms} onChange={setEditPerms} />
                <div className="flex gap-3">
                  <button
                    onClick={() => savePerms(u._id)}
                    className="rounded-lg bg-amber-400 px-3 py-1 text-sm font-semibold text-neutral-900"
                  >
                    Lưu quyền
                  </button>
                  <button onClick={() => setEditId(null)} className="text-sm text-neutral-400">
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-xs text-neutral-400">
                {u.permissions.length
                  ? u.permissions.map((p) => PERM_LABEL[p] ?? p).join(" · ")
                  : "Chưa có quyền nào"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { checkText, checkLongText } from "@/lib/validate";

type PostImage = { src: string; alt?: string };

export type PostFormData = {
  title: string;
  tag: string;
  excerpt: string;
  author: string;
  publishedAt: string; // định dạng datetime-local
  readTime: string;
  content: string;
  conclusion: string;
  images: PostImage[];
  featured: boolean;
  status: "draft" | "published";
slug: string;
};
function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORIES = ["Kinh nghiệm", "Cẩm nang", "An toàn", "Tin tức"];

export function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

const inputCls =
  "w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400";
// Hiển thị cảnh baos
function FieldError({ message, show }: { message: string | null; show: boolean }) {
  if (!show || !message) return null;
  return <p className="mt-1 text-xs text-red-400">{message}</p>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-neutral-300">{label}</label>
      {children}
    </div>
  );
}

export default function PostForm({ id, initial }: { id?: string; initial?: PostFormData }) {
  const router = useRouter();
  const me = useAuth();

  const [form, setForm] = useState<PostFormData>(
    initial ?? {
      title: "",
      tag: "Kinh nghiệm",
      excerpt: "",
      author: me?.username ?? "",
      publishedAt: "",
      readTime: "",
      content: "",
      conclusion: "",
      images: [],
      featured: false,
      status: "draft",
      slug: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
    function set<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setError("");
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setImage(i: number, patch: Partial<PostImage>) {
    set(
      "images",
      form.images.map((img, idx) => (idx === i ? { ...img, ...patch } : img))
    );
  }

    async function submit(status: "draft" | "published") {
    setError("");
    const first = Object.values(errors).find(Boolean);
        if (first) {
      setTouched({ title: true, excerpt: true, tag: true, author: true, readTime: true });
      return;
    }
    setSaving(true);
    try {
            const body = {
        ...form,
        status,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        images: form.images.filter((i) => i.src.trim()),
      };
      if (id) {
        await api(`/api/admin/posts/${id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await api("/api/admin/posts", { method: "POST", body: JSON.stringify(body) });
      }
      router.push("/posts");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  }
  // Tính lỗi từng ô
    const errors = {
    title: checkText(form.title, "Tiêu đề", { min: 5, max: 200, minWords: 2 }),
    excerpt: checkText(form.excerpt, "Mô tả", { max: 300, required: false, minWords: 2 }),
    tag: checkText(form.tag, "Danh mục", { max: 50 }),
    author: checkText(form.author, "Tên người đăng", { min: 2, max: 100 }),
    content: checkLongText(form.content, "Nội dung bài viết", 1, 50000),
    conclusion: checkLongText(form.conclusion, "Kết luận", 1, 5000),
    readTime: checkText(form.readTime, "Thời gian đọc", { max: 30, required: false }),
  };
  const hasErrors = Object.values(errors).some(Boolean);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{id ? "Sửa bài viết" : "Viết bài mới"}</h1>
        <button onClick={() => router.push("/posts")} className="text-sm text-neutral-400 hover:text-white">
          Quay lại danh sách
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="grid gap-5 rounded-xl border border-neutral-800 bg-neutral-900 p-4 md:p-5">
       <Field label="Tiêu đề *">
  <input
    value={form.title}
       onChange={(e) => {
      setError("");
      const title = e.target.value;
      setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
    }}
    onBlur={() => touch("title")}
    maxLength={200}
    className={`${inputCls} ${touched.title && errors.title ? "border-red-500" : ""}`}
  />
  <FieldError message={errors.title} show={!!touched.title} />
</Field>

<Field label="Đường dẫn (slug) - tự tạo từ tiêu đề, có thể sửa">
  <input
    value={form.slug}
    onChange={(e) => {
      setSlugTouched(true);
      set("slug", slugify(e.target.value));
    }}
    placeholder="vi-du-duong-dan-bai-viet"
    className={inputCls}
  />
</Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Danh mục bài viết">
  <input
    list="categories"
    value={form.tag}
    onChange={(e) => set("tag", e.target.value)}
    onBlur={() => touch("tag")}
    className={`${inputCls} ${touched.tag && errors.tag ? "border-red-500" : ""}`}
  />
  <datalist id="categories">
    {CATEGORIES.map((c) => (
      <option key={c} value={c} />
    ))}
  </datalist>
  <FieldError message={errors.tag} show={!!touched.tag} />
</Field>
          <Field label="Tên người đăng">
  <input
    value={form.author}
    onChange={(e) => set("author", e.target.value)}
    onBlur={() => touch("author")}
    minLength={2}
    maxLength={100}
    className={`${inputCls} ${touched.author && errors.author ? "border-red-500" : ""}`}
  />
  <FieldError message={errors.author} show={!!touched.author} />
</Field>
          <Field label="Thời gian đăng (để trống = lúc bấm Đăng bài)">
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => set("publishedAt", e.target.value)}
              className={inputCls}
            />
          </Field>
         <Field label="Thời gian đọc (ví dụ: 5 phút đọc)">
  <input
    value={form.readTime}
    onChange={(e) => set("readTime", e.target.value)}
    onBlur={() => touch("readTime")}
    maxLength={30}
    className={`${inputCls} ${touched.readTime && errors.readTime ? "border-red-500" : ""}`}
  />
  <FieldError message={errors.readTime} show={!!touched.readTime} />
</Field>
        </div>

        <Field label="Mô tả ngắn (tối đa 300 ký tự)">
  <textarea
    value={form.excerpt}
    onChange={(e) => set("excerpt", e.target.value)}
    onBlur={() => touch("excerpt")}
    maxLength={300}
    rows={2}
    className={`${inputCls} ${touched.excerpt && errors.excerpt ? "border-red-500" : ""}`}
  />
  <FieldError message={errors.excerpt} show={!!touched.excerpt} />
</Field>

        <Field label="Nội dung bài viết">
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            rows={12}
            className={inputCls}
          />
        </Field>

        <Field label="Kết luận">
          <textarea
            value={form.conclusion}
            onChange={(e) => set("conclusion", e.target.value)}
            rows={4}
            className={inputCls}
          />
        </Field>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm text-neutral-300">Ảnh (ảnh đầu tiên là ảnh bìa)</label>
            <button
              type="button"
              onClick={() => set("images", [...form.images, { src: "", alt: "" }])}
              className="text-sm text-amber-400 hover:underline"
            >
              + Thêm ảnh
            </button>
          </div>

          {form.images.length === 0 && <p className="text-sm text-neutral-500">Chưa có ảnh nào.</p>}

          <div className="space-y-2">
            {form.images.map((img, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-neutral-800 p-2 sm:flex-row sm:items-center">
                {img.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img.src} alt="" className="h-14 w-20 shrink-0 rounded object-cover" />
                )}
                <input
                  value={img.src}
                  onChange={(e) => setImage(i, { src: e.target.value })}
                  placeholder="Link ảnh (https://...)"
                  className={inputCls}
                />
                <input
                  value={img.alt ?? ""}
                  onChange={(e) => setImage(i, { alt: e.target.value })}
                  placeholder="Mô tả ảnh"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          Bài nổi bật (chỉ một bài được nổi bật, bài cũ sẽ bị bỏ cờ)
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        {hasErrors && (
  <p className="text-sm text-red-400">Vui lòng sửa các ô báo đỏ trước khi lưu hoặc đăng bài.</p>
)}
        <button
  disabled={saving || hasErrors}
  onClick={() => submit("published")}
  className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
>
  {saving ? "Đang lưu..." : "Đăng bài"}
</button>
<button
  disabled={saving || hasErrors}
  onClick={() => submit("draft")}
  className="rounded-lg border border-neutral-700 px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
>
  Lưu nháp
</button>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { checkText } from "@/lib/validate";
import RichEditor from "@/Components/RichEditor";

type Section = { key: number; title: string; html: string };

export type GuideFormData = {
  title: string;
  tag: string;
  slug: string;
  summary: string;
  author: string;
  readTime: string;
  status: "draft" | "published";
  sections: { title: string; html: string }[];
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

const inputCls =
  "w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400";

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase text-neutral-400">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default function GuideForm({ id, initial }: { id?: string; initial?: GuideFormData }) {
  const router = useRouter();
  const me = useAuth();
  const nextKey = useRef(1000);

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    tag: initial?.tag ?? "",
    slug: initial?.slug ?? "",
    summary: initial?.summary ?? "",
    author: initial?.author ?? me?.username ?? "",
    readTime: initial?.readTime ?? "5",
    status: initial?.status ?? ("draft" as "draft" | "published"),
  });
  const [sections, setSections] = useState<Section[]>(
    (initial?.sections?.length ? initial.sections : [{ title: "", html: "" }]).map((s, i) => ({ key: i, ...s }))
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api<string[]>("/api/admin/guides/categories").then(setCategories).catch(() => {});
  }, []);

  const errors = {
    title: checkText(form.title, "Tiêu đề", { min: 5, max: 200, minWords: 2 }),
    tag: checkText(form.tag, "Chuyên mục", { min: 2, max: 80 }),
    summary: checkText(form.summary, "Tóm tắt", { max: 500, required: false, minWords: 2 }),
    author: checkText(form.author, "Tác giả", { min: 2, max: 100 }),
    readTime:
      Number(form.readTime) >= 1 && Number(form.readTime) <= 120 ? null : "Thời gian đọc từ 1 đến 120 phút",
  };

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setError("");
    setForm((f) => ({ ...f, [key]: value }));
  }

  function patchSection(key: number, patch: Partial<Section>) {
    setSections((list) => list.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  async function save() {
    setError("");
    setTouched(true);
    if (Object.values(errors).some(Boolean)) return;

    setSaving(true);
    try {
      const body = {
        ...form,
        readTime: Number(form.readTime),
        sections: sections.map(({ title, html }) => ({ title, html })),
      };
      if (id) await api(`/api/admin/guides/${id}`, { method: "PUT", body: JSON.stringify(body) });
      else await api("/api/admin/guides", { method: "POST", body: JSON.stringify(body) });
      router.push("/guides");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  }

  const show = (k: keyof typeof errors) => (touched ? errors[k] : null);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-semibold uppercase text-amber-400">Nội dung</div>
        <h1 className="text-2xl font-bold">{id ? "Sửa cẩm nang" : "Viết bài mới"}</h1>
        <p className="text-sm text-neutral-400">Bài mới được lưu ở trạng thái Nháp cho đến khi bạn chọn Xuất bản.</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="grid gap-5 rounded-xl border border-neutral-800 bg-neutral-900 p-4 md:p-5">
        <Field label="Tiêu đề" error={show("title")}>
          <input
            value={form.title}
            maxLength={200}
            onChange={(e) => {
              const title = e.target.value;
              setError("");
              setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
            }}
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Chuyên mục" hint="Chọn chuyên mục có sẵn hoặc nhập chuyên mục mới." error={show("tag")}>
            <input list="guide-categories" value={form.tag} onChange={(e) => set("tag", e.target.value)} className={inputCls} />
            <datalist id="guide-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Địa chỉ (không bắt buộc)" hint="Chữ thường, không dấu, nối bằng dấu gạch ngang.">
            <input
              value={form.slug}
              placeholder="Tạo từ tiêu đề nếu để trống"
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Tóm tắt" error={show("summary")}>
          <textarea value={form.summary} onChange={(e) => set("summary", e.target.value)} rows={3} maxLength={500} className={inputCls} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tác giả" error={show("author")}>
            <input value={form.author} onChange={(e) => set("author", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Thời gian đọc (phút)" error={show("readTime")}>
            <input type="number" min={1} max={120} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} className={inputCls} />
          </Field>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase text-neutral-400">Nội dung</div>

          {sections.map((s, i) => (
            <div key={s.key} className="rounded-xl border border-neutral-800 bg-neutral-950/50">
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
                <span className="font-semibold">Nội dung {i + 1}</span>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Xóa Nội dung ${i + 1}?`)) setSections((l) => l.filter((x) => x.key !== s.key));
                    }}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="space-y-3 p-4">
                <Field label="Tiêu đề">
                  <input
                    value={s.title}
                    maxLength={200}
                    placeholder="Nhập tiêu đề..."
                    onChange={(e) => patchSection(s.key, { title: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Nội dung">
                  <RichEditor value={s.html} onChange={(html) => patchSection(s.key, { html })} />
                </Field>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSections((l) => [...l, { key: nextKey.current++, title: "", html: "" }])}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:border-amber-400"
          >
            + Thêm nội dung
          </button>
        </div>

        <Field label="Trạng thái">
          <select value={form.status} onChange={(e) => set("status", e.target.value as "draft" | "published")} className={inputCls}>
            <option value="draft">Nháp (chưa hiển thị)</option>
            <option value="published">Xuất bản</option>
          </select>
        </Field>
      </div>

      <div className="flex gap-3">
        <button
          disabled={saving}
          onClick={save}
          className="rounded-lg bg-amber-400 px-6 py-2 text-sm font-semibold text-neutral-900 disabled:opacity-60"
        >
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
        <button onClick={() => router.push("/guides")} className="rounded-lg border border-neutral-700 px-5 py-2 text-sm">
          Hủy
        </button>
      </div>
    </div>
  );
}
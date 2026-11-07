"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GuideForm, { type GuideFormData } from "@/Components/GuideForm";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type ApiGuide = {
  title?: string; tag?: string; slug?: string; summary?: string; author?: string;
  readTime?: number; status?: string; sections?: { title?: string; html?: string }[];
};

export default function EditGuidePage() {
  const user = useAuth();
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<GuideFormData | null>(null);
  const [error, setError] = useState("");
  const allowed = hasPermission(user, "guides:manage");

  useEffect(() => {
    if (!allowed) return;
    api<ApiGuide>(`/api/admin/guides/${id}`)
      .then((g) =>
        setInitial({
          title: g.title ?? "",
          tag: g.tag ?? "",
          slug: g.slug ?? "",
          summary: g.summary ?? "",
          author: g.author ?? "",
          readTime: String(g.readTime ?? 5),
          status: g.status === "published" ? "published" : "draft",
          sections: (g.sections ?? []).map((s) => ({ title: s.title ?? "", html: s.html ?? "" })),
        })
      )
      .catch((e) => setError(e instanceof Error ? e.message : "Có lỗi xảy ra"));
  }, [id, allowed]);

  if (!allowed) return <p className="text-neutral-400">Bạn không có quyền quản lý cẩm nang.</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!initial) return <p className="text-neutral-400">Đang tải...</p>;
  return <GuideForm id={id} initial={initial} />;
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm, { toLocalInput, type PostFormData } from "@/Components/PostForm";
import { api, hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type ApiPost = {
  title?: string;
  tag?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  readTime?: string;
  content?: string;
  conclusion?: string;
  images?: { src: string; alt?: string }[];
  featured?: boolean;
  status?: string;
    slug?: string;
};

export default function EditPostPage() {
  const user = useAuth();
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<PostFormData | null>(null);
  const [error, setError] = useState("");
  const allowed = hasPermission(user, "posts:manage");

  useEffect(() => {
    if (!allowed) return;
    api<ApiPost>(`/api/admin/posts/${id}`)
      .then((p) =>
        setInitial({
          title: p.title ?? "",
          tag: p.tag ?? "",
          excerpt: p.excerpt ?? "",
          author: p.author ?? "",
          publishedAt: toLocalInput(p.publishedAt),
          readTime: p.readTime ?? "",
          content: p.content ?? "",
          conclusion: p.conclusion ?? "",
          images: Array.isArray(p.images) ? p.images : [],
          featured: Boolean(p.featured),
          status: p.status === "published" ? "published" : "draft",
            slug: p.slug ?? "",
        })
      )
      .catch((e) => setError(e instanceof Error ? e.message : "Có lỗi xảy ra"));
  }, [id, allowed]);

  if (!allowed) return <p className="text-neutral-400">Bạn không có quyền quản lý bài viết.</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!initial) return <p className="text-neutral-400">Đang tải...</p>;

  return <PostForm id={id} initial={initial} />;
}
"use client";
import PostForm from "@/Components/PostForm";
import { hasPermission } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function NewPostPage() {
  const user = useAuth();
  if (!hasPermission(user, "posts:manage")) {
    return <p className="text-neutral-400">Bạn không có quyền quản lý bài viết.</p>;
  }
  return <PostForm />;
}
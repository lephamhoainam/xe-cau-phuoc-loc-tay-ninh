"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RotateCw } from "lucide-react";

export default function RetryButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary disabled:opacity-60"
    >
      <RotateCw className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      {pending ? "Đang tải..." : "Thử lại"}
    </button>
  );
}
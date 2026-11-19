"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, WifiOff } from "lucide-react";

export default function LoadError({ onRetry }: { onRetry?: () => void }) {
  const router = useRouter();

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-border bg-muted px-6 py-12 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <WifiOff className="h-6 w-6" />
      </span>
      <p className="mt-4 text-lg font-extrabold text-foreground">
        Không thể tải dữ liệu
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Kết nối bị lỗi, vui lòng kiểm tra mạng và thử lại.
      </p>
      <button
        type="button"
        onClick={onRetry ?? (() => router.refresh())}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition hover:border-primary hover:text-primary"
      >
        <RefreshCw className="h-4 w-4" />
        Thử lại
      </button>
    </div>
  );
}
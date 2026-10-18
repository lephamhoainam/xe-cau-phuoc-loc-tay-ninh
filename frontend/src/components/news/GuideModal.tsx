"use client";

import { useEffect } from "react";
import { Clock, Lightbulb, X } from "lucide-react";
import { DEFAULT_AUTHOR } from "../../lib/data";
import type { GuideItem } from "../../lib/types";

export default function GuideModal({
  guide,
  onClose,
}: {
  guide: GuideItem;
  onClose: () => void;
}) {
  // Esc để đóng + khóa cuộn trang phía sau khi cửa sổ đang mở
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    // Mobile: nằm giữa và chừa đáy (pb-28) để không đè lên nút Zalo nổi
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 pb-28 sm:pb-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[60dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-card shadow-xl sm:max-h-[75vh]"
      >
        {/* Đầu cửa sổ: đứng yên khi cuộn nội dung */}
        <div className="relative shrink-0 border-b border-border bg-muted px-5 py-3 pr-12">
          <h3
            id="guide-title"
            className="text-lg font-bold leading-snug text-foreground"
          >
            {guide.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span>{guide.author ?? DEFAULT_AUTHOR}</span>
            {guide.readTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="absolute right-3 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-background hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nội dung: cuộn lên xuống */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {guide.summary}
          </p>

          <ol className="mt-3 space-y-2.5">
            {guide.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ol>

          {guide.note && (
            <div className="mt-4 flex gap-2.5 rounded-lg border-l-4 border-primary bg-muted p-3 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                <span className="font-bold">Lưu ý: </span>
                {guide.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
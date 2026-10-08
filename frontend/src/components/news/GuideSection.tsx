"use client";

import { useEffect, useState } from "react";
import { guides, DEFAULT_AUTHOR } from "../../lib/data";
import type { GuideItem } from "../../lib/types";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function GuideSection() {
  const [active, setActive] = useState<GuideItem | null>(null);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (guides.length === 0) return null;

  return (
    <Section>
      <SectionTitle
        eyebrow="Cẩm nang"
        title="Cẩm nang nhanh cho người thuê xe cẩu"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.id}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:border-primary hover:shadow-md"
          >
            {/* Hàng trên: tag trái, thời gian đọc phải */}
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                {g.tag}
              </span>
              {g.readTime && (
                <span className="shrink-0 text-xs text-muted-foreground">
                  {g.readTime}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-extrabold uppercase leading-snug group-hover:text-primary">
              {g.title}
            </h3>
            <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
              {g.summary}
            </p>

            {/* Chân card: tác giả trái, Đọc tiếp phải */}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-3">
              <span className="truncate text-sm text-muted-foreground">
                {g.author ?? DEFAULT_AUTHOR}
              </span>
              <button
                type="button"
                onClick={() => setActive(g)}
                className="shrink-0 text-sm font-extrabold uppercase text-primary hover:text-primary-hover"
              >
                Đọc tiếp
              </button>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
          >
            {/* Đầu cửa sổ */}
            <div className="bg-primary px-6 py-5 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                {active.tag}
              </p>
              <h3 id="guide-title" className="mt-1 text-xl font-extrabold">
                {active.title}
              </h3>
              <p className="mt-2 text-xs opacity-80">
                {[active.author ?? DEFAULT_AUTHOR, active.readTime]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>

            {/* Nội dung cuộn được */}
            <div className="overflow-y-auto px-6 py-5">
              <p className="text-sm text-muted-foreground">{active.summary}</p>

              <ol className="mt-4 space-y-3">
                {active.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{p}</span>
                  </li>
                ))}
              </ol>

              {active.note && (
                <p className="mt-4 rounded-xl bg-primary/10 px-4 py-3 text-sm">
                  <span className="font-bold">Lưu ý: </span>
                  {active.note}
                </p>
              )}
            </div>

            {/* Chân cửa sổ */}
            <div className="flex justify-end border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
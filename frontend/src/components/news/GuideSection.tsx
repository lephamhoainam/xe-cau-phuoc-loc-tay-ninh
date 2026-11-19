"use client";

import { useCallback, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { guides, DEFAULT_AUTHOR } from "../../lib/data";
import type { GuideItem } from "../../lib/types";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import GuideModal from "./GuideModal";

export default function GuideSection() {
  const [active, setActive] = useState<GuideItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  if (guides.length === 0) return null;

  return (
    <Section>
      <SectionTitle
        eyebrow="Cẩm nang"
        title="Cẩm nang nhanh cho người thuê xe cẩu"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.id}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            {/* Hàng trên: tag trái, thời gian đọc + số ý chính phải */}
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                {g.tag}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                {g.readTime && (
                  <>
                    <Clock className="h-3.5 w-3.5" />
                    {g.readTime}
                    <span aria-hidden>·</span>
                  </>
                )}
                {g.points.length} ý chính
              </span>
            </div>

            <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug transition group-hover:text-primary">
              {g.title}
            </h3>
            <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {g.summary}
            </p>

            {/* Chân card: tác giả trái, Đọc tiếp phải */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
              <span className="min-w-0 truncate text-sm text-muted-foreground">
                {g.author ?? DEFAULT_AUTHOR}
              </span>
              <button
              type="button"
              onClick={() => setActive(g)}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition hover:gap-1.5 hover:text-primary-hover"
            >
              Đọc tiếp
              <ArrowRight className="h-4 w-4" />
            </button>
            </div>
          </article>
        ))}
      </div>

      {active && <GuideModal guide={active} onClose={close} />}
    </Section>
  );
}
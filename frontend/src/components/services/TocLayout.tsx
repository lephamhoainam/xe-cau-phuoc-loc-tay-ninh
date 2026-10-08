"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "../../lib/site";
import type { Service } from "../../lib/types";
import Section from "../common/Section";
import ServiceBlocks from "./ServiceBlocks";

export default function TocLayout({ service }: { service: Service }) {
  const { topics } = service;
  const [active, setActive] = useState(topics[0]?.id);

  // Theo dõi mục đang đọc để sáng mục lục
  useEffect(() => {
    const els = topics
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [topics]);

  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Section>
      {/* Mobile: thanh chip cuộn ngang */}
      <div className="sticky top-16 z-10 -mx-4 mb-6 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        {topics.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-bold transition ${
              t.id === active
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
        {/* Desktop: mục lục + thẻ báo giá nhanh */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <nav className="rounded-xl border border-border bg-card p-4">
              <p className="px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Nội dung
              </p>
              <ol className="mt-3 space-y-1">
                {topics.map((t, i) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => go(t.id)}
                      className={`flex w-full gap-3 rounded-md border-l-4 px-3 py-2 text-left text-sm transition ${
                        t.id === active
                          ? "border-primary bg-primary/10 font-bold text-primary"
                          : "border-transparent hover:bg-muted"
                      }`}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {t.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rounded-xl bg-primary p-5 text-primary-foreground">
              <p className="font-extrabold">Cần báo giá nhanh?</p>
              <p className="mt-1 text-sm opacity-90">
                Gọi để được tư vấn tải trọng và báo giá rõ ràng.
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-white/90"
              >
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </aside>

        {/* Nội dung: mỗi mục một thẻ */}
        <div className="space-y-6">
          {topics.map((t, i) => (
            <section
              key={t.id}
              id={t.id}
              className="relative scroll-mt-32 overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8 lg:scroll-mt-24"
            >
              <span className="pointer-events-none absolute right-5 top-2 text-7xl font-extrabold text-primary/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative text-xs font-bold uppercase tracking-wide text-primary">
                Mục {i + 1}
              </p>
              <h2 className="relative mt-1 text-2xl font-extrabold leading-snug">
                {t.title}
              </h2>
              <div className="relative mt-5">
                <ServiceBlocks blocks={t.blocks} variant="tiles" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
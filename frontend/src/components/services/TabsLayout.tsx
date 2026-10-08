"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Service } from "../../lib/types";
import Section from "../common/Section";
import ServiceBlocks from "./ServiceBlocks";

const navBtn =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-bold transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40";

export default function TabsLayout({ service }: { service: Service }) {
  const { topics } = service;
  const [active, setActive] = useState(0);

  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        {/* Danh sách mục: dọc trên desktop, cuộn ngang trên mobile */}
        <div
          role="tablist"
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
        >
          {topics.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-left transition lg:shrink ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-extrabold ${
                  i === active ? "bg-white/20" : "bg-primary/10 text-primary"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-sm font-bold">{t.title}</span>
            </button>
          ))}
        </div>

        {/* Nội dung mục đang chọn */}
        <div>
          {topics.map((t, i) => (
            <div
              key={t.id}
              role="tabpanel"
              hidden={i !== active}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <h2 className="text-2xl font-extrabold">{t.title}</h2>
              <div className="mt-5">
                <ServiceBlocks blocks={t.blocks} variant="tiles" />
              </div>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => setActive(active - 1)}
              className={navBtn}
            >
              <ArrowLeft className="h-4 w-4" />
              Mục trước
            </button>
            <span className="text-sm text-muted-foreground">
              {active + 1} / {topics.length}
            </span>
            <button
              type="button"
              disabled={active === topics.length - 1}
              onClick={() => setActive(active + 1)}
              className={navBtn}
            >
              Mục sau
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
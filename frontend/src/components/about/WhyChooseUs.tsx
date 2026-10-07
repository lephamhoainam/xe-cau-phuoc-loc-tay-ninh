"use client";

import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "../../lib/site";
import { reasons } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);

  return (
    <Section>
      <SectionTitle
        eyebrow="Lý do nên chọn"
        title={`Tại sao chọn ${site.name}?`}
      />

      <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Trái: danh sách lý do */}
        <div role="tablist" className="flex flex-col gap-2 lg:col-span-2">
          {reasons.map((r, i) => {
            const isActive = i === active;
            return (
              <button
                key={r.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between gap-3 rounded-xl px-5 py-4 text-left font-bold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                <span>{r.title}</span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Phải: nội dung chi tiết */}
        <div className="lg:col-span-3">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              role="tabpanel"
              hidden={i !== active}
              className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-10"
            >
              <div>
                <h3 className="text-2xl font-extrabold leading-snug sm:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-4 max-w-xl text-muted-foreground sm:text-lg">
                  {r.desc}
                </p>
              </div>

              <a
                href={`tel:${site.phone}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                Gọi {site.phoneDisplay}
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
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

      <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:grid-cols-[2fr_3fr]">
        {/* Trái: danh sách lý do (mobile cuộn ngang) */}
        <div
          role="tablist"
          className="flex gap-2 overflow-x-auto border-b border-border bg-muted/50 p-2 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
        >
          {reasons.map((r, i) => {
            const isActive = i === active;
            return (
              <button
                key={r.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold transition lg:shrink lg:gap-3 lg:rounded-xl lg:px-4 lg:py-4 lg:text-base ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-foreground hover:bg-card"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold lg:h-8 lg:w-8 lg:rounded-lg lg:text-xs ${
                    isActive
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap lg:whitespace-normal">
                  {r.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phải: nội dung chi tiết */}
        <div className="relative">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              role="tabpanel"
              hidden={i !== active}
              className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden p-6 sm:p-10"
            >
              {/* Số lớn mờ làm điểm nhấn */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-4 select-none text-[8rem] font-extrabold leading-none text-primary/10 sm:text-[10rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <h3 className="text-2xl font-extrabold leading-snug sm:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-4 max-w-xl text-muted-foreground sm:text-lg">
                  {r.desc}
                </p>
              </div>

              <a
                href={`tel:${site.phone}`}
                className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:bg-primary-hover"
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
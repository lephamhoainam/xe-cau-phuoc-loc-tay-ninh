"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { vehicleTiers } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

type Tier = (typeof vehicleTiers)[number];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className={`relative rounded-2xl border bg-card p-6 text-center transition-colors ${
        open ? "border-primary/60 shadow-lg" : "border-border"
      }`}
    >
      {/* Số thứ tự */}
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-xl font-extrabold text-primary-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-6 text-lg font-extrabold leading-snug">{tier.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{tier.desc}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover"
      >
        {open ? "Thu gọn" : "Xem chi tiết"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Nội dung chi tiết: mở/đóng mượt bằng grid-rows */}
      <div
        id={panelId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-5 space-y-3 border-t border-border pt-5 text-left text-sm text-muted-foreground">
            {tier.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function VehiclesSection() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Đội xe"
        title="Chọn đúng tải trọng cho từng công việc"
      />
      <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-10">
        {vehicleTiers.map((t, i) => (
          <TierCard key={t.range} tier={t} index={i} />
        ))}
      </div>
    </Section>
  );
}
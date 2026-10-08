"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "../../lib/data";
import { takePendingService } from "../../lib/pendingService";
import EmptyState from "../common/EmptyState";
import FilterDropdown from "../common/FilterDropdown";
import Section from "../common/Section";
import ServiceBody from "./ServiceBody";
import ServiceHero from "./ServiceHero";
import ServicesOverview from "./ServicesOverview";
import ContactSection from "../home/ContactSection";

const ALL = "all";

const options = [
  { value: ALL, label: "Tất cả" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
];

export default function ServicesContent() {
  const [value, setValue] = useState(ALL);
  const topRef = useRef<HTMLDivElement>(null);
  const selected = services.find((s) => s.slug === value);

  // Vào từ trang chủ: chọn sẵn dịch vụ đã bấm
  useEffect(() => {
    const slug = takePendingService();
    if (slug && services.some((s) => s.slug === slug)) {
      setValue(slug);
      topRef.current?.scrollIntoView({ block: "start" });
    }
  }, []);

  function select(v: string) {
    setValue(v);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Bộ lọc */}
      <div ref={topRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-8">
        <FilterDropdown
          label="Loại dịch vụ"
          options={options}
          value={value}
          onChange={select}
        />
      </div>

      {/* Nội dung */}
      {selected ? (
        <>
          <ServiceHero service={selected} />
          <ServiceBody service={selected} />
        </>
      ) : services.length === 0 ? (
        <Section>
          <EmptyState
            title="Chưa có dịch vụ nào"
            description="Danh sách dịch vụ sẽ sớm được cập nhật."
          />
        </Section>
      ) : (
        <ServicesOverview onSelect={select} />
      )}

      <ContactSection />
    </>
  );
}
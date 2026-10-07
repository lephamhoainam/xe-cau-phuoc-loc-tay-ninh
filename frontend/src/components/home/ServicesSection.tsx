import Link from "next/link";
import { services } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function ServicesSection() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Dịch vụ"
        title="Giải pháp cẩu hàng cho mọi công trình"
        sub="Từ lắp đặt máy móc đến dựng kết cấu thép, chúng tôi lo trọn gói."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.title}
            href="/dich-vu"
            className="group overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary"
          >
            <Photo src={s.image} alt={s.title} className="aspect-[4/3]" />
            <div className="p-5">
              <h3 className="font-bold group-hover:text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
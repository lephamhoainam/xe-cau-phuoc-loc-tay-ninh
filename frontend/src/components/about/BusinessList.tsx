import { businesses } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function BusinessList() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Lĩnh vực hoạt động"
        title="Ngành nghề kinh doanh chính"
        sub="Các dịch vụ chúng tôi đang cung cấp cho nhà xưởng, công trình và dự án."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((b) => (
          <div
            key={b.title}
            className="overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary"
          >
            <Photo src={b.image} alt={b.title} className="aspect-[4/3]" />
            <div className="p-5">
              <h3 className="font-bold text-primary">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
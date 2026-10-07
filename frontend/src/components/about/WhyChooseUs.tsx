import { site } from "../../lib/site";
import { reasons } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function WhyChooseUs() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Lý do nên chọn"
        title={`Tại sao chọn ${site.name}?`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <div
            key={r.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-extrabold text-primary-foreground">
              {i + 1}
            </span>
            <h3 className="mt-4 font-bold">{r.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
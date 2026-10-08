import { site } from "../../lib/site";
import { aboutCompany } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function AboutCompany() {
  return (
    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Photo
          src={aboutCompany.image}
          alt={`Về ${site.name}`}
          className="aspect-[4/3] rounded-xl border border-border"
        />
        <div>
          <SectionTitle eyebrow="Về chúng tôi" title={site.name} />
          <div className="-mt-4 space-y-4 text-muted-foreground">
            {aboutCompany.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {aboutCompany.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {aboutCompany.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
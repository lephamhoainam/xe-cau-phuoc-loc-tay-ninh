import Link from "next/link";
import { site } from "../../lib/site";
import { images, about } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function AboutSection() {
  return (
    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Photo
          src={images.about}
          alt="Về chúng tôi"
          className="aspect-[4/3] rounded-xl border border-border"
        />
        <div>
          <SectionTitle eyebrow="Giới thiệu" title={`Về ${site.name}`} />
          <div className="-mt-4 space-y-4 text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {about.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/gioi-thieu"
            className="mt-8 inline-block font-semibold text-primary hover:text-primary-hover"
          >
            Tìm hiểu thêm →
          </Link>
        </div>
      </div>
    </Section>
  );
}
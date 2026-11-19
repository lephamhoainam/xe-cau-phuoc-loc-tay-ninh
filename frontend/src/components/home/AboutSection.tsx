import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "../../lib/site";
import { images, about } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function AboutSection() {
  return (
    <Section>
      <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-lg md:grid-cols-[5fr_7fr]">
        {/* Ảnh: ưu tiên chiều cao, kéo full theo chiều cao card */}
        <div className="relative h-80 sm:h-96 md:h-auto md:min-h-[26rem]">
          <Photo
            src={images.about}
            alt="Về chúng tôi"
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-md">
            {site.name}
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex flex-col justify-center p-6 md:p-10">
          <SectionTitle eyebrow="Giới thiệu" title={`Về ${site.name}`} />

          <div className="-mt-4 space-y-4 text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Thanh số liệu */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-xl border border-border">
            {about.stats.map((s) => (
              <div key={s.label} className="px-3 py-3.5 text-center md:px-4">
                <p className="text-2xl font-extrabold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/gioi-thieu"
            className="group mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-primary px-6 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Tìm hiểu thêm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
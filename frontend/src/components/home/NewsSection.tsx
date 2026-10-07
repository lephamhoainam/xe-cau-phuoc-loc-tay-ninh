import Link from "next/link";
import { news } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function NewsSection() {
  return (
    <Section>
      <div className="flex items-end justify-between">
        <SectionTitle eyebrow="Tin tức" title="Kinh nghiệm và cẩm nang" />
        <Link
          href="/tin-tuc"
          className="mb-10 hidden font-semibold text-primary hover:text-primary-hover sm:block"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary"
          >
            <Photo src={n.image} alt={n.title} className="aspect-[16/10]" />
            <div className="p-5">
              <p className="text-xs text-muted-foreground">{n.date}</p>
              <h3 className="mt-2 font-bold group-hover:text-primary">
                {n.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
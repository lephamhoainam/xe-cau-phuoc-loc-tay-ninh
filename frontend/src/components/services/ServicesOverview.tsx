import { ArrowRight, Check, Weight } from "lucide-react";
import { services } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";

export default function ServicesOverview({
  onSelect,
}: {
  onSelect: (slug: string) => void;
}) {
  return (
    <Section>
      <div className="space-y-16">
        {services.map((s, i) => (
          <article
            key={s.slug}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Photo
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full"
              />
              {s.capacity && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
                  <Weight className="h-3.5 w-3.5 text-primary" />
                  {s.capacity}
                </span>
              )}
            </div>

            <div>
              <p className="text-5xl font-extrabold text-primary/20">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.intro}</p>

              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">
                  Nội dung gồm:
                </span>
                {s.topics.map((t) => (
                  <span
                    key={t.id}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold"
                  >
                    {t.title}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelect(s.slug)}
                className="group mt-6 inline-flex items-center gap-2 font-bold text-primary transition hover:text-primary-hover"
              >
                Xem chi tiết
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
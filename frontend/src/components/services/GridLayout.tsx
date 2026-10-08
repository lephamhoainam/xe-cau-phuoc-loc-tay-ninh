import type { Service } from "../../lib/types";
import Section from "../common/Section";
import ServiceBlocks from "./ServiceBlocks";

export default function GridLayout({ service }: { service: Service }) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        {service.topics.map((t, i) => (
          <article
            key={t.id}
            className="rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">
                {i + 1}
              </span>
              <h2 className="text-xl font-extrabold leading-snug">{t.title}</h2>
            </div>
            <div className="mt-5">
              <ServiceBlocks blocks={t.blocks} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
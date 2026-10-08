import type { Service } from "../../lib/types";
import Section from "../common/Section";
import ServiceBlocks from "./ServiceBlocks";

export default function StepsLayout({ service }: { service: Service }) {
  const { topics } = service;

  return (
    <Section>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          Quy trình
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">
          Quy trình thực hiện gồm {topics.length} bước
        </h2>
      </div>

      <ol className="relative mx-auto max-w-5xl">
        {/* Đường thời gian */}
        <span className="absolute bottom-0 left-5 top-0 w-px bg-border md:left-1/2" />

        {topics.map((t, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={t.id}
              className="relative pb-10 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
            >
              {/* Nút số trên đường */}
              <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-extrabold text-primary-foreground ring-4 ring-background md:left-1/2 md:-translate-x-1/2">
                {i + 1}
              </span>

              {/* Thẻ nội dung */}
              <article
                className={`rounded-xl border border-border bg-card p-6 md:row-start-1 ${
                  left ? "md:col-start-1" : "md:col-start-2"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Bước {i + 1}
                </p>
                <h3 className="mt-1 text-xl font-extrabold leading-snug">
                  {t.title}
                </h3>
                <div className="mt-4">
                  <ServiceBlocks blocks={t.blocks} />
                </div>
              </article>

              {/* Số lớn mờ ở phía đối diện (desktop) */}
              <div
                aria-hidden
                className={`hidden text-8xl font-extrabold leading-none text-primary/10 md:row-start-1 md:block ${
                  left ? "md:col-start-2 text-left" : "md:col-start-1 text-right"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
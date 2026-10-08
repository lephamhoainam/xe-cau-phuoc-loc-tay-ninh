import type { Service, ServiceBlock } from "../../lib/types";
import Section from "../common/Section";
import ServiceBlocks from "./ServiceBlocks";

type NoteBlock = Extract<ServiceBlock, { type: "note" }>;

export default function ShowcaseLayout({ service }: { service: Service }) {
  const total = service.topics.length;

  return (
    <Section>
      <div className="space-y-6">
        {service.topics.map((t, i) => {
          // Đoạn văn đầu = mô tả, khối note = chân thẻ, còn lại = danh sách
          const [first, ...others] = t.blocks;
          const lead = first?.type === "paragraph" ? first : null;
          const rest = lead ? others : t.blocks;
          const notes = rest.filter((b): b is NoteBlock => b.type === "note");
          const body = rest.filter((b) => b.type !== "note");

          return (
            <article
              key={t.id}
              className="grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[15rem_1fr]"
            >
              {/* Khối nhấn bên trái */}
              <div className="flex min-h-36 flex-col justify-between bg-primary/10 p-5">
                <span className="w-fit rounded-md bg-card px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {service.title}
                </span>
                <span className="text-7xl font-extrabold leading-none text-primary/30 md:text-8xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Nội dung bên phải */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-extrabold leading-snug">
                    {t.title}
                  </h2>
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                    Mục {i + 1}/{total}
                  </span>
                </div>

                {lead && (
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {lead.text}
                  </p>
                )}

                {body.length > 0 && (
                  <div className="mt-5">
                    <ServiceBlocks blocks={body} />
                  </div>
                )}

                {notes.length > 0 && (
                  <div className="mt-6 rounded-lg bg-muted p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Lưu ý
                    </p>
                    {notes.map((n, k) => (
                      <p key={k} className="mt-1 text-sm">
                        {n.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
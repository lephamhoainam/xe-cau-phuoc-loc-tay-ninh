import { Plus } from "lucide-react";
import { faqs } from "../../lib/data";
import EmptyState from "../common/EmptyState";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function FaqSection() {
  return (
    <Section>
      <SectionTitle eyebrow="Hỏi đáp" title="Câu hỏi thường gặp" />

      {faqs.length === 0 ? (
        <EmptyState title="Chưa có câu hỏi nào" />
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <details
              key={f.id}
              open={i === 0}
              className="group rounded-2xl border border-border bg-card transition hover:border-primary/50 open:border-primary/60 open:shadow-lg"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-extrabold text-primary transition group-open:bg-primary group-open:text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-bold leading-snug">{f.question}</h3>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </summary>

              <div className="px-4 pb-5 md:px-5 md:pl-[4.75rem]">
                <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      )}
    </Section>
  );
}
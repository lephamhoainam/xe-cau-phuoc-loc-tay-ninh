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
            <article
              key={f.id}
              className="grid gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-primary md:grid-cols-[2fr_3fr] md:gap-0 md:p-0"
            >
              {/* Trái: số thứ tự + câu hỏi */}
              <div className="flex items-start gap-4 md:border-r md:border-border md:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="pt-1.5 font-bold leading-snug">{f.question}</h3>
              </div>

              {/* Phải: câu trả lời */}
              <p className="text-sm leading-relaxed text-muted-foreground md:p-6">
                {f.answer}
              </p>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
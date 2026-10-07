import { workSteps } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function WorkProcess() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Cách chúng tôi làm việc"
        title="Quy trình làm việc"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {workSteps.map((s, i) => (
          <div key={s.title} className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
              {i + 1}
            </div>
            <h3 className="mt-4 font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
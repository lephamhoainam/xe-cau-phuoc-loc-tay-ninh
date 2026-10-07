import { vehicles } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function VehiclesSection() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Đội xe"
        title="Chọn đúng tải trọng cho từng công việc"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((v) => (
          <div
            key={v.range}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <Photo
              src={v.image}
              alt={`Xe cẩu ${v.range}`}
              className="aspect-[4/3]"
            />
            <div className="p-5">
              <p className="text-xl font-extrabold text-primary">{v.range}</p>
              <p className="mt-2 text-sm text-muted-foreground">{v.use}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
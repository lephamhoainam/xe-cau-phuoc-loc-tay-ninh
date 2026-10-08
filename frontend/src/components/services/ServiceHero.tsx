import { Check, Phone, Weight } from "lucide-react";
import { site } from "../../lib/site";
import type { Service } from "../../lib/types";
import Photo from "../common/Photo";
import Section from "../common/Section";

export default function ServiceHero({ service }: { service: Service }) {
  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            Dịch vụ
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-muted-foreground">{service.intro}</p>

          <ul className="mt-5 space-y-2">
            {service.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {p}
              </li>
            ))}
          </ul>

          <a
            href={`tel:${site.phone}`}
            className="mt-7 inline-flex items-center gap-2 rounded-md border border-primary px-7 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Photo
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full"
          />
          {service.capacity && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
              <Weight className="h-3.5 w-3.5 text-primary" />
              {service.capacity}
            </span>
          )}
        </div>
      </div>
    </Section>
  );
}
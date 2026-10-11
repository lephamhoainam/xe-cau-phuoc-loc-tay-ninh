import { contactDetails } from "../../lib/data";
import type { ContactIconName } from "../../lib/types";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

function Icon({ name, className = "h-6 w-6" }: { name: ContactIconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}

function Arrow() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type Detail = (typeof contactDetails)[number];

function Row({ d, children, className }: { d: Detail; children: React.ReactNode; className: string }) {
  return d.href ? (
    <a
      href={d.href}
      target={d.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={className}
    >
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

export default function ContactInfoGrid() {
  const items = contactDetails.filter((d) => d.value);
  const featured = items.find((d) => d.icon === "phone") ?? items[0];
  const rest = items.filter((d) => d !== featured);

  return (
    <Section>
      <SectionTitle
        eyebrow="Thông tin"
        title="Các cách liên hệ với chúng tôi"
        sub="Chọn cách thuận tiện nhất, chúng tôi phản hồi nhanh nhất có thể."
      />

      <div className="mx-auto max-w-3xl space-y-4">
        {/* Banner nổi bật */}
        {featured && (
          <Row
            d={featured}
            className="group flex items-center gap-5 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg transition hover:shadow-xl sm:p-8"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Icon name={featured.icon} className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                {featured.label}
              </p>
              <p className="mt-1 break-words text-2xl font-extrabold sm:text-4xl">
                {featured.value}
              </p>
              {featured.hint && (
                <p className="mt-1 text-sm opacity-80">{featured.hint}</p>
              )}
            </div>
            {featured.href && (
              <svg
                className="hidden h-6 w-6 shrink-0 transition group-hover:translate-x-1 sm:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </Row>
        )}

        {/* Danh sách dọc */}
        {rest.length > 0 && (
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {rest.map((d) => (
              <Row
                key={d.label}
                d={d}
                className={`group flex items-center gap-4 p-5 transition sm:px-6 ${
                  d.href ? "hover:bg-muted/50" : ""
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {d.label}
                  </p>
                  <p className="mt-0.5 break-words text-base font-bold sm:text-lg">
                    {d.value}
                  </p>
                  {d.hint && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{d.hint}</p>
                  )}
                </div>
                {d.href && <Arrow />}
              </Row>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
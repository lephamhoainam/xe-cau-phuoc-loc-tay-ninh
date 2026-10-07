import { site } from "../../lib/site";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a
        href={`https://zalo.me/${site.zalo}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-card px-5 py-3 text-sm font-bold text-primary shadow-lg ring-1 ring-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Zalo
      </a>
      <a
        href={`tel:${site.phone}`}
        className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-primary-hover"
      >
        Gọi ngay
      </a>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "../../lib/site";
import type { NewsItem } from "../../lib/types";

function PostList({ title, items }: { title: string; items: NewsItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-muted p-5">
      <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-foreground">
        <span className="h-4 w-1 rounded-full bg-primary" />
        {title}
      </h2>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="group flex items-start gap-3">
              {/* Ảnh + tag nằm trên ảnh */}
              <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-background">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
                <span className="absolute left-1.5 top-1.5 max-w-[calc(100%-12px)] truncate rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </span>

              {/* Tiêu đề + người đăng */}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block text-sm font-semibold leading-snug text-foreground transition group-hover:text-primary">
                  {item.title}
                </span>
                <span className="mt-1.5 block truncate text-xs text-muted-foreground">
                  {item.author ?? "Quản trị viên"}
                  <span aria-hidden className="mx-1">
                    ·
                  </span>
                  {item.date}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NewDetailSidebar({
  items,
  currentId,
}: {
  items: NewsItem[];
  currentId?: number;
}) {
  const others = items.filter((item) => item.id !== currentId);
  const featured = others.filter((item) => item.featured).slice(0, 4);
  const latest = others.slice(0, 3);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Gọi tư vấn */}
      <section className="rounded-2xl border border-border bg-muted p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Phone className="h-5 w-5" />
        </span>
        <p className="mt-3 text-base font-extrabold text-foreground">
          Cần thuê xe cẩu?
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Gọi ngay để được tư vấn và báo giá nhanh nhất.
        </p>
        <a
          href={`tel:${site.phone}`}
          className="mt-4 flex items-center justify-center rounded-full border border-primary px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/10"
        >
          {site.phoneDisplay}
        </a>
      </section>

      <PostList title="Bài viết nổi bật" items={featured} />
      <PostList title="Bài viết mới" items={latest} />
    </aside>
  );
}
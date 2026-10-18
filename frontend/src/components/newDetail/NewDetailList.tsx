import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { NewsItem } from "../../lib/types";

export default function NewDetailList({
  items,
  title,
}: {
  items: NewsItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border pt-10">
      <div className="flex items-end justify-between gap-4">
        {title && (
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
        )}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="h-full">
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-muted transition hover:border-primary"
            >
              {/* Ảnh + tag nằm trên ảnh */}
              <span className="relative block aspect-video shrink-0 overflow-hidden bg-background">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-3 top-3 max-w-[calc(100%-24px)] truncate rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </span>

              {/* Nội dung: tiêu đề và mô tả luôn giữ chỗ 2 dòng */}
              <span className="flex flex-1 flex-col p-5">
                <span className="line-clamp-2 block min-h-[3.1rem] text-lg font-bold leading-snug text-foreground transition group-hover:text-primary">
                  {item.title}
                </span>
                <span className="mt-2 line-clamp-2 block min-h-[2.85rem] text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </span>

                {/* Meta: tên + ngày bên trái, thời gian đọc bên phải */}
                <span className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="min-w-0 truncate">
                    {item.author ?? "Quản trị viên"}
                    <span aria-hidden className="mx-1.5">
                      ·
                    </span>
                    {item.date}
                  </span>
                  {item.readTime && (
                    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5" />
                      {item.readTime}
                    </span>
                  )}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
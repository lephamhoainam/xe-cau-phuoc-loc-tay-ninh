import Link from "next/link";
import Image from "next/image";
import { news } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import NewsMeta from "./NewsMeta";

export default function NewsFeatured() {
  // Ưu tiên bài đánh dấu featured, thiếu thì lấy thêm bài khác cho đủ 5
  const flagged = news.filter((n) => n.featured);
  const rest = news.filter((n) => !n.featured);
  const items = [...flagged, ...rest].slice(0, 5);
  const [main, ...others] = items;

  if (!main) return null;

  return (
    <Section>
      <SectionTitle eyebrow="Tin tức" title="Tin tức nổi bật" />

      <div
        className={`grid gap-4 ${others.length > 0 ? "lg:grid-cols-5" : ""}`}
      >
        {/* Card lớn bên trái: ảnh full card, chữ đè lên ảnh */}
        <Link
          href={main.href}
          className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-primary text-white ${
            others.length > 0 ? "lg:col-span-3" : ""
          }`}
        >
          {main.image && (
            <Image
              src={main.image}
              alt={main.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Lớp phủ tối dần xuống dưới để chữ dễ đọc */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          <div className="relative p-6 sm:p-8">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
              {main.tag}
            </span>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
              {main.title}
            </h3>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm text-white/85 sm:text-base">
              {main.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <NewsMeta item={main} className="text-white/80" />
              <span className="font-bold underline underline-offset-4">
                Đọc tin tức
              </span>
            </div>
          </div>
        </Link>

        {/* 4 card nhỏ bên phải */}
        {others.length > 0 && (
          <div className="flex flex-col gap-3 lg:col-span-2">
            {others.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="group flex flex-1 flex-col justify-center rounded-2xl border border-l-4 border-border border-l-primary/40 bg-card px-5 py-4 transition hover:border-l-primary"
              >
                <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {n.tag}
                </span>
                <h3 className="mt-2 line-clamp-2 font-bold leading-snug group-hover:text-primary">
                  {n.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {n.excerpt}
                </p>
                <NewsMeta
                  item={n}
                  className="mt-2 text-xs text-muted-foreground"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
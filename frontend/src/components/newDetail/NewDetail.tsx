import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import type { NewsDetail } from "../../lib/types";

export default function NewDetail({ article }: { article: NewsDetail }) {
  const {
    tag,
    title,
    excerpt,
    date,
    author,
    readTime,
    image,
    images,
    intro,
    sections,
  } = article;
  const authorName = author ?? "Quản trị viên";
  const extraImages = images?.slice(1) ?? [];
  const lastIndex = sections.length - 1;

  return (
    <article className="min-w-0">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="transition hover:text-primary">
          Trang chủ
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tin-tuc" className="transition hover:text-primary">
          Tin tức
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">{tag}</span>
      </nav>

      {/* Tiêu đề + đoạn dẫn */}
      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.5rem]">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {excerpt}
      </p>

      {/* Meta */}
      {readTime && (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>
      )}

      {/* Tác giả */}
      <div className="mt-5 flex items-center gap-3 border-y border-border py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
          {authorName.charAt(0)}
        </span>
        <div className="text-sm leading-tight">
          <p className="text-xs text-muted-foreground">Viết bởi</p>
          <p className="font-bold text-foreground">{authorName}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Ngày đăng: {date}</p>
        </div>
      </div>

      {/* Ảnh bìa */}
      {image && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Mục lục */}
      {sections.length > 0 && (
        <details open className="group mt-8 rounded-xl border border-border bg-muted">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-xs font-extrabold uppercase tracking-widest text-foreground [&::-webkit-details-marker]:hidden">
            Trong bài viết này
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <ol className="space-y-2.5 border-t border-border px-5 py-4 text-sm">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-3 font-semibold text-foreground transition hover:text-primary"
                >
                  <span className="w-5 shrink-0 text-primary">{i + 1}.</span>
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </details>
      )}

      {/* Thân bài */}
      <div className="mt-8 text-[17px] leading-8 text-foreground">
        {intro && <p>{intro}</p>}

        {sections.map((section, i) => {
          const isLast = i === lastIndex;

          return (
            <section
              key={section.id}
              id={section.id}
              className={
                isLast
                  ? "mt-10 scroll-mt-24 rounded-xl border-l-4 border-primary bg-muted p-6"
                  : "mt-10 scroll-mt-24"
              }
            >
              {isLast && (
                <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-primary">
                  Tóm lại
                </p>
              )}
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-5">
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Ảnh phụ */}
      {extraImages.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {extraImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={img.src}
                alt={img.alt ?? title}
                fill
                sizes="(min-width: 768px) 220px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
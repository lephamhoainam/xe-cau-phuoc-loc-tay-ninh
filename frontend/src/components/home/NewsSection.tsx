import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { news } from "../../lib/data";
import EmptyState from "../common/EmptyState";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function NewsSection() {
  const [featured, ...rest] = news;
  const sideItems = rest.slice(0, 4);

  return (
    <Section>
      <div className="flex items-end justify-between">
        <SectionTitle eyebrow="Tin tức" title="Kinh nghiệm và cẩm nang" />
        {featured && (
          <Link
            href="/tin-tuc"
            className="mb-10 hidden font-semibold text-primary hover:text-primary-hover sm:block"
          >
            Xem tất cả →
          </Link>
        )}
      </div>

      {!featured ? (
        <EmptyState
          title="Chưa có bài viết nào"
          description="Các bài viết mới sẽ sớm được cập nhật. Bạn quay lại sau nhé."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Card lớn bên trái */}
          <Link
            href={featured.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary"
          >
            <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:min-h-[180px] lg:flex-1">
              <Photo
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full"
              />
              {featured.tag && (
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {featured.tag}
                </span>
              )}
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-muted-foreground">{featured.date}</p>
              <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug group-hover:text-primary">
                {featured.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Đọc tin tức
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* 4 card nhỏ bên phải */}
          <div className="flex flex-col gap-3">
            {sideItems.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="group flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 transition hover:border-primary"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                  <Photo
                    src={n.image}
                    alt={n.title}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {n.tag && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {n.tag}
                      </span>
                    )}
                    <span className="truncate text-xs text-muted-foreground">
                      {n.date}
                    </span>
                  </div>

                  <h3 className="mt-1.5 line-clamp-1 font-bold group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                    {n.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
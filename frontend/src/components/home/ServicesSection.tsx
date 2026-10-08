import Link from "next/link";
import { ArrowRight, Check, Phone, Weight } from "lucide-react";
import { services } from "../../lib/data";
import { site } from "../../lib/site";
import EmptyState from "../common/EmptyState";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import ServiceLink from "../services/ServiceLink";

export default function ServicesSection({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  const hasMore = limit ? services.length > limit : false;

  return (
    <Section>
      <div className="flex items-end justify-between">
        <SectionTitle
          eyebrow="Dịch vụ"
          title="Dịch vụ cẩu hàng theo từng nhu cầu công trình"
          sub="Từ lắp đặt máy móc đến dựng kết cấu thép, chúng tôi tư vấn đúng loại xe và tải trọng, lo trọn gói từ khảo sát đến thi công."
        />
        {hasMore && (
          <Link
            href="/dich-vu"
            className="mb-10 hidden shrink-0 font-semibold text-primary hover:text-primary-hover sm:block"
          >
            Xem tất cả dịch vụ →
          </Link>
        )}
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="Chưa có dịch vụ nào"
          description="Danh sách dịch vụ sẽ sớm được cập nhật."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <ServiceLink
              key={s.slug}
              slug={s.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-200 hover:-translate-y-1 hover:border-primary"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Photo
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
                />
                {s.capacity && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
                    <Weight className="h-3.5 w-3.5 text-primary" />
                    {s.capacity}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {s.desc}
                </p>

                {s.points && s.points.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {s.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between border-t border-border pt-4 text-sm font-bold text-primary">
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </ServiceLink>
          ))}

          {/* Ô kêu gọi cuối lưới */}
          <div className="flex flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground">
            <div>
              <h3 className="text-xl font-extrabold leading-snug">
                Cần dịch vụ khác?
              </h3>
              <p className="mt-2 text-sm opacity-90">
                Mô tả công việc, tải trọng và địa điểm, chúng tôi tư vấn loại xe
                cẩu phù hợp và báo giá rõ ràng.
              </p>
            </div>
            <a
              href={`tel:${site.phone}`}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-white/90"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </Section>
  );
}
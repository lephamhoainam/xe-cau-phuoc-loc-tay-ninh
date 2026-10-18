import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { site } from "../../lib/site";
import { images, heroCard, heroTrust } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";

export default function HeroSection() {
  return (
    <Section className="py-8 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-12">
        <div className="flex flex-col justify-center">
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cho thuê xe cẩu · Tây Ninh
          </p>

          <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Cần xe cẩu? Có xe ngay,
            <span className="text-primary"> đúng tải trọng, đúng giá.</span>
          </h1>

          <p className="mt-5 max-w-xl text-muted-foreground">
            Từ 5 tấn đến 100 tấn, chúng tôi tư vấn đúng loại xe cho công trình
            của bạn và báo giá rõ ràng trước khi thi công.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:bg-primary-hover sm:px-7"
            >
              <Phone className="h-4 w-4" />
              Gọi báo giá
            </a>
            <Link
              href="/dich-vu"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3.5 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground sm:px-7"
            >
              Xem dịch vụ
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            {heroTrust.map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="font-medium leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ảnh + thanh kính mờ nằm bên trong ảnh */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border md:aspect-auto md:min-h-[26rem]">
          <Photo
            src={images.hero}
            alt="Xe cẩu đang làm việc"
            className="absolute inset-0 h-full w-full"
          />

          {/* Lớp gradient đáy giúp chữ dễ đọc */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
          />

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 shadow-lg backdrop-blur-md backdrop-saturate-150 md:inset-x-5 md:bottom-5 md:gap-6 md:px-6 md:py-3">
            <div className="shrink-0">
              <p className="text-[11px] font-medium text-white/80 md:text-xs">
                {heroCard.label}
              </p>
              <p className="text-2xl font-extrabold leading-tight text-primary drop-shadow-sm md:text-3xl">
                {heroCard.value}
              </p>
            </div>
            <p className="line-clamp-2 border-l border-white/25 pl-4 text-[11px] leading-snug text-white/80 md:pl-6 md:text-xs">
              {heroCard.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
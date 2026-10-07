import Link from "next/link";
import { site } from "../../lib/site";
import { images, heroCard, heroTrust } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";

export default function HeroSection() {
  return (
    <Section className="py-16 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Cho thuê xe cẩu · Tây Ninh
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Cần xe cẩu? Có xe ngay,
            <span className="text-primary"> đúng tải trọng, đúng giá.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Từ 5 tấn đến 100 tấn, chúng tôi tư vấn đúng loại xe cho công trình
            của bạn và báo giá rõ ràng trước khi thi công.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${site.phone}`}
              className="rounded-md bg-primary px-7 py-3 font-bold text-primary-foreground transition hover:bg-primary-hover"
            >
              Gọi báo giá
            </a>
            <Link
              href="/dich-vu"
              className="rounded-md border border-primary px-7 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Xem dịch vụ
            </Link>
            <a
              href={`https://zalo.me/${site.zalo}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Hoặc nhắn Zalo
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm">
            {heroTrust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative pb-8">
          <Photo
            src={images.hero}
            alt="Xe cẩu đang làm việc"
            className="aspect-[4/3] rounded-xl border border-border"
          />
          <div className="absolute bottom-0 left-4 rounded-lg border border-border bg-card p-5 shadow-xl md:left-[-1.5rem]">
            <p className="text-xs text-muted-foreground">{heroCard.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              {heroCard.value}
            </p>
            <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">
              {heroCard.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
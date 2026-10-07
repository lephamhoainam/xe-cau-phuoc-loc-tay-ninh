import Link from "next/link";
import { site } from "../lib/site";
import {
  images,
  heroCard,
  heroTrust,
  about,
  services,
  vehicles,
  news,
  contactInfo,
} from "../lib/data";
import Photo from "../components/Photo";

function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="border-b border-border bg-gradient-to-b from-muted to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
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
      </section>

      {/* ===== 2. GIỚI THIỆU ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Photo
            src={images.about}
            alt="Về chúng tôi"
            className="aspect-[4/3] rounded-xl border border-border"
          />
          <div>
            <SectionTitle eyebrow="Giới thiệu" title={`Về ${site.name}`} />
            <div className="-mt-4 space-y-4 text-muted-foreground">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-primary md:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/gioi-thieu"
              className="mt-8 inline-block font-semibold text-primary hover:text-primary-hover"
            >
              Tìm hiểu thêm →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3. DỊCH VỤ ===== */}
      <section className="border-y border-border bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            eyebrow="Dịch vụ"
            title="Giải pháp cẩu hàng cho mọi công trình"
            sub="Từ lắp đặt máy móc đến dựng kết cấu thép, chúng tôi lo trọn gói."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.title}
                href="/dich-vu"
                className="group overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Photo src={s.image} alt={s.title} className="aspect-[4/3]" />
                <div className="p-5">
                  <h3 className="font-bold group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. LOẠI XE ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle
          eyebrow="Đội xe"
          title="Chọn đúng tải trọng cho từng công việc"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v) => (
            <div
              key={v.range}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <Photo
                src={v.image}
                alt={`Xe cẩu ${v.range}`}
                className="aspect-[4/3]"
              />
              <div className="p-5">
                <p className="text-xl font-extrabold text-primary">{v.range}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 5. TIN TỨC ===== */}
      <section className="border-y border-border bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between">
            <SectionTitle eyebrow="Tin tức" title="Kinh nghiệm và cẩm nang" />
            <Link
              href="/tin-tuc"
              className="mb-10 hidden font-semibold text-primary hover:text-primary-hover sm:block"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <Link
                key={n.title}
                href={n.href}
                className="group overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Photo src={n.image} alt={n.title} className="aspect-[16/10]" />
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{n.date}</p>
                  <h3 className="mt-2 font-bold group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {n.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. LIÊN HỆ ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Liên hệ"
              title="Cần thuê xe cẩu? Gọi ngay để nhận báo giá"
              sub="Cho chúng tôi biết tải trọng, địa điểm và thời gian, chúng tôi phản hồi nhanh nhất có thể."
            />
            <ul className="-mt-2 space-y-4">
              <li>
                <p className="text-xs text-muted-foreground">Hotline</p>
                <p className="text-2xl font-extrabold text-primary">
                  {site.phoneDisplay}
                </p>
              </li>
              {contactInfo.map((c) => (
                <li key={c.label}>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p>{c.value}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${site.phone}`}
                className="rounded-md bg-primary px-7 py-3 font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                Gọi ngay
              </a>
              <a
                href={`https://zalo.me/${site.zalo}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-primary px-7 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Chat Zalo
              </a>
            </div>
          </div>
          <Photo
            src={images.contact}
            alt="Liên hệ"
            className="aspect-[4/3] rounded-xl border border-border"
          />
        </div>
      </section>
    </>
  );
}

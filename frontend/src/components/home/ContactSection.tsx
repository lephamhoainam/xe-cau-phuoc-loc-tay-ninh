import { Phone, MessageCircle } from "lucide-react";
import { site } from "../../lib/site";
import { contactInfo } from "../../lib/data";
import Section from "../common/Section";

export default function ContactSection() {
  return (
    <Section>
      <div className="overflow-hidden rounded-2xl bg-primary text-primary-foreground">
        {/* Hàng chính: tiêu đề trái, hotline + nút phải */}
        <div className="flex flex-col gap-5 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
              Liên hệ
            </p>
            <h2 className="mt-1 text-xl font-extrabold leading-snug sm:text-2xl">
              Cần thuê xe cẩu? Gọi ngay để nhận báo giá
            </h2>
            <p className="mt-1 text-sm opacity-90">
              Cho chúng tôi biết tải trọng, địa điểm và thời gian, chúng tôi
              phản hồi nhanh nhất có thể.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 md:items-end">
            <a
              href={`tel:${site.phone}`}
              className="text-3xl font-extrabold tracking-tight hover:opacity-90 sm:text-4xl"
            >
              {site.phoneDisplay}
            </a>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-primary transition hover:bg-white/90"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay
              </a>
              <a
                href={`https://zalo.me/${site.zalo}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-5 py-2 text-sm font-bold transition hover:bg-white hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Dải thông tin liên hệ */}
        <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-white/20 bg-black/10 px-6 py-3 text-sm sm:px-8">
          {contactInfo.map((c) => (
            <li key={c.label}>
              <span className="opacity-70">{c.label}: </span>
              <span className="font-semibold">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
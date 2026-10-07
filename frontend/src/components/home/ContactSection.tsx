import { site } from "../../lib/site";
import { images, contactInfo } from "../../lib/data";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function ContactSection() {
  return (
    <Section>
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
    </Section>
  );
}
import { site } from "../../lib/site";
import { contactMapTitle } from "../../lib/data";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

export default function ContactMap() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address
  )}&output=embed`;

  return (
    <Section>
      <SectionTitle eyebrow="Bản đồ" title={contactMapTitle} sub={site.address} />
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          title="Bản đồ địa chỉ công ty"
          src={src}
          className="h-80 w-full md:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
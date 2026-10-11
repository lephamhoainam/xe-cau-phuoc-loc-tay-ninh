import type { Metadata } from "next";
import { pages } from "../../lib/data";
import PageBanner from "../../components/layouts/PageBanner";
import ContactInfoGrid from "../../components/contact/ContactInfoGrid";
import ContactMap from "../../components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ thuê xe cẩu Tây Ninh 5 – 100 tấn: gọi hotline, nhắn Zalo hoặc đến trực tiếp địa chỉ công ty để được báo giá nhanh.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner page={pages.lienHe} />
      <ContactInfoGrid />
      <ContactMap />
    </>
  );
}
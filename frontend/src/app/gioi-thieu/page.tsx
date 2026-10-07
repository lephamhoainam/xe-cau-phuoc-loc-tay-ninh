import type { Metadata } from "next";
import { pages } from "../../lib/data";
import PageBanner from "../../components/layouts/PageBanner";
import AboutCompany from "../../components/about/AboutCompany";
import BusinessList from "../../components/about/BusinessList";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import TeamSection from "../../components/about/TeamSection";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu đơn vị cho thuê xe cẩu Tây Ninh từ 5 đến 100 tấn: năng lực, ngành nghề và cam kết phục vụ.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner page={pages.gioiThieu} />
      <AboutCompany />
      <BusinessList />
      <WhyChooseUs />
      <TeamSection />
    </>
  );
}
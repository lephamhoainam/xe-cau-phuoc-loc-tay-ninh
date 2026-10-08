import { pages } from "../../lib/data";
import PageBanner from "../../components/layouts/PageBanner";
import ServicesContent from "../../components/services/ServicesContent";

export const metadata = { title: "Dịch vụ" };

export default function ServicesPage() {
  return (
    <>
      <PageBanner page={pages.dichVu} />
      <ServicesContent />
    </>
  );
}
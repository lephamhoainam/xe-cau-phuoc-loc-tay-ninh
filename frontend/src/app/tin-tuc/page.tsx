import { pages } from "../../lib/data";
import PageBanner from "../../components/layouts/PageBanner";
import NewPage from "../../components/news/NewPage";

export const metadata = { title: "Tin tức" };

export default function Page() {
  return (
    <>
      <PageBanner page={pages.tinTuc} />
      <NewPage />
    </>
  );
}
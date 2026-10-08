import GuideSection from "./GuideSection";
import NewsFeatured from "./NewsFeatured";
import NewsList from "./NewsList";

export default function NewPage() {
  return (
    <>
      <NewsFeatured />
      <NewsList />
      <GuideSection />
    </>
  );
}
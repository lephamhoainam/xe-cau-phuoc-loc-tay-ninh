import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewDetail from "../../../components/newDetail/NewDetail";
import NewDetailSidebar from "../../../components/newDetail/NewDetailSidebar";
import NewDetailList from "../../../components/newDetail/NewDetailList";
import { newsDetails, DEFAULT_AUTHOR } from "../../../lib/data";

const getSlug = (href: string) => href.split("/").pop() ?? "";

const findArticle = (slug: string) =>
  newsDetails.find((item) => getSlug(item.href) === slug);

// "01/10/2026" -> "2026-10-01"
const toISODate = (date: string) => {
  const [d, m, y] = date.split("/");
  return d && m && y ? `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` : undefined;
};

export function generateStaticParams() {
  return newsDetails.map((item) => ({ slug: getSlug(item.href) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  const { title, excerpt, image, tag, date } = article;
  const authorName = article.author ?? DEFAULT_AUTHOR;

  return {
    title,
    description: excerpt,
    authors: [{ name: authorName }],
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      publishedTime: toISODate(date),
      authors: [authorName],
      section: tag,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = findArticle(slug);
  if (!article) notFound();

  const related = newsDetails
    .filter((item) => item.id !== article.id && item.tag === article.tag)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <NewDetail article={article} />
        <NewDetailSidebar items={newsDetails} currentId={article.id} />
      </div>

      <div className="mt-14">
        <NewDetailList title="Bài viết liên quan" items={related} />
      </div>
    </div>
  );
}
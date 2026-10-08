import { DEFAULT_AUTHOR } from "../../lib/data";
import type { NewsItem } from "../../lib/types";

export default function NewsMeta({
  item,
  className,
}: {
  item: NewsItem;
  className?: string;
}) {
  const parts = [item.author ?? DEFAULT_AUTHOR, item.date, item.readTime].filter(
    Boolean,
  );
  return <p className={className}>{parts.join(" · ")}</p>;
}
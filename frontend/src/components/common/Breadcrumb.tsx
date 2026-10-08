import Link from "next/link";
import type { BreadcrumbItem } from "../../lib/types";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [{ label: "Trang chủ", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {all.map((item, index) => {
          const isLast = index === all.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span aria-current="page" className="font-semibold text-primary">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
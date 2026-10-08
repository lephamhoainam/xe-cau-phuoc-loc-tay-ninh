import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../../lib/types";

// Trả về dạng [1, "...", 4, 5, 6, "...", 10]
function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

const box =
  "inline-flex h-10 items-center justify-center rounded-md border text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-40";
const idle = "border-border bg-card hover:border-primary hover:text-primary";
const active = "border-primary bg-primary text-primary-foreground";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Phân trang"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
        className={`${box} ${idle} gap-1.5 px-3 sm:px-4`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Trước</span>
      </button>

      {/* Mobile: chỉ hiện "Trang x / y" */}
      <span className="px-3 text-sm text-muted-foreground sm:hidden">
        Trang{" "}
        <strong className="font-bold text-foreground">{currentPage}</strong> /{" "}
        {totalPages}
      </span>

      {/* Từ sm trở lên: hiện dãy số */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {getPages(currentPage, totalPages).map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 text-center text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Trang ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              className={`${box} w-10 ${p === currentPage ? active : idle}`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
        className={`${box} ${idle} gap-1.5 px-3 sm:px-4`}
      >
        <span className="hidden sm:inline">Sau</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
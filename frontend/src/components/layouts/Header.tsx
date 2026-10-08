"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { nav, site } from "../../lib/site";
import ThemeToggle from "../common/ThemeToggle";

function SearchBox({
  className = "",
  onDone,
}: {
  className?: string;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = q.trim();
    if (!keyword) return;
    router.push(`/tim-kiem?q=${encodeURIComponent(keyword)}`);
    setQ("");
    onDone?.();
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm kiếm xe cẩu, dịch vụ..."
        className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </form>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0" aria-label={site.name}>
          <Image
            src="/logo/logo-van-tai-phuoc-loc-tay-ninh.png"
            alt={site.name}
            width={160}
            height={48}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SearchBox className="hidden w-56 md:block" />

          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="rounded-md border border-border px-3 py-2 text-sm md:hidden"
            aria-label="Mở menu"
          >
            {open ? "Đóng" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="border-b border-border p-4">
            <SearchBox onDone={() => setOpen(false)} />
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border px-4 py-3 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
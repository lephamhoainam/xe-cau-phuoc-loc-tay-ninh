"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { news } from "../../lib/data";
import { useIsMobile } from "../../lib/useIsMobile";
import EmptyState from "../common/EmptyState";
import Pagination from "../common/Pagination";
import Photo from "../common/Photo";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import NewsMeta from "./NewsMeta";

const PAGE_SIZE = 6;
const PAGE_SIZE_MOBILE = 3;
const ALL = "Tất cả";

export default function NewsList() {
    const [tag, setTag] = useState(ALL);
    const [page, setPage] = useState(1);
    const topRef = useRef<HTMLDivElement>(null);
    const pageSize = useIsMobile() ? PAGE_SIZE_MOBILE : PAGE_SIZE;

    const tags = useMemo(
        () => [ALL, ...Array.from(new Set(news.map((n) => n.tag)))],
        [],
    );

    const filtered = tag === ALL ? news : news.filter((n) => n.tag === tag);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    // Đổi cỡ màn hình có thể làm số trang giảm, nên kẹp lại trang hiện tại
    const current = Math.min(page, totalPages);
    const items = filtered.slice((current - 1) * pageSize, current * pageSize);

    const changeTag = (t: string) => {
        setTag(t);
        setPage(1);
    };

    const changePage = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <Section>
            <div ref={topRef} className="scroll-mt-24">
                <SectionTitle eyebrow="Tin tức mới nhất" title="Tất cả bài viết" />
            </div>

            {news.length === 0 ? (
                <EmptyState
                    title="Chưa có bài viết nào"
                    description="Các bài viết mới sẽ sớm được cập nhật. Bạn quay lại sau nhé."
                />
            ) : (
                <>
                    {/* Tab lọc theo tag */}
                    <div
                        role="tablist"
                        className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {tags.map((t) => (
                            <button
                                key={t}
                                type="button"
                                role="tab"
                                aria-selected={t === tag}
                                onClick={() => changeTag(t)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${t === tag
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Lưới card có ảnh */}
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((n, idx) => (
                            <li
                                key={n.id}
                                className={`flex ${idx >= PAGE_SIZE_MOBILE ? "max-sm:hidden" : ""}`}
                            >
                                <Link
                                    href={n.href}
                                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                                >
                                    {/* Ảnh + tag đè góc */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                                        {n.image && (
                                            <Photo
                                                src={n.image}
                                                alt={n.title}
                                                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                                            {n.tag}
                                        </span>
                                    </div>

                                    {/* Nội dung */}
                                    <div className="flex flex-1 flex-col p-5">
                                        <NewsMeta
                                            item={n}
                                            className="text-xs text-muted-foreground"
                                        />
                                        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug group-hover:text-primary">
                                            {n.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                                            {n.excerpt}
                                        </p>
                                        <span className="mt-4 border-t border-border pt-3 text-sm font-bold text-primary">
                                            Đọc tin tức
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Pagination
                        currentPage={current}
                        totalPages={totalPages}
                        onPageChange={changePage}
                    />
                </>
            )}
        </Section>
    );
}
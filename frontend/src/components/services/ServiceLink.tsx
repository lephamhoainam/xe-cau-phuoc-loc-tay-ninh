"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { setPendingService } from "../../lib/pendingService";

type Props = { slug: string; className?: string; children: ReactNode };

export default function ServiceLink({ slug, className, children }: Props) {
  return (
    <Link
      href="/dich-vu"
      className={className}
      onClick={() => setPendingService(slug)}
    >
      {children}
    </Link>
  );
}
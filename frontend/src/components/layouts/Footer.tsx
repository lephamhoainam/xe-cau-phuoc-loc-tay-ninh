import Link from "next/link";
import Image from "next/image";
import { nav, site } from "../../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-4">
        {/* Logo (trái) + menu pill (phải) */}
        <div className="flex flex-col items-start justify-between gap-8 py-12 lg:flex-row lg:items-center">
          <Link
            href="/"
            className="inline-flex flex-col items-start gap-2 lg:items-center"
          >
            <Image
              src="/logo/logo-van-tai-phuoc-loc-tay-ninh.png"
              alt=""
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <span className="text-lg font-extrabold leading-tight text-foreground">
              {site.name}
              <span className="text-primary">.</span>
            </span>
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="hidden h-px w-8 shrink-0 bg-border lg:block" />
              {site.slogan}
              <span className="hidden h-px w-8 shrink-0 bg-border lg:block" />
            </span>
          </Link>

          <nav aria-label="Liên kết chân trang">
            <ul className="flex flex-wrap justify-start gap-2 lg:justify-center lg:gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-foreground transition hover:border-primary hover:text-primary lg:px-4 lg:py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Liên hệ + bản quyền */}
        <div className="border-t border-border py-8">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <span className="font-bold text-foreground">Hotline: </span>
                {site.phoneDisplay}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>
                <span className="font-bold text-foreground">Địa chỉ: </span>
                {site.address}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{site.hours}</span>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
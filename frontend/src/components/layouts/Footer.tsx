import Link from "next/link";
import Image from "next/image";
import { nav, site } from "../../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1.2fr]">
        {/* Thương hiệu */}
        <div>
          <Link href="/" className="inline-flex flex-col items-start gap-2">
            <Image
              src="/logo/logo-van-tai-phuoc-loc-tay-ninh.png"
              alt=""
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <span className="text-lg font-extrabold leading-tight text-primary">
              {site.name}
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.slogan}
          </p>
        </div>

        {/* Liên kết */}
        <div>
          <p className="font-bold">Liên kết</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <p className="font-bold">Liên hệ</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              Hotline:{" "}
              <span className="font-semibold text-foreground">
                {site.phoneDisplay}
              </span>
            </li>
            <li>Địa chỉ: {site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
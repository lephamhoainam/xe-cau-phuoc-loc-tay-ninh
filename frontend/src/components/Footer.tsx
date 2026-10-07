import Link from "next/link";
import { nav, site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-primary">{site.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">{site.slogan}</p>
        </div>

        <div>
          <p className="font-bold">Liên kết</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold">Liên hệ</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Hotline: {site.phoneDisplay}</li>
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

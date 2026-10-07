import Link from "next/link";
import { site } from "../../lib/site";

export const metadata = {
  title: "Sắp ra mắt",
  robots: { index: false },
};

export default function ComingSoon() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Sắp ra mắt
      </p>
      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
        Trang này đang được hoàn thiện
      </h1>
      <p className="mt-4 text-muted-foreground">
        Trong lúc chờ, bạn có thể gọi trực tiếp để được tư vấn và báo giá.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={`tel:${site.phone}`}
          className="rounded-md bg-primary px-7 py-3 font-bold text-primary-foreground transition hover:bg-primary-hover"
        >
          Gọi {site.phoneDisplay}
        </a>
        <Link
          href="/"
          className="rounded-md border border-primary px-7 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Về trang chủ
        </Link>
      </div>
    </section>
  );
}
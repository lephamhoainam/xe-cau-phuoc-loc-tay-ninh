import Breadcrumb from "../common/Breadcrumb";
import type { PageInfo } from "../../lib/types";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop";

export default function PageBanner({ page }: { page: PageInfo }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-6 md:pt-8">
      <div className="relative isolate flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl md:min-h-[300px]">
        {/* Ảnh nền */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER_IMAGE}
          alt=""
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* Lớp phủ tối để chữ dễ đọc */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        />

        {/* Breadcrumb dạng viên thuốc */}
        <div className="p-5 md:p-8">
          <div className="inline-flex rounded-full bg-white/90 px-4 py-1.5 text-sm backdrop-blur">
            <Breadcrumb items={page.breadcrumb} />
          </div>
        </div>

        {/* Tiêu đề */}
        <div className="px-5 pb-6 md:px-8 md:pb-9">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-lg">
              {page.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
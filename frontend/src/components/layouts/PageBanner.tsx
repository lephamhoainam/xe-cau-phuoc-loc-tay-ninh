import Breadcrumb from "../common/Breadcrumb";
import type { PageInfo } from "../../lib/types";

export default function PageBanner({ page }: { page: PageInfo }) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-muted to-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Breadcrumb items={page.breadcrumb} />
        <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">{page.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{page.subtitle}</p>
      </div>
    </section>
  );
}
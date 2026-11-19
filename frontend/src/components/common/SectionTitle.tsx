export default function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-primary">
        <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-primary" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </div>
  );
}
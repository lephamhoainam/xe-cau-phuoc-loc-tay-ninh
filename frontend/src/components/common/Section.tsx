export default function Section({
  children,
  className = "py-10",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className="bg-background">
      <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>
    </section>
  );
}
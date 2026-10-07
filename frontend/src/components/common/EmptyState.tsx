import { Newspaper } from "lucide-react";

type Props = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Newspaper className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
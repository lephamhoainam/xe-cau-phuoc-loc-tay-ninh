import { Check, X } from "lucide-react";
import type { ServiceBlock } from "../../lib/types";
import Photo from "../common/Photo";
import ImageGallery from "../common/ImageGallery";

type Props = { blocks: ServiceBlock[]; variant?: "plain" | "tiles" };

// "Theo giờ: việc nhỏ..." -> { label: "Theo giờ", desc: "việc nhỏ..." }
function splitItem(text: string) {
  const i = text.indexOf(":");
  return i > 0 && i <= 24
    ? { label: text.slice(0, i), desc: text.slice(i + 1).trim() }
    : null;
}

function Tiles({ items, bad }: { items: string[]; bad?: boolean }) {
  const Icon = bad ? X : Check;
  const color = bad ? "text-error" : "text-success";

  return (
    <ul
      className={`grid gap-3 ${
        items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {items.map((t) => {
        // Danh sách "bad" luôn hiện dấu X, không tách nhãn
        const parts = bad ? null : splitItem(t);
        return (
          <li key={t} className="rounded-lg bg-muted p-4">
            {parts ? (
              <>
                <p className="text-lg font-extrabold text-primary">
                  {parts.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {parts.desc}
                </p>
              </>
            ) : (
              <div className="flex items-start gap-2.5 text-sm font-medium">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
                {t}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function ServiceBlocks({ blocks, variant = "plain" }: Props) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            );

          case "list": {
            const bad = b.tone === "bad";
            if (variant === "tiles") {
              return <Tiles key={i} items={b.items} bad={bad} />;
            }
            const Icon = bad ? X : Check;
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((t) => {
                  const parts = bad ? null : splitItem(t);
                  return (
                    <li key={t} className="flex items-start gap-2.5 text-sm">
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          bad ? "text-error" : "text-success"
                        }`}
                      />
                      <span>
                        {parts ? (
                          <>
                            <strong className="font-bold">{parts.label}:</strong>{" "}
                            <span className="text-muted-foreground">
                              {parts.desc}
                            </span>
                          </>
                        ) : (
                          t
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          case "note":
            return (
              <p
                key={i}
                className="rounded-md border-l-4 border-primary bg-primary/10 px-4 py-3 text-sm"
              >
                {b.text}
              </p>
            );

          case "image":
            return (
              <figure key={i}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Photo
                    src={b.src}
                    alt={b.alt}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "gallery":
            return (
              <figure key={i} className="min-w-0">
                <ImageGallery images={b.images} className="aspect-[16/9]" />
                {b.caption && (
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
      })}
    </div>
  );
}
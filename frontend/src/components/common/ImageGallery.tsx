"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryMode, type GalleryImage } from "@/lib/gallery";

type Props = {
  images?: GalleryImage[];
  className?: string;
  interval?: number;
  priority?: boolean;
};

const arrow =
  "absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow transition hover:border-primary hover:text-primary";

export default function ImageGallery({
  images,
  className = "aspect-[4/3]",
  interval = 3000,
  priority = false,
}: Props) {
  const list = images ?? [];
  const mode = getGalleryMode(list);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + list.length) % list.length),
    [list.length]
  );

  useEffect(() => {
    if (mode !== "slider" || paused) return;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [mode, paused, interval, go, index]);

  const frame = `relative w-full overflow-hidden rounded-xl bg-muted ${className}`;

  if (mode === "none") {
    return (
      <div className={`${frame} flex items-center justify-center text-sm text-muted-foreground`}>
        Chưa có ảnh
      </div>
    );
  }

  const active = index % list.length;

  return (
    <div
      className={frame}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {list.map((img, i) => (
        <Image
          key={`${img.src}-${i}`}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority && i === 0}
          aria-hidden={i !== active}
          className={`object-cover transition-opacity duration-500 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {mode === "slider" && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Ảnh trước" className={`${arrow} left-3`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Ảnh sau" className={`${arrow} right-3`}>
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-5 bg-primary" : "w-2 bg-card/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
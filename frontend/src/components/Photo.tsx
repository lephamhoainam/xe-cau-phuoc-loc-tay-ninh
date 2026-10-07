import Image from "next/image";

export default function Photo({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          Chưa có ảnh
        </div>
      )}
    </div>
  );
}

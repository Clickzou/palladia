import Image from "next/image";

/** Mosaique de photos en 3 colonnes (galerie « Dégustez avec les yeux ! »). */
export default function PhotoGrid({
  images,
  columns = 3,
}: {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${cols}`}>
      {images.map((img) => (
        <div key={img.src} className="relative aspect-square overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";

/**
 * Mosaique de photos.
 *
 * `mode` :
 *  - "carre"   : vignettes carrees recadrees (galeries denses)
 *  - "paysage" : l’image garde son cadrage d’origine, sans recadrage ni
 *                agrandissement — a preferer pour les grandes photos.
 */
export default function PhotoGrid({
  images,
  columns = 3,
  mode = "carre",
}: {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
  mode?: "carre" | "paysage";
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const tailles = {
    2: "(max-width: 640px) 100vw, 50vw",
    3: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    4: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  }[columns];

  if (mode === "paysage") {
    return (
      <div className={`grid grid-cols-1 ${cols}`}>
        {images.map((img, i) => (
          <div
            key={img.src}
            // Cascade plafonnee a 6 : au-dela, la derniere image d'une grande
            // galerie attendrait plus d'une seconde.
            style={{ "--delai": `${Math.min(i, 6) * 0.08}s` } as React.CSSProperties}
            className="apparait-image group overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1024}
              height={683}
              sizes={tailles}
              className="survol-zoom h-auto w-full"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${cols}`}>
      {images.map((img, i) => (
        <div
          key={img.src}
          style={{ "--delai": `${Math.min(i, 6) * 0.08}s` } as React.CSSProperties}
          className="apparait-image group relative aspect-square overflow-hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={tailles}
            className="survol-zoom object-cover"
          />
        </div>
      ))}
    </div>
  );
}

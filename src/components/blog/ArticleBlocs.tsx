import Image from "next/image";
import { Link } from "@/i18n/navigation";
import RoomGallery from "@/components/RoomGallery";
import { IconCheck } from "@/components/icons";
import type { Bloc, BlocContenu } from "@/lib/supabase/types";

/**
 * Rendu d'un article : chaque bloc enregistre en base est associe a un
 * composant. Reproduit les mises en page Elementor du site d'origine.
 */
export default function ArticleBlocs({ blocs }: { blocs: Bloc[] }) {
  return (
    <>
      {blocs.map((bloc) => (
        <BlocRendu key={bloc.id} bloc={bloc} />
      ))}
    </>
  );
}

function BlocRendu({ bloc }: { bloc: Bloc }) {
  switch (bloc.type) {
    case "texte":
      return <BlocTexte c={bloc.contenu as BlocContenu["texte"]} />;
    case "texte_image":
      return <BlocTexteImage c={bloc.contenu as BlocContenu["texte_image"]} />;
    case "cartes":
      return <BlocCartes c={bloc.contenu as BlocContenu["cartes"]} />;
    case "bandeau":
      return <BlocBandeau c={bloc.contenu as BlocContenu["bandeau"]} />;
    case "bandeau_image":
      return <BlocBandeauImage c={bloc.contenu as BlocContenu["bandeau_image"]} />;
    case "carrousel":
      return <BlocCarrousel c={bloc.contenu as BlocContenu["carrousel"]} />;
    case "liste_cochee":
      return <BlocListeCochee c={bloc.contenu as BlocContenu["liste_cochee"]} />;
    case "citation":
      return <BlocCitation c={bloc.contenu as BlocContenu["citation"]} />;
    default:
      return null;
  }
}

/* --- Titre de section, commun a plusieurs blocs --- */
function TitreSection({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-center font-display text-2xl tracking-wide text-gold md:text-3xl">
      {children}
    </h2>
  );
}

function Paragraphes({ items, centre }: { items: string[]; centre?: boolean }) {
  return (
    <div className={`space-y-4 leading-relaxed text-body ${centre ? "text-center" : ""}`}>
      {items.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function Liste({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-body">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function BlocTexte({ c }: { c: BlocContenu["texte"] }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      {c.titre && <TitreSection>{c.titre}</TitreSection>}
      <Paragraphes items={c.paragraphes} centre={c.centre} />
      {c.liste && <Liste items={c.liste} />}
    </section>
  );
}

function BlocTexteImage({ c }: { c: BlocContenu["texte_image"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {c.titre && <TitreSection>{c.titre}</TitreSection>}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className={c.position === "gauche" ? "md:order-2" : ""}>
          <Paragraphes items={c.paragraphes} />
          {c.liste && <Liste items={c.liste} />}
        </div>
        <div className={`relative aspect-[4/3] ${c.position === "gauche" ? "md:order-1" : ""}`}>
          <Image
            src={c.image}
            alt={c.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function BlocCartes({ c }: { c: BlocContenu["cartes"] }) {
  const cols = c.cartes.length >= 4 ? "lg:grid-cols-4" : c.cartes.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {c.titre && <TitreSection>{c.titre}</TitreSection>}
      <div className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
        {c.cartes.map((carte) => (
          <article key={carte.titre} className="border border-gold/40 bg-white">
            {carte.image && (
              <div className="relative aspect-[4/3]">
                <Image
                  src={carte.image}
                  alt={carte.alt ?? ""}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="px-6 py-6">
              <h3 className="text-center font-display text-lg text-ink">{carte.titre}</h3>
              <div className="mt-4">
                <Paragraphes items={carte.paragraphes} />
                {carte.liste && <Liste items={carte.liste} />}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlocBandeau({ c }: { c: BlocContenu["bandeau"] }) {
  return (
    <section className="bg-gold px-6 py-12 text-center text-white">
      <p className="text-lg tracking-wide uppercase md:text-xl">
        {c.texte}
        {c.accent && <strong className="font-bold"> {c.accent}</strong>}
      </p>
      {c.sous_texte && (
        <p className="mt-5 font-semibold tracking-wide uppercase">{c.sous_texte}</p>
      )}
    </section>
  );
}

function BlocBandeauImage({ c }: { c: BlocContenu["bandeau_image"] }) {
  return (
    <section className="relative px-6 py-20">
      <Image src={c.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <h2 className="font-display text-2xl tracking-wide md:text-3xl">{c.titre}</h2>
        {c.paragraphes && (
          <div className="mt-6 space-y-4 leading-relaxed">
            {c.paragraphes.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        )}
        {c.liste && (
          <ul className="mt-6 space-y-2">
            {c.liste.map((i) => (
              <li key={i} className="flex items-center justify-center gap-2">
                <IconCheck className="size-4 fill-current" /> {i}
              </li>
            ))}
          </ul>
        )}
        {c.boutons && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {c.boutons.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="rounded-full bg-gold px-8 py-3 font-medium transition-colors hover:bg-gold-dark"
              >
                {b.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BlocCarrousel({ c }: { c: BlocContenu["carrousel"] }) {
  return (
    <section className="py-10">
      <RoomGallery images={c.images} />
    </section>
  );
}

function BlocListeCochee({ c }: { c: BlocContenu["liste_cochee"] }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10 text-center">
      {c.titre && <TitreSection>{c.titre}</TitreSection>}
      {c.intro && <p className="leading-relaxed text-body">{c.intro}</p>}
      <ul className="mt-6 space-y-2">
        {c.items.map((i) => (
          <li key={i} className="flex items-center justify-center gap-2 text-body">
            <IconCheck className="size-4 fill-gold" /> {i}
          </li>
        ))}
      </ul>
      {c.conclusion && <p className="mt-6 leading-relaxed text-body">{c.conclusion}</p>}
    </section>
  );
}

function BlocCitation({ c }: { c: BlocContenu["citation"] }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10 text-center">
      <blockquote className="font-display text-xl text-ink italic md:text-2xl">
        « {c.texte} »
      </blockquote>
      {c.auteur && <p className="mt-4 text-muted">{c.auteur}</p>}
    </section>
  );
}

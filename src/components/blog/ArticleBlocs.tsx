import Image from "next/image";
import { Link } from "@/i18n/navigation";
import CarrouselLarge from "@/components/CarrouselLarge";
import { IconBed, IconCheck, IconExpand, IconGift, IconLock, IconTv, IconWifi } from "@/components/icons";
import { ratioImage } from "@/lib/images";
import type { Bloc, BlocContenu } from "@/lib/supabase/types";

/**
 * Rendu d’un article : chaque bloc enregistre en base est associe a un
 * composant. Reproduit les mises en page Elementor du site d’origine.
 */
/** Icones disponibles pour le bloc `caracteristiques`. */
const ICONES: Record<string, React.ReactNode> = {
  places: <IconExpand />,
  parking: <IconExpand />,
  lit: <IconBed />,
  ecran: <IconTv />,
  wifi: <IconWifi />,
  coffre: <IconLock />,
  cadeau: <IconGift className="size-10 fill-current" />,
};

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
    case "equipe":
      return <BlocEquipe c={bloc.contenu as BlocContenu["equipe"]} />;
    case "bouton":
      return <BlocBouton c={bloc.contenu as BlocContenu["bouton"]} />;
    case "caracteristiques":
      return <BlocCaracteristiques c={bloc.contenu as BlocContenu["caracteristiques"]} />;
    case "menu":
      return <BlocMenu c={bloc.contenu as BlocContenu["menu"]} />;
    case "sections":
      return <BlocSections c={bloc.contenu as BlocContenu["sections"]} />;
    default:
      return null;
  }
}

/* --- Titre de section, commun a plusieurs blocs --- */
const TAILLES = { normal: "titre-bloc", moyen: "titre-moyen", grand: "section-title" } as const;

function TitreSection({
  children,
  taille = "normal",
}: {
  children: React.ReactNode;
  taille?: keyof typeof TAILLES;
}) {
  return <h2 className={`${TAILLES[taille]} mb-8`}>{children}</h2>;
}

/**
 * Balisage minimal accepte dans les textes stockes en base :
 * `**gras**` et `[libelle](/cible)`. Le site d’origine met certains passages
 * en gras et fait des liens internes ; les reproduire garde le maillage SEO.
 */
function RichText({ texte }: { texte: string }) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {morceaux.map((m, i) => {
        const gras = /^\*\*[^*]+\*\*$/.exec(m);
        if (gras) return <strong key={i} className="text-ink">{m.slice(2, -2)}</strong>;

        const lien = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(m);
        if (lien) {
          const style = "text-[#8b3a3a] underline underline-offset-2 hover:text-gold";
          // Les liens sortants ne passent pas par le routeur localise.
          return /^(https?:|mailto:|tel:)/.test(lien[2]) ? (
            <a key={i} href={lien[2]} target="_blank" rel="noopener" className={style}>
              {lien[1]}
            </a>
          ) : (
            <Link key={i} href={lien[2]} className={style}>
              {lien[1]}
            </Link>
          );
        }

        return m;
      })}
    </>
  );
}

function Paragraphes({ items, centre }: { items: string[]; centre?: boolean }) {
  return (
    <div className={`space-y-4 leading-relaxed text-body ${centre ? "text-center" : ""}`}>
      {items.map((p) => (
        <p key={p.slice(0, 40)} className="whitespace-pre-line">
          <RichText texte={p} />
        </p>
      ))}
    </div>
  );
}

function Liste({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-body">
      {items.map((i) => (
        <li key={i}>
          <RichText texte={i} />
        </li>
      ))}
    </ul>
  );
}

function BlocTexte({ c }: { c: BlocContenu["texte"] }) {
  return (
    <section className={c.fond_gris ? "bg-cream py-10" : "py-10"}>
      <div className="conteneur">
        {c.titre && <TitreSection taille={c.taille_titre}>{c.titre}</TitreSection>}
        <Paragraphes items={c.paragraphes} centre={c.centre} />
        {c.liste && <Liste items={c.liste} />}
        {c.note && (
          <p className={`mt-8 text-body italic ${c.centre ? "text-center" : ""}`}>{c.note}</p>
        )}
        {c.boutons && <Boutons boutons={c.boutons} />}
      </div>
    </section>
  );
}

/** Colonne de texte d'un bloc image/texte, dans ses deux mises en page. */
function ColonneTexte({ c }: { c: BlocContenu["texte_image"] }) {
  return (
    <>
      {c.sous_titre && <h3 className="titre-mini mb-4 text-left">{c.sous_titre}</h3>}
      <Paragraphes items={c.paragraphes} />
      {c.liste && <Liste items={c.liste} />}
      {c.conclusion && (
        <p className="mt-4 leading-relaxed text-body">
          <RichText texte={c.conclusion} />
        </p>
      )}
      {c.sections && <SousSections sections={c.sections} />}
      {c.boutons && <Boutons boutons={c.boutons} />}
    </>
  );
}

/** Sous-sections titrees, partagees par le bloc `sections` et les colonnes. */
function SousSections({ sections }: { sections: NonNullable<BlocContenu["texte_image"]["sections"]> }) {
  return (
    <>
      {sections.map((s) => (
        <div key={s.titre} className="mt-8 first:mt-6">
          <h3 className="titre-mini text-left">{s.titre}</h3>
          {s.intro && (
            <p className="mt-3 leading-relaxed text-body">
              <RichText texte={s.intro} />
            </p>
          )}
          {s.items && <Liste items={s.items} />}
          {s.conclusion && (
            <p className="mt-3 leading-relaxed text-body">
              <RichText texte={s.conclusion} />
            </p>
          )}
        </div>
      ))}
    </>
  );
}

function BlocTexteImage({ c }: { c: BlocContenu["texte_image"] }) {
  // Mise en page « demi-ecran » : le visuel touche le bord, le texte occupe
  // l'autre moitie. C'est la trame des articles longs du site.
  if (c.pleine_largeur) return <BlocDemiEcran c={c} />;

  return (
    <section className={c.fond_gris ? "bg-cream py-10" : "py-10"}>
      <div className="conteneur">
        {c.titre && <TitreSection taille={c.taille_titre}>{c.titre}</TitreSection>}
        {/* Deux colonnes egales, texte centre verticalement par rapport au visuel */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className={c.position === "gauche" ? "md:order-2" : ""}>
            <ColonneTexte c={c} />
          </div>
          <div
            className={`relative w-full ${c.position === "gauche" ? "md:order-1" : ""}`}
            style={{ aspectRatio: c.ratio ?? ratioImage(c.image) }}
          >
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Reprise pleine largeur sous les deux colonnes */}
        {c.apres && (
          <div className="mt-10">
            <Paragraphes items={c.apres} />
            {c.apres_liste && <Liste items={c.apres_liste} />}
          </div>
        )}
      </div>
    </section>
  );
}

function BlocDemiEcran({ c }: { c: BlocContenu["texte_image"] }) {
  return (
    <section className={`grid items-stretch md:grid-cols-2 ${c.fond_gris ? "bg-cream" : ""}`}>
      <div
        className={`relative min-h-[280px] ${c.position === "gauche" ? "" : "md:order-2"}`}
      >
        <Image
          src={c.image}
          alt={c.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-8 py-14 lg:px-16">
        {c.titre && <h2 className="titre-bloc mb-6 text-left">{c.titre}</h2>}
        <ColonneTexte c={c} />
      </div>
    </section>
  );
}

/** Suite de sous-sections titrees regroupees sous un meme intitule. */
function BlocSections({ c }: { c: BlocContenu["sections"] }) {
  return (
    <section className={c.fond_gris ? "bg-cream py-14" : "py-14"}>
      <div className="conteneur">
        {c.titre && <TitreSection taille={c.taille_titre}>{c.titre}</TitreSection>}
        {c.intro && (
          <p className="mb-10 text-center leading-relaxed text-body">
            <RichText texte={c.intro} />
          </p>
        )}

        <div className={c.deux_colonnes ? "grid gap-10 md:grid-cols-2" : ""}>
          {c.deux_colonnes ? (
            c.sections.map((s) => <SousSections key={s.titre} sections={[s]} />)
          ) : (
            <SousSections sections={c.sections} />
          )}
        </div>
      </div>
    </section>
  );
}

function BlocCartes({ c }: { c: BlocContenu["cartes"] }) {
  const cols =
    c.cartes.length >= 4 ? "lg:grid-cols-4" : c.cartes.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  const titre = (carte: (typeof c.cartes)[number]) => (
    <h3 className="text-center font-display text-xl font-bold whitespace-pre-line text-ink">
      {carte.titre}
    </h3>
  );

  return (
    // Bande grise pleine largeur, contenu presque pleine largeur
    <section className={c.fond_gris === false ? "py-10" : "bg-cream py-14"}>
      <div className="px-6 lg:px-[100px]">
        {c.titre && <TitreSection taille={c.taille_titre}>{c.titre}</TitreSection>}
        <div className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
          {c.cartes.map((carte) => (
            <article
              key={carte.titre}
              className="flex flex-col border border-gold/40 bg-white px-4 pt-6 pb-8"
            >
              {!c.titre_sous_image && <div className="mb-5">{titre(carte)}</div>}

              {carte.image && (
                <div className="relative h-[350px]">
                  <Image
                    src={carte.image}
                    alt={carte.alt ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              )}

              {c.titre_sous_image && <div className="mt-6">{titre(carte)}</div>}

              <div className="mt-6">
                <Paragraphes items={carte.paragraphes} />
                {carte.liste && <Liste items={carte.liste} />}
                {carte.conclusion && (
                  <p className="mt-4 leading-relaxed text-body">
                    <RichText texte={carte.conclusion} />
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlocBandeau({ c }: { c: BlocContenu["bandeau"] }) {
  return (
    // Mesure du site : Roboto 19 px, capitales, blanc, 50/30 px de padding
    <section className="bg-gold px-6 pt-[50px] pb-[30px] text-center text-white">
      <h3 className="text-[19px] font-normal uppercase">
        {c.texte}
        {c.accent && <strong className="font-semibold"> {c.accent}</strong>}
        {c.suite && ` ${c.suite}`}
      </h3>
      {c.sous_texte && (
        <p className="mt-6 text-[19px] font-semibold uppercase">{c.sous_texte}</p>
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
        <h2 className="titre-moyen text-white">{c.titre}</h2>
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
  // Une image seule n'est pas un carrousel : le site la pose simplement dans
  // le contenu, centree et a ses proportions d'origine.
  if (c.images.length === 1) {
    const [img] = c.images;
    return (
      <section className="py-10">
        <div
          className="relative mx-auto w-full max-w-[1200px]"
          style={{ aspectRatio: ratioImage(img.src, "16 / 9") }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <CarrouselLarge images={c.images} />
    </section>
  );
}

function BlocListeCochee({ c }: { c: BlocContenu["liste_cochee"] }) {
  return (
    <section className={c.fond_gris ? "bg-cream py-20" : "py-10"}>
      <div className="mx-auto max-w-4xl px-6 text-center">
      {c.titre && <TitreSection>{c.titre}</TitreSection>}
      {c.intro && <p className="whitespace-pre-line leading-relaxed text-body">{c.intro}</p>}
      <ul className="mt-6 space-y-2">
        {c.items.map((i) => (
          <li key={i} className="flex items-center justify-center gap-2 text-body">
            <IconCheck className="size-4 fill-gold" /> {i}
          </li>
        ))}
      </ul>
      {c.conclusion && <p className="mt-8 leading-relaxed text-body">{c.conclusion}</p>}
      </div>
    </section>
  );
}

/** Carte de menu : services successifs, puis le tarif sur bandeau sombre. */
function BlocMenu({ c }: { c: BlocContenu["menu"] }) {
  return (
    <section className="py-10">
      <div className="conteneur">
        {c.titre && <TitreSection taille={c.taille_titre}>{c.titre}</TitreSection>}

        {c.entree && (
          <div className="mb-10 space-y-2 text-center text-body">
            {c.entree.map((l) => (
              <p key={l.slice(0, 30)}>
                <RichText texte={l} />
              </p>
            ))}
          </div>
        )}

        <div className="divide-y divide-black/10 bg-cream">
          {c.sections.map((s) => (
            <div key={s.titre} className="px-6 py-6 text-center">
              {c.services_en_titre === false ? (
                // Intitule et premier plat dans le meme paragraphe, comme le site
                <p className="whitespace-pre-line text-body">
                  <strong className="text-ink">{s.titre}</strong>
                  {s.lignes[0] && <RichText texte={s.lignes[0]} />}
                </p>
              ) : (
                <h4 className="titre-mini">{s.titre}</h4>
              )}
              {s.lignes.slice(c.services_en_titre === false ? 1 : 0).map((l) => (
                <p key={l.slice(0, 30)} className="mt-2 whitespace-pre-line text-body">
                  <RichText texte={l} />
                </p>
              ))}
            </div>
          ))}
        </div>

        {c.tarif && (
          <div className="mt-8 bg-ink px-6 py-8 text-center text-white">
            <p className="text-sm tracking-widest uppercase">{c.tarif.label}</p>
            <p className="mt-2 text-[26px] font-extrabold">{c.tarif.montant}</p>
          </div>
        )}
      </div>
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

/** Trombinoscope du service commercial. */
function BlocEquipe({ c }: { c: BlocContenu["equipe"] }) {
  return (
    <section className="bg-cream px-6 py-16 text-center">
      {/* Le site titre cette accroche : on garde le meme niveau */}
      {c.intro && <h3 className="titre-mini mx-auto max-w-3xl whitespace-pre-line">{c.intro}</h3>}
      {c.adresse && (
        <p className="mt-6 whitespace-pre-line text-body">{c.adresse.join("\n")}</p>
      )}

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-3">
        {c.membres.map((m) => (
          <div key={m.nom}>
            <h3 className="font-semibold tracking-wide text-ink uppercase">{m.nom}</h3>
            <p className="mt-1 text-body">{m.fonction}</p>
            {m.photo && (
              <div className="relative mx-auto mt-5 size-40 overflow-hidden rounded-full">
                <Image src={m.photo} alt={m.nom} fill sizes="160px" className="object-cover" />
              </div>
            )}
            {m.telephone && (
              <p className="mt-5">
                <a
                  href={`tel:${m.telephone.replace(/\s/g, "")}`}
                  className="font-semibold text-ink underline underline-offset-4 hover:text-gold"
                >
                  {m.telephone}
                </a>
              </p>
            )}
            {m.email && (
              <p className="mt-2">
                <a
                  href={`mailto:${m.email}`}
                  className="font-semibold text-ink underline underline-offset-4 hover:text-gold"
                >
                  {m.email}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Rangée de boutons d’action centrés. */
/** Rangee de boutons dores centres, partagee par plusieurs blocs. */
function Boutons({ boutons }: { boutons: BlocContenu["bouton"]["boutons"] }) {
  const style =
    "rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark";

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      {boutons.map((b) =>
        b.externe ? (
          <a key={b.href} href={b.href} target="_blank" rel="noopener" className={style}>
            {b.label}
          </a>
        ) : (
          <Link key={b.href} href={b.href} className={style}>
            {b.label}
          </Link>
        ),
      )}
    </div>
  );
}

function BlocBouton({ c }: { c: BlocContenu["bouton"] }) {
  return (
    <section className="py-6">
      <Boutons boutons={c.boutons} />
    </section>
  );
}

/** Rangée de pictos chiffrés (capacité, parking, services). */
function BlocCaracteristiques({ c }: { c: BlocContenu["caracteristiques"] }) {
  return (
    <section className="px-6 py-14">
      {c.titre && (
        <p className="mb-10 text-center tracking-wide text-ink-soft uppercase">{c.titre}</p>
      )}
      <ul className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        {c.items.map((i) => (
          <li key={i.label} className="text-center">
            <span className="text-gold">{ICONES[i.icone ?? ""] ?? <IconCheck className="size-10 fill-current" />}</span>
            <p className="mt-4 text-body">{i.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 par defaut : suffisant pour une vignette, visible sur un bandeau
    // plein ecran ou les aplats de ciel se pixellisent. 92 est reserve au
    // carrousel d'accueil, dont les sources sont deja compressees : les
    // reencoder a 75 ajoutait une seconde perte, bien visible sur les degrades.
    qualities: [75, 85, 92],
  },

  /**
   * Articles « fichiers » (contenu/articles/*.json) et corrections du client :
   * lus sur disque à l'exécution (src/lib/articles-fichiers), ils doivent
   * accompagner chaque fonction serveur déployée.
   */
  outputFileTracingIncludes: {
    "/**": ["./contenu/**/*.json"],
  },

  /**
   * Aperçu signé des articles programmés : jamais indexé, et la signature ne
   * part pas dans l'en-tête Referer des liens sortants.
   */
  async headers() {
    const entetes = [
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      { key: "Referrer-Policy", value: "no-referrer" },
    ];
    return [
      { source: "/blog/apercu/:slug*", headers: entetes },
      { source: "/:locale(en|es)/blog/apercu/:slug*", headers: entetes },
    ];
  },

  /**
   * Redirections 301 depuis les URLs heritees de WordPress.
   * Le slug /suite-junior-2/ avait ete cree automatiquement par WordPress
   * lors d'une recreation de page ; on le ramene vers l'URL propre.
   */
  async redirects() {
    return [
      { source: "/suite-junior-2", destination: "/suite-junior", permanent: true },
      { source: "/:locale(en|es)/suite-junior-2", destination: "/:locale/suite-junior", permanent: true },

      // Le site en ligne redirige cet ancien article vers la page Seminaire :
      // son contenu y a ete repris, le garder ferait du contenu duplique.
      {
        source: "/seminaire-hotel-palladia-toulouse",
        destination: "/seminaire-evenement-professionnel",
        permanent: true,
      },
      {
        source: "/:locale(en|es)/seminaire-hotel-palladia-toulouse",
        destination: "/:locale/seminaire-evenement-professionnel",
        permanent: true,
      },

      /**
       * Ancienne page WordPress /mariage : elle n'existe plus ici (404) mais
       * Google l'affiche encore. Son contenu vit dans l'article mariage.
       */
      { source: "/mariage", destination: "/mariage-hotel-palladia-toulouse", permanent: true },
      {
        source: "/:locale(en|es)/mariage",
        destination: "/:locale/mariage-hotel-palladia-toulouse",
        permanent: true,
      },

      /**
       * Carte du room service. Ces adresses sont celles des images servies par
       * WordPress ; elles ne sont plus joignables depuis que le domaine pointe
       * ici, et ce sont elles qu'imprime le QR code appose dans les chambres.
       * Le rediriger vaut mieux que de reimprimer 90 chambres — et il n'y a
       * plus d'annee ni de mois dans l'adresse, donc plus rien a casser a la
       * prochaine carte.
       */
      {
        source: "/wp-content/uploads/:annee/:mois/:fichier(ROOM-SERVICE.*)",
        destination: "/carte-room-service",
        permanent: true,
      },

      /**
       * Plaquette seminaires. Le lien que le service commercial colle dans ses
       * mails est celui de l'ancienne mediatheque WordPress : depuis que le
       * domaine pointe ici, il rend un 403, et chaque devis parti avec lui
       * menait dans le vide. Le nom du fichier a change a chaque version du
       * document (PLAQUETTE-SEMINAIRE, Presentation-Seminaire, plaquette-2023),
       * d'ou la casse alternee et le second motif : tous aboutissent au PDF
       * courant, quelle que soit l'annee et le mois dans l'adresse.
       *
       * 307 et non 308, pour la meme raison que les adresses courtes plus bas :
       * un permanent se graverait dans le cache des navigateurs.
       */
      {
        source:
          "/wp-content/uploads/:annee/:mois/:fichier(.*[Ss][Ee][Mm][Ii][Nn][Aa][Ii][Rr][Ee].*\.pdf|plaquette-2023.*\.pdf)",
        destination: "/documents/plaquette-seminaires.pdf",
        permanent: false,
      },

      /**
       * Adresse courte de la plaquette evenementiel, a donner aux clients :
       * hotelpalladia.com/plaquette-seminaires. Elle se dicte au telephone, et
       * survivra a la prochaine version du document — c'est le fichier qu'on
       * remplacera, pas le lien deja diffuse.
       *
       * Temporaire (307) et non permanente : un 308 se grave dans le cache des
       * navigateurs, et repointer ce lien un jour vers une autre destination
       * deviendrait impossible pour qui l'a deja ouvert.
       */
      {
        source: "/plaquette-seminaires",
        destination: "/documents/plaquette-seminaires.pdf",
        permanent: false,
      },
      {
        source: "/:locale(en|es)/plaquette-seminaires",
        destination: "/documents/plaquette-seminaires.pdf",
        permanent: false,
      },

      /** Meme principe pour la plaquette mariage. */
      {
        source: "/plaquette-mariage",
        destination: "/documents/plaquette-mariage.pdf",
        permanent: false,
      },
      {
        source: "/:locale(en|es)/plaquette-mariage",
        destination: "/documents/plaquette-mariage.pdf",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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

      // La page Contact est supprimee : son trafic et son referencement sont
      // reportes sur le formulaire de demande, qui couvre les memes besoins.
      { source: "/contact", destination: "/devis", permanent: true },
      { source: "/:locale(en|es)/contact", destination: "/:locale/devis", permanent: true },

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
    ];
  },
};

export default withNextIntl(nextConfig);

/**
 * Depose un bloc JSON-LD dans la page.
 *
 * Les donnees structurees ne sont lues que par les moteurs de recherche :
 * rien n'est affiche au visiteur.
 */
export default function DonneesStructurees({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

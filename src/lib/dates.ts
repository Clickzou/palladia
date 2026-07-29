/**
 * Date du jour a Toulouse, au format AAAA-MM-JJ.
 *
 * Les serveurs qui rendent le site sont a l'heure UTC : sans ce calage, une
 * annonce valable « jusqu'au 22 aout » disparaitrait deux heures trop tot, le
 * 22 au soir, alors que l'hotel est encore ferme.
 *
 * Le format retourne se compare directement avec `<=` a une autre date ecrite
 * de la meme facon : en AAAA-MM-JJ, l'ordre alphabetique est l'ordre du
 * calendrier.
 */
export function dateDuJourAParis(): string {
  const parties = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const lire = (type: Intl.DateTimeFormatPartTypes) =>
    parties.find((p) => p.type === type)?.value ?? "";

  return `${lire("year")}-${lire("month")}-${lire("day")}`;
}

/**
 * Decor anime de la section du Menu Festif : des etoiles qui scintillent et
 * quelques flocons qui descendent lentement, derriere la carte.
 *
 * Tout est en CSS (voir `.etoile-festive` et `.flocon-festif` dans
 * globals.css) : aucun JavaScript n'est envoye au navigateur. Les positions
 * sont ecrites a la main plutot que tirees au hasard — un tirage donnerait un
 * rendu different entre le serveur et le navigateur. Elles se concentrent sur
 * les bords, la ou la carte ne les recouvre pas.
 */

/** [gauche %, haut %, taille px, retard s, duree s] */
const etoiles: [number, number, number, number, number][] = [
  [4, 8, 14, 0, 4.5],
  [11, 22, 9, 1.8, 5.5],
  [7, 41, 18, 0.9, 6],
  [16, 58, 10, 2.6, 4.8],
  [5, 73, 13, 0.4, 5.2],
  [13, 89, 8, 3.1, 6.4],
  [21, 5, 8, 2.2, 5],
  [19, 34, 7, 3.6, 5.8],
  [34, 2.5, 10, 1.2, 5.4],
  [50, 1.5, 7, 3.3, 6.2],
  [66, 3, 11, 0.6, 4.6],
  [79, 6, 8, 2.9, 5.6],
  [81, 31, 7, 1.5, 6],
  [88, 17, 16, 0.2, 5],
  [95, 36, 9, 2.4, 4.4],
  [86, 52, 12, 3.4, 6.2],
  [93, 68, 17, 1.1, 5.4],
  [84, 81, 9, 0.7, 4.8],
  [96, 92, 12, 2, 5.8],
  [62, 97.5, 8, 1.6, 5],
  [38, 98, 10, 2.8, 6],
];

/** [gauche %, taille px, retard s, duree s] — retards negatifs : la chute est
 *  deja en cours a l'affichage, les flocons ne partent pas tous du haut. */
const flocons: [number, number, number, number][] = [
  [3, 5, -2, 19],
  [9, 3, -11, 24],
  [15, 4, -6, 21],
  [23, 3, -15, 26],
  [77, 3, -9, 25],
  [85, 5, -4, 20],
  [91, 3, -13, 23],
  [97, 4, -17, 22],
];

export default function DecorFestif() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {etoiles.map(([gauche, haut, taille, retard, duree]) => (
        <svg
          key={`${gauche}-${haut}`}
          viewBox="0 0 24 24"
          width={taille}
          height={taille}
          className="etoile-festive absolute fill-white"
          style={{
            left: `${gauche}%`,
            top: `${haut}%`,
            animationDelay: `${retard}s`,
            animationDuration: `${duree}s`,
          }}
        >
          <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
        </svg>
      ))}

      {flocons.map(([gauche, taille, retard, duree]) => (
        <span
          key={gauche}
          className="flocon-festif absolute top-0 h-full"
          style={{
            left: `${gauche}%`,
            animationDelay: `${retard}s`,
            animationDuration: `${duree}s`,
          }}
        >
          <span className="block rounded-full bg-white" style={{ width: taille, height: taille }} />
        </span>
      ))}
    </div>
  );
}

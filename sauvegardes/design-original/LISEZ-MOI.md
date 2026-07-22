# Design d'origine — avant la refonte du 22 juillet 2026

Copie conforme des quatre fichiers de mise en page **tels qu'ils etaient en
production** avant la refonte de la page d'accueil et de la section Services.

Reference git : commit `a1ad7fe`.

## A quoi ca sert

Si la cliente n'aime pas le nouveau design, on remet ces fichiers a leur place
et le site retrouve exactement son apparence precedente. Aucun contenu, aucune
traduction, aucune donnee n'est concerne : ces fichiers ne portent que la mise
en page.

## Ou remettre chaque fichier

| Fichier de sauvegarde | Destination dans le projet |
| --- | --- |
| `home-page.tsx`      | `src/app/[locale]/page.tsx` |
| `hotel-page.tsx`     | `src/app/[locale]/hotel/page.tsx` |
| `HeroCarousel.tsx`   | `src/components/HeroCarousel.tsx` |
| `SplitSection.tsx`   | `src/components/SplitSection.tsx` |

Copier-coller le fichier par-dessus l'ancien suffit. Puis relancer un
deploiement.

## Restauration en une commande

Depuis la racine du projet, dans un terminal :

```sh
cp sauvegardes/design-original/home-page.tsx    "src/app/[locale]/page.tsx"
cp sauvegardes/design-original/hotel-page.tsx   "src/app/[locale]/hotel/page.tsx"
cp sauvegardes/design-original/HeroCarousel.tsx src/components/HeroCarousel.tsx
cp sauvegardes/design-original/SplitSection.tsx src/components/SplitSection.tsx
```

## Restauration partielle

Les quatre fichiers sont independants. On peut ne remettre que la page
d'accueil et garder la nouvelle section Services, ou l'inverse.

## Attention

Si de **nouveaux composants** sont crees pour la refonte, les remettre a
l'ancien laisse ces composants inutilises dans le projet. C'est sans
consequence pour le site : ils ne sont simplement plus appeles.

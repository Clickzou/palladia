#!/usr/bin/env node
/**
 * Convertit le HTML d'un article WordPress en blocs pour Supabase.
 *
 * Le contenu des articles Palladia est du HTML simple (p, h1, h2, img, ul, li).
 * On le parcourt sequentiellement et on regroupe :
 *   - un h2 ouvre une nouvelle section ;
 *   - une image suivie/precedee de texte donne un bloc `texte_image` ;
 *   - sinon on produit un bloc `texte`.
 * Le fil d'Ariane et le H1 sont retires (ils sont rendus par le gabarit).
 */

const ENTITES = {
  "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#8217;": "’", "&#039;": "'", "&#39;": "'", "&rsquo;": "’", "&lsquo;": "‘",
  "&#8211;": "–", "&#8212;": "—", "&ndash;": "–", "&mdash;": "—",
  "&laquo;": "«", "&raquo;": "»", "&hellip;": "…", "&eacute;": "é",
  "&egrave;": "è", "&agrave;": "à", "&ccedil;": "ç", "&ecirc;": "ê",
  "&#8230;": "…", "&#8220;": "“", "&#8221;": "”", "&euro;": "€",
};

export function decode(s) {
  return s.replace(/&[a-z#0-9]+;/gi, (e) => ENTITES[e] ?? e);
}

/** Retire les balises et normalise les espaces. */
export function texte(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

/** Chemin relatif d'un media, pour pointer vers /images/blog/... */
function media(src) {
  const m = src.match(/\/uploads\/(.+?)(?:-\d+x\d+)?(\.[a-z]+)$/i);
  return m ? `/images/blog/${m[1].split("/").pop()}${m[2]}` : src;
}

/** Decoupe le HTML en noeuds de haut niveau exploitables. */
function noeuds(html) {
  const out = [];
  const re = /<(h[1-6]|p|ul|ol|img|blockquote)\b([^>]*)>([\s\S]*?)<\/\1>|<img\b([^>]*)\/?>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) out.push({ tag: m[1].toLowerCase(), attrs: m[2], html: m[3] });
    else out.push({ tag: "img", attrs: m[4], html: "" });
  }
  return out;
}

const attr = (attrs, name) =>
  attrs?.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? "";

export function htmlVersBlocs(html, { titre } = {}) {
  const blocs = [];
  let section = { titre: undefined, paragraphes: [], liste: [], images: [] };

  const vider = () => {
    const { titre: t, paragraphes, liste, images } = section;
    if (paragraphes.length || liste.length || images.length) {
      if (images.length === 1 && (paragraphes.length || liste.length)) {
        blocs.push({
          type: "texte_image",
          contenu: {
            ...(t && { titre: t }),
            paragraphes,
            ...(liste.length && { liste }),
            image: images[0].src,
            alt: images[0].alt,
            position: blocs.length % 2 === 0 ? "droite" : "gauche",
          },
        });
      } else {
        if (paragraphes.length || liste.length) {
          blocs.push({
            type: "texte",
            contenu: { ...(t && { titre: t }), paragraphes, ...(liste.length && { liste }) },
          });
        }
        if (images.length) {
          blocs.push({ type: "carrousel", contenu: { images } });
        }
      }
    } else if (t) {
      blocs.push({ type: "texte", contenu: { titre: t, paragraphes: [] } });
    }
    section = { titre: undefined, paragraphes: [], liste: [], images: [] };
  };

  for (const n of noeuds(html)) {
    switch (n.tag) {
      case "h1":
        break; // rendu par le gabarit
      case "h2":
      case "h3": {
        const t = texte(n.html);
        if (!t) break;
        vider();
        section.titre = t;
        break;
      }
      case "p": {
        const t = texte(n.html);
        // Ignore le fil d'Ariane et les paragraphes vides
        if (!t || /^Accueil\s*»/.test(t) || t === titre) break;
        section.paragraphes.push(t);
        break;
      }
      case "ul":
      case "ol": {
        for (const li of n.html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
          const t = texte(li[1]);
          if (t) section.liste.push(t);
        }
        break;
      }
      case "img": {
        const src = attr(n.attrs, "src");
        if (src) section.images.push({ src: media(src), alt: decode(attr(n.attrs, "alt")) });
        break;
      }
      case "blockquote": {
        const t = texte(n.html);
        if (t) {
          vider();
          blocs.push({ type: "citation", contenu: { texte: t } });
        }
        break;
      }
    }
  }
  vider();

  return blocs.map((b, i) => ({ ...b, ordre: i }));
}

/** Premiere image du contenu, utilisee comme visuel principal. */
export function premiereImage(html) {
  const m = html.match(/<img\b[^>]*\bsrc="([^"]+)"/i);
  return m ? media(m[1]) : null;
}

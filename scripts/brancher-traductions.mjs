/**
 * Branche la traduction du contenu sur les pages qui lisent src/data.
 *
 * Chaque page devient asynchrone, recupere la langue depuis ses parametres et
 * passe ses donnees par `traduireContenu`. La transformation est mecanique :
 * la faire a la main sur vingt fichiers serait long et sujet a l'oubli.
 *
 *   node scripts/brancher-traductions.mjs            # applique
 *   node scripts/brancher-traductions.mjs --essai    # montre sans ecrire
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const essai = process.argv.includes("--essai");
const racine = fileURLToPath(new URL("..", import.meta.url));
const pages = join(racine, "src/app/[locale]");

/** Modules de donnees a traduire, avec le nom sous lequel la page les importe. */
const MODULES = /from "@\/data\/(?!seo")([a-z-]+)"/;

let touchees = 0;

for (const entree of readdirSync(pages, { withFileTypes: true })) {
  const chemin = entree.isDirectory()
    ? join(pages, entree.name, "page.tsx")
    : join(pages, entree.name);
  if (!chemin.endsWith("page.tsx") || !existsSync(chemin)) continue;

  let source = readFileSync(chemin, "utf8");
  if (!MODULES.test(source)) continue;
  if (source.includes("traduireContenu")) continue; // deja branche

  // Les imports de donnees prennent un suffixe Fr, l'objet traduit garde le nom
  const imports = [...source.matchAll(/import \{ ([^}]+) \} from "@\/data\/(?!seo")([a-z-]+)";/g)];
  if (!imports.length) continue;

  const alias = [];
  // Les fonctions (getRoom…) ne se traduisent pas : c'est leur resultat qui
  // doit l'etre. Ces pages sont traitees a part.
  if (imports.some(([, noms]) => /get[A-Z]/.test(noms))) continue;

  for (const [tout, noms, module] of imports) {
    const remplaces = noms
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .map((n) => {
        const [source_, cible] = n.includes(" as ") ? n.split(" as ").map((x) => x.trim()) : [n, n];
        alias.push({ cible, brut: `${cible}Fr` });
        return `${source_} as ${cible}Fr`;
      });
    source = source.replace(tout, `import { ${remplaces.join(", ")} } from "@/data/${module}";`);
  }

  if (!source.includes('from "@/i18n/contenu"')) {
    source = source.replace(
      /(import [^\n]+from "@\/data\/[a-z-]+";\n)/,
      `$1import { traduireContenu } from "@/i18n/contenu";\n`,
    );
  }

  // Signature : la page devient asynchrone et lit la langue
  const declaration = /export default (async )?function (\w+)\(([^)]*)\) \{/;
  const m = source.match(declaration);
  if (!m) continue;

  const [entier, deja, nom, args] = m;
  const aDejaParams = /params/.test(args);

  const nouvelleSignature = aDejaParams
    ? entier.replace("export default function", "export default async function")
    : `export default async function ${nom}({ params }: { params: Promise<{ locale: string }> }) {`;

  const preambule = alias.map((a) => `  const ${a.cible} = traduireContenu(${a.brut}, locale);`);
  const lectureLocale = aDejaParams ? "" : "  const { locale } = await params;\n";

  source = source.replace(entier, `${nouvelleSignature}\n${lectureLocale}${preambule.join("\n")}\n`);

  if (essai) console.log(`${entree.name} → ${alias.map((a) => a.cible).join(", ")}`);
  else writeFileSync(chemin, source);
  touchees++;
}

console.log(`${touchees} page(s) ${essai ? "a brancher" : "branchees"}`);

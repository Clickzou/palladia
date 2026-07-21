import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LienCookies from "./LienCookies";
import { booking, site, social } from "@/config/site";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
  IconMail,
  IconMap,
  IconPhone,
} from "./icons";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <>
      {/* Bandeau RSE / Clef Verte */}
      <section className="bg-white py-12">
        <Link
          href="/engagements"
          className="mx-auto flex max-w-3xl items-center justify-center gap-6 px-6"
        >
          {/* Titre : ce bandeau est un h2 sur le site d’origine */}
          <h2 className="text-center text-lg font-medium tracking-wide text-[#4a7c2f] uppercase">
            {t("rse")}
          </h2>
          <Image
            src="/images/clef-verte.png"
            alt="Label Clef Verte"
            width={60}
            height={60}
            className="h-14 w-auto"
          />
        </Link>
      </section>

      <footer className="bg-ink-soft text-white">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 text-center md:grid-cols-3">
          {/* Colonne 1 — A propos */}
          <div>
            <h2 className="mb-6 text-lg font-semibold tracking-wider uppercase">
              {t("aPropos")}
            </h2>
            <ul className="space-y-2 text-white/85">
              <FooterLink href="/adelya">{t("carteFidelite")}</FooterLink>
              {/* La page Contact a ete supprimee : le lien mene au formulaire */}
              <FooterLink href="/devis">{t("contact")}</FooterLink>
              <FooterLink href="/recrutement">{t("recrutement")}</FooterLink>
              <FooterExtLink href={booking.rooms}>{t("resaChambre")}</FooterExtLink>
              <FooterExtLink href={booking.restaurant}>{t("resaRestaurant")}</FooterExtLink>
              <FooterExtLink href={booking.spa}>{t("resaSpa")}</FooterExtLink>
              <FooterLink href="/devis?type=salle_reunion">{t("devisSalle")}</FooterLink>
              <FooterLink href="/devis?type=mariage">{t("devisMariage")}</FooterLink>
              <FooterLink href="/devis?type=evenement_hybride">{t("devisHybride")}</FooterLink>
              <FooterLink href="/spectacle-toulouse">{t("concerts")}</FooterLink>
            </ul>
          </div>

          {/* Colonne 2 — Chambres puis rubriques */}
          <div>
            <h2 className="mb-6 text-lg font-semibold tracking-wider uppercase">
              {t("chambres")}
            </h2>
            <ul className="space-y-2 text-white/85">
              <FooterLink href="/preference">Chambre Confort</FooterLink>
              <FooterLink href="/platinium">Chambre Prestige</FooterLink>
              <FooterLink href="/suite-junior">Suite Junior</FooterLink>
              <FooterLink href="/la-suite">La suite</FooterLink>
            </ul>
            <ul className="mt-8 space-y-4 font-semibold tracking-wider uppercase">
              <FooterLink href="/seminaire-evenement-professionnel">{t("seminaires")}</FooterLink>
              <FooterLink href="/restaurant">{t("restaurant")}</FooterLink>
              <FooterLink href="/coffret-cadeau-hotel-restaurant-toulouse">{t("coffrets")}</FooterLink>
              <FooterLink href="/actualites">{t("actualite")}</FooterLink>
            </ul>
          </div>

          {/* Colonne 3 — Infos legales et contact */}
          <div>
            <h2 className="mb-6 text-lg font-semibold tracking-wider uppercase">
              {t("infos")}
            </h2>
            <ul className="space-y-2 text-white/85">
              <FooterLink href="/mentions-legales">{t("mentions")}</FooterLink>
              <FooterLink href="/politique-de-cookies-ue">{t("cookies")}</FooterLink>
              <FooterLink href="/politique-de-confidentialite">{t("confidentialite")}</FooterLink>
              <li>
                <LienCookies libelle={t("gererCookies")} />
              </li>
            </ul>

            <div className="mt-8 space-y-3 text-white/85">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
                  <IconMail /> {site.email}
                </a>
                <a href={site.maps} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-gold">
                  <IconMap /> {t("trouver")}
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <span>{site.address}</span>
                <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold">
                  <IconPhone /> {site.phone}
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <Social href={social.facebook} label="Facebook"><IconFacebook /></Social>
              <Social href={social.linkedin} label="LinkedIn"><IconLinkedin /></Social>
              <Social href={social.youtube} label="YouTube"><IconYoutube /></Social>
              <Social href={social.instagram} label="Instagram"><IconInstagram /></Social>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
          © {new Date().getFullYear()} {site.name} —{" "}
          <a href="https://clickzou.fr" target="_blank" rel="noopener" className="hover:text-gold">
            {t("creation")}
          </a>
        </div>
      </footer>
    </>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}

function FooterExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener" className="transition-colors hover:text-gold">
        {children}
      </a>
    </li>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink"
    >
      {children}
    </a>
  );
}

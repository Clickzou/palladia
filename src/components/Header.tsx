"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { booking, mainNav, site, social } from "@/config/site";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
  IconMail,
  IconMap,
  IconPhone,
  IconBell,
  IconCard,
  IconGift,
} from "./icons";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Bandeau superieur : reseaux + contacts */}
      <div className="hidden bg-ink-soft text-white lg:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-2 text-sm">
          <div className="flex items-center gap-2">
            <SocialLink href={social.facebook} label="Facebook"><IconFacebook /></SocialLink>
            <SocialLink href={social.linkedin} label="LinkedIn"><IconLinkedin /></SocialLink>
            <SocialLink href={social.youtube} label="YouTube"><IconYoutube /></SocialLink>
            <SocialLink href={social.instagram} label="Instagram"><IconInstagram /></SocialLink>
          </div>

          <nav className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
              <IconMail /> {site.email}
            </a>
            <a href={site.maps} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-gold">
              <IconMap /> {t("topbar.trouver")}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold">
              <IconPhone /> {site.phone}
            </a>
            <Link href="/recrutement" className="flex items-center gap-2 hover:text-gold">
              <IconBell /> {t("topbar.rejoindre")}
            </Link>
            <Link href="/adelya" className="flex items-center gap-2 hover:text-gold">
              <IconCard /> {t("topbar.fidelite")}
            </Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </div>

      {/* Barre principale */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-6">
          <Link href="/" className="shrink-0 py-3" aria-label={site.name}>
            <Image
              src="/images/logo-palladia.png"
              alt={site.name}
              width={150}
              height={96}
              priority
              className="h-16 w-auto lg:h-20"
            />
          </Link>

          <nav className="mx-auto hidden items-center gap-5 xl:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              const children = "children" in item ? item.children : undefined;
              return (
                <div key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-6 text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold ${
                      active ? "text-gold" : "text-white"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    {children && <span aria-hidden className="text-xs">+</span>}
                  </Link>

                  {children && (
                    <div className="invisible absolute top-full left-0 min-w-56 bg-ink-soft opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                      {children.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          className="block px-5 py-3 text-sm whitespace-nowrap hover:bg-gold hover:text-ink"
                        >
                          {t(`nav.${child.key}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4 xl:ml-0">
            <Link
              href="/coffret-cadeau-hotel-restaurant-toulouse"
              aria-label="Coffrets cadeaux"
              className="hidden text-gold transition-transform hover:scale-110 lg:block"
            >
              <IconGift />
            </Link>
            <a
              href={booking.premium}
              target="_blank"
              rel="noopener"
              className="hidden bg-gold px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-gold-dark md:block"
            >
              {t("nav.reserver")}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
              className="p-2 xl:hidden"
            >
              <span className="block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {open && (
          <nav className="border-t border-white/10 bg-ink-soft xl:hidden">
            {mainNav.map((item) => (
              <div key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm tracking-wide uppercase hover:text-gold"
                >
                  {t(`nav.${item.key}`)}
                </Link>
                {"children" in item &&
                  item.children?.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block px-10 py-2 text-sm text-white/70 hover:text-gold"
                    >
                      {t(`nav.${child.key}`)}
                    </Link>
                  ))}
              </div>
            ))}
            <a
              href={booking.premium}
              target="_blank"
              rel="noopener"
              className="m-6 block bg-gold px-6 py-3 text-center text-sm font-semibold uppercase"
            >
              {t("nav.reserver")}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="flex size-8 items-center justify-center bg-ink text-gold transition-colors hover:bg-gold hover:text-ink"
    >
      {children}
    </a>
  );
}

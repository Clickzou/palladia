"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const FLAGS: Record<Locale, { emoji: string; label: string }> = {
  fr: { emoji: "🇫🇷", label: "Français" },
  en: { emoji: "🇬🇧", label: "English" },
  es: { emoji: "🇪🇸", label: "Español" },
};

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-label={FLAGS[l].label}
          aria-current={l === locale ? "true" : undefined}
          className={`px-1 text-base transition-opacity ${
            l === locale ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
        >
          {FLAGS[l].emoji}
        </button>
      ))}
    </div>
  );
}

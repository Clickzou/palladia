import type { Metadata } from "next";
import EditeurMenus from "@/components/admin/EditeurMenus";

/**
 * Espace d'administration des menus du restaurant.
 *
 * Hors sitemap et hors index : l'adresse n'est pas secrete — rien ne l'est
 * vraiment sur le web — mais elle n'a aucune raison d'apparaitre dans les
 * resultats de recherche. La protection reelle vient de l'authentification et
 * des politiques RLS.
 */
export const metadata: Metadata = {
  title: "Administration des menus — Hôtel Palladia",
  robots: { index: false, follow: false },
};

export default function AdminMenusPage() {
  return <EditeurMenus />;
}

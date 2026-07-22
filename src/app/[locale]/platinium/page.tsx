import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoomPage from "@/components/RoomPage";
import { getRoom } from "@/data/rooms";
import { metadonnees } from "@/data/seo";
import { traduireContenu } from "@/i18n/contenu";

const SLUG = "platinium";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const room = traduireContenu(getRoom(SLUG), locale);
  const base = metadonnees("/platinium", locale);

  // Titre propre a la chambre, alternatives et canonique communes aux pages
  return { ...base, title: room?.metaTitle, description: room?.metaDescription };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const room = traduireContenu(getRoom(SLUG), locale);
  if (!room) notFound();
  return <RoomPage room={room} locale={locale} />;
}

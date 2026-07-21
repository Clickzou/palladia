import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoomPage from "@/components/RoomPage";
import { getRoom } from "@/data/rooms";

const SLUG = "platinium";

export function generateMetadata(): Metadata {
  const room = getRoom(SLUG);
  return { title: room?.metaTitle, description: room?.metaDescription };
}

export default function Page() {
  const room = getRoom(SLUG);
  if (!room) notFound();
  return <RoomPage room={room} />;
}

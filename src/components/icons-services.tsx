/**
 * Pictogrammes des services de l'hotel.
 * Bases sur lucide-react : trace regulier, rendu fiable a toutes les tailles.
 */
import {
  Waves,
  Dumbbell,
  Flower2,
  UtensilsCrossed,
  CircleParking,
  Bus,
  Plane,
  Monitor,
  Shirt,
  Wifi,
  Baby,
  Dog,
  Accessibility,
} from "lucide-react";

/** Cle utilisee dans src/data/hotel.ts → composant d'icone. */
export const PICTOS_SERVICES = {
  piscine: Waves,
  sport: Dumbbell,
  spa: Flower2,
  service: UtensilsCrossed,
  parking: CircleParking,
  bus: Bus,
  navette: Plane,
  business: Monitor,
  pressing: Shirt,
  wifi: Wifi,
  enfant: Baby,
  animaux: Dog,
  pmr: Accessibility,
} as const;

export type CleService = keyof typeof PICTOS_SERVICES;

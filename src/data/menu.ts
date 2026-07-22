import type { Dish } from "@/lib/cart";

// ── Plats principaux ──────────────────────────────────────────
import attieke from "@/assets/dish-attieke.jpg";
import avocat from "@/assets/dish-avocat-oeuf.jpg";
import monyo from "@/assets/dish-salade-poisson.jpg"; // poisson émietté + oignons + poivrons = Monyo
import omelette from "@/assets/dish-omelette.jpg";
import riz from "@/assets/dish-riz.jpg";
import saladeVert from "@/assets/dish-salade.jpg"; // salade verte aux œufs = Salade
import sandwich from "@/assets/dish-sandwich.jpg";
import spaghetti from "@/assets/dish-spaghetti.jpg";
import the from "@/assets/drink-the.jpg";

// ── Pâtes ─────────────────────────────────────────────────────
import pateNoire from "@/assets/dish-pate-noire.jpg";
import pateBlanche from "@/assets/dish-pate-blanche.jpg";

// ── Sauces ────────────────────────────────────────────────────
import sauceBlokoto from "@/assets/sauce-blokoto.jpg";
import sauceCrincrin from "@/assets/sauce-crincrin.jpg";
import sauceGombo from "@/assets/sauce-gombo.jpg";
import sauceLegumes from "@/assets/sauce-legumes.jpg";

// ── Fallback (items sans photo réelle) ────────────────────────
import rizGras from "@/assets/dish-riz-gras.jpg";

export const SAUCES = [
  "Sauce Crincrin",
  "Sauce Légumes",
  "Sauce Gombo",
  "Sauce Blokoto",
  "Sauce Kpama",
] as const;

export type Sauce = (typeof SAUCES)[number];

export type SauceInfo = {
  name: Sauce;
  tagline: string;
  description: string;
  image: string;
};

export const SAUCES_INFO: SauceInfo[] = [
  {
    name: "Sauce Crincrin",
    tagline: "Verte & Gourmande",
    description:
      "Une sauce verte et gourmande à base de feuilles de crincrin, mijotée avec poisson fumé et crevettes. Un grand classique du Sud-Bénin, généreux et réconfortant.",
    image: sauceCrincrin,
  },
  {
    name: "Sauce Légumes",
    tagline: "Traditionnelle & Fraîche",
    description:
      "Une sauce traditionnelle aux légumes locaux, préparée avec soin pour un repas simple et savoureux, fidèle aux habitudes de chez nous.",
    image: sauceLegumes,
  },
  {
    name: "Sauce Gombo",
    tagline: "Févi Onctueuse",
    description:
      "Connue localement sous le nom de Févi, cette sauce onctueuse au gombo se marie parfaitement avec le riz ou la pâte. Un incontournable des tables béninoises.",
    image: sauceGombo,
  },
  {
    name: "Sauce Blokoto",
    tagline: "Tomate Riche & Mijotée",
    description:
      "Une sauce tomate riche et généreuse, mijotée longuement. Un plat de caractère, parfait pour un repas copieux et satisfaisant.",
    image: sauceBlokoto,
  },
  {
    name: "Sauce Kpama",
    tagline: "Kpanman & Goût Profond",
    description:
      "Préparée avec du kpanman (peau de bœuf), cette sauce apporte une texture unique et un goût profond, typique de la cuisine béninoise authentique.",
    image: sauceBlokoto,
  },
];

export const DAYS_OF_WEEK = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export const CATEGORIES = ["Tous les plats", "Petit déjeuner", "Déjeuner", "Dîner"] as const;
export const COMING_SOON_CATEGORIES = ["Pâtisserie", "Glaces", "Boissons"] as const;

// ── Petit déjeuner : TOUJOURS disponible, 7j/7 ───────────────
export const BREAKFAST_MENU: Dish[] = [
  { id: "omelette", name: "Omelette", price: 600, category: "Petit déjeuner", image: omelette, tag: "Frais & Chaud" },
  { id: "sandwich", name: "Sandwich", price: 600, category: "Petit déjeuner", image: sandwich, tag: "Express" },
  { id: "avocat-oeuf", name: "Avocat + œuf", price: 600, category: "Petit déjeuner", image: avocat, tag: "Équilibré" },
  { id: "the", name: "Thé", price: 300, category: "Petit déjeuner", image: the, tag: "Chaud" },
  { id: "fonio", name: "Fonio", price: 600, category: "Petit déjeuner", image: rizGras, featured: true, tag: "Spécialité locale" },
];

// ── Déjeuner : Carte complète toujours disponible ─────────────
export const LUNCH_MENU: Dish[] = [
  { id: "salade-dej", name: "Salade", price: 2000, category: "Déjeuner", image: saladeVert, tag: "Fraîcheur" },
  { id: "riz-dej", name: "Riz", price: 1000, category: "Déjeuner", image: riz, hasSauceOption: true, defaultSauce: "Sauce Gombo", tag: "Sauce au choix" },
  { id: "pate-noire-dej", name: "Pâte noire", price: 700, category: "Déjeuner", image: pateNoire, hasSauceOption: true, defaultSauce: "Sauce Légumes", tag: "Sauce au choix" },
  { id: "pate-blanche-dej", name: "Pâte blanche", price: 700, category: "Déjeuner", image: pateBlanche, hasSauceOption: true, defaultSauce: "Sauce Crincrin", tag: "Sauce au choix" },
  { id: "spaghetti-dej", name: "Spaghetti", price: 1000, category: "Déjeuner", image: spaghetti, hasSauceOption: true, defaultSauce: "Sauce Blokoto", tag: "Sauce au choix" },
  { id: "monyo-dej", name: "Monyo", price: 1000, category: "Déjeuner", image: monyo, tag: "Plat traditionnel" },
  { id: "attieke-dej", name: "Attiéké", price: 1000, category: "Déjeuner", image: attieke, featured: true, tag: "Incontournable" },
];

// ── Dîner : Carte complète toujours disponible ────────────────
export const DINNER_MENU: Dish[] = [
  { id: "pate-noire-din", name: "Pâte noire", price: 700, category: "Dîner", image: pateNoire, hasSauceOption: true, defaultSauce: "Sauce Crincrin", tag: "Sauce au choix" },
  { id: "pate-blanche-din", name: "Pâte blanche", price: 700, category: "Dîner", image: pateBlanche, hasSauceOption: true, defaultSauce: "Sauce Blokoto", tag: "Sauce au choix" },
  { id: "riz-din", name: "Riz", price: 1000, category: "Dîner", image: riz, hasSauceOption: true, defaultSauce: "Sauce Gombo", tag: "Sauce au choix" },
  { id: "monyo-din", name: "Monyo", price: 1000, category: "Dîner", image: monyo, tag: "Plat traditionnel" },
];

export type DaySchedule = {
  day: DayOfWeek;
  suggestedBreakfastNames: string[];
  suggestedLunchNames: string[];
  suggestedDinnerNames: string[];
  lunch: Dish[];
  dinner: Dish[];
};

export const WEEKLY_SCHEDULE: Record<DayOfWeek, DaySchedule> = {
  Lundi: {
    day: "Lundi",
    suggestedBreakfastNames: ["Omelette", "Thé"],
    suggestedLunchNames: ["Pâte blanche", "Spaghetti"],
    suggestedDinnerNames: ["Riz"],
    lunch: [
      { id: "lundi-pate-blanche", name: "Pâte blanche", price: 700, category: "Déjeuner", image: pateBlanche, defaultSauce: "Sauce Kpama", hasSauceOption: true, tag: "Sauce Kpama", featured: true },
      { id: "lundi-spaghetti", name: "Spaghetti", price: 1000, category: "Déjeuner", image: spaghetti, hasSauceOption: true, defaultSauce: "Sauce Blokoto", tag: "Sauce Blokoto" },
    ],
    dinner: [
      { id: "lundi-riz-din", name: "Riz", price: 1000, category: "Dîner", image: riz, hasSauceOption: true, tag: "Sauce au choix" },
    ],
  },

  Mardi: {
    day: "Mardi",
    suggestedBreakfastNames: ["Sandwich", "Thé"],
    suggestedLunchNames: ["Pâte blanche", "Riz"],
    suggestedDinnerNames: ["Monyo"],
    lunch: [
      { id: "mardi-pate-blanche", name: "Pâte blanche", price: 700, category: "Déjeuner", image: pateBlanche, defaultSauce: "Sauce Crincrin", hasSauceOption: true, tag: "Sauce Crincrin", featured: true },
      { id: "mardi-riz-dej", name: "Riz", price: 1000, category: "Déjeuner", image: riz, hasSauceOption: true, tag: "Sauce au choix" },
    ],
    dinner: [
      { id: "mardi-monyo-din", name: "Monyo", price: 1000, category: "Dîner", image: monyo, tag: "Plat traditionnel" },
    ],
  },

  Mercredi: {
    day: "Mercredi",
    suggestedBreakfastNames: ["Avocat + œuf"],
    suggestedLunchNames: ["Pâte noire", "Salade"],
    suggestedDinnerNames: ["Riz"],
    lunch: [
      { id: "mercredi-pate-noire", name: "Pâte noire", price: 700, category: "Déjeuner", image: pateNoire, defaultSauce: "Sauce Légumes", hasSauceOption: true, tag: "Sauce Légumes", featured: true },
      { id: "mercredi-salade", name: "Salade", price: 2000, category: "Déjeuner", image: saladeVert, tag: "Fraîcheur" },
    ],
    dinner: [
      { id: "mercredi-riz-din", name: "Riz", price: 1000, category: "Dîner", image: riz, hasSauceOption: true, tag: "Sauce au choix" },
    ],
  },

  Jeudi: {
    day: "Jeudi",
    suggestedBreakfastNames: ["Fonio"],
    suggestedLunchNames: ["Attiéké", "Pâte noire", "Spaghetti"],
    suggestedDinnerNames: ["Pâte blanche"],
    lunch: [
      { id: "jeudi-attieke", name: "Attiéké", price: 1000, category: "Déjeuner", image: attieke, featured: true, tag: "Incontournable" },
      { id: "jeudi-pate-noire", name: "Pâte noire", price: 700, category: "Déjeuner", image: pateNoire, defaultSauce: "Sauce Blokoto", hasSauceOption: true, tag: "Sauce Blokoto" },
      { id: "jeudi-spaghetti", name: "Spaghetti", price: 1000, category: "Déjeuner", image: spaghetti, hasSauceOption: true, defaultSauce: "Sauce Blokoto", tag: "Sauce Blokoto" },
    ],
    dinner: [
      { id: "jeudi-pate-blanche", name: "Pâte blanche", price: 700, category: "Dîner", image: pateBlanche, defaultSauce: "Sauce Gombo", hasSauceOption: true, tag: "Sauce Gombo" },
    ],
  },

  Vendredi: {
    day: "Vendredi",
    suggestedBreakfastNames: ["Sandwich", "Thé"],
    suggestedLunchNames: ["Spaghetti", "Pâte blanche"],
    suggestedDinnerNames: ["Monyo"],
    lunch: [
      { id: "vendredi-spaghetti", name: "Spaghetti", price: 1000, category: "Déjeuner", image: spaghetti, featured: true, hasSauceOption: true, defaultSauce: "Sauce Blokoto", tag: "Sauce Blokoto" },
      { id: "vendredi-pate-blanche", name: "Pâte blanche", price: 700, category: "Déjeuner", image: pateBlanche, defaultSauce: "Sauce Légumes", hasSauceOption: true, tag: "Sauce Légumes" },
    ],
    dinner: [
      { id: "vendredi-monyo-din", name: "Monyo", price: 1000, category: "Dîner", image: monyo, tag: "Plat traditionnel" },
    ],
  },

  Samedi: {
    day: "Samedi",
    suggestedBreakfastNames: ["Avocat + œuf"],
    suggestedLunchNames: ["Riz", "Pâte blanche", "Attiéké"],
    suggestedDinnerNames: ["Pâte noire"],
    lunch: [
      { id: "samedi-riz-dej", name: "Riz", price: 1000, category: "Déjeuner", image: riz, featured: true, hasSauceOption: true, tag: "Sauce au choix" },
      { id: "samedi-pate-blanche", name: "Pâte blanche", price: 700, category: "Déjeuner", image: pateBlanche, defaultSauce: "Sauce Kpama", hasSauceOption: true, tag: "Sauce Kpama" },
      { id: "samedi-attieke", name: "Attiéké", price: 1000, category: "Déjeuner", image: attieke, tag: "Incontournable" },
    ],
    dinner: [
      { id: "samedi-pate-noire", name: "Pâte noire", price: 700, category: "Dîner", image: pateNoire, defaultSauce: "Sauce Crincrin", hasSauceOption: true, tag: "Sauce Crincrin" },
    ],
  },

  Dimanche: {
    day: "Dimanche",
    suggestedBreakfastNames: ["Fonio"],
    suggestedLunchNames: ["Salade", "Pâte noire", "Attiéké"],
    suggestedDinnerNames: ["Pâte blanche"],
    lunch: [
      { id: "dimanche-salade", name: "Salade", price: 2000, category: "Déjeuner", image: saladeVert, featured: true, tag: "Fraîcheur Dimanche" },
      { id: "dimanche-pate-noire", name: "Pâte noire", price: 700, category: "Déjeuner", image: pateNoire, defaultSauce: "Sauce Gombo", hasSauceOption: true, tag: "Sauce Gombo" },
      { id: "dimanche-attieke", name: "Attiéké", price: 1000, category: "Déjeuner", image: attieke, tag: "Incontournable" },
    ],
    dinner: [
      { id: "dimanche-pate-blanche", name: "Pâte blanche", price: 700, category: "Dîner", image: pateBlanche, defaultSauce: "Sauce Blokoto", hasSauceOption: true, tag: "Sauce Blokoto" },
    ],
  },
};

// Fonction utilitaire pour obtenir le nom du jour courant en français
export function getTodayName(): DayOfWeek {
  const days: DayOfWeek[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const dayIdx = new Date().getDay();
  return days[dayIdx];
}

// Menu global combinant Petit Dej + Déjeuner + Dîner
export const MENU: Dish[] = [
  ...BREAKFAST_MENU,
  ...LUNCH_MENU,
  ...DINNER_MENU,
];

import type { Dish } from "@/lib/cart";
import rizGras from "@/assets/dish-riz-gras.jpg";
import pateRouge from "@/assets/dish-pate-rouge.jpg";
import igname from "@/assets/dish-igname.jpg";
import attieke from "@/assets/dish-attieke.jpg";
import pouletFrites from "@/assets/dish-poulet-frites.jpg";
import gombo from "@/assets/dish-gombo.jpg";
import bissap from "@/assets/drink-bissap.jpg";
import croissant from "@/assets/pastry-croissant.jpg";
import iceVanilla from "@/assets/ice-vanilla.jpg";

export const MENU: Dish[] = [
  { id: "riz-gras", name: "Riz gras au poulet", price: 2000, category: "Plats du jour", image: rizGras, featured: true, tag: "Spécialité" },
  { id: "pate-rouge", name: "Pâte rouge sauce tomate", price: 1500, category: "Plats du jour", image: pateRouge },
  { id: "igname", name: "Igname pilée sauce arachide", price: 2200, category: "Plats du jour", image: igname },
  { id: "attieke", name: "Attiéké poisson braisé", price: 2500, category: "Plats du jour", image: attieke },
  { id: "poulet-frites", name: "Poulet braisé frites", price: 3000, category: "Plats du jour", image: pouletFrites },
  { id: "gombo", name: "Sauce gombo viande", price: 2000, category: "Plats du jour", image: gombo },
  { id: "riz-graine", name: "Riz sauce graine", price: 1800, category: "Plats du jour", image: rizGras },
  { id: "spaghetti", name: "Spaghetti sauce viande", price: 1800, category: "Plats du jour", image: pateRouge },

  { id: "croissant", name: "Croissant", price: 400, category: "Pâtisserie", image: croissant },
  { id: "pain-choco", name: "Pain au chocolat", price: 500, category: "Pâtisserie", image: croissant },
  { id: "quatre-quarts", name: "Gâteau quatre-quarts", price: 800, category: "Pâtisserie", image: croissant },
  { id: "beignet", name: "Beignet sucré", price: 200, category: "Pâtisserie", image: croissant },

  { id: "glace-vanille", name: "Glace vanille", price: 700, category: "Glaces", image: iceVanilla },
  { id: "glace-choco", name: "Glace chocolat", price: 700, category: "Glaces", image: iceVanilla },
  { id: "glace-fraise", name: "Glace fraise", price: 700, category: "Glaces", image: iceVanilla },
  { id: "glace-coco", name: "Glace coco", price: 700, category: "Glaces", image: iceVanilla },

  { id: "bissap", name: "Jus bissap", price: 500, category: "Boissons", image: bissap },
  { id: "gingembre", name: "Jus gingembre", price: 500, category: "Boissons", image: bissap },
  { id: "eau", name: "Eau minérale", price: 300, category: "Boissons", image: bissap },
  { id: "soda", name: "Soda", price: 500, category: "Boissons", image: bissap },
  { id: "ananas", name: "Jus d'ananas", price: 600, category: "Boissons", image: bissap },
];

export const CATEGORIES = ["Plats du jour", "Entrées", "Pâtisserie", "Glaces", "Boissons"] as const;

export const DAILY_MENU_IDS = ["riz-gras", "attieke", "poulet-frites", "gombo"];

export const WEEK_MENU: { day: string; dishes: string[] }[] = [
  { day: "Lundi", dishes: ["Riz gras au poulet", "Sauce gombo viande", "Attiéké poisson braisé"] },
  { day: "Mardi", dishes: ["Pâte rouge sauce tomate", "Poulet braisé frites", "Riz sauce graine"] },
  { day: "Mercredi", dishes: ["Igname pilée sauce arachide", "Spaghetti sauce viande", "Attiéké poisson braisé"] },
  { day: "Jeudi", dishes: ["Riz gras au poulet", "Pâte rouge sauce tomate", "Sauce gombo viande"] },
  { day: "Vendredi", dishes: ["Poulet braisé frites", "Attiéké poisson braisé", "Riz sauce graine"] },
  { day: "Samedi", dishes: ["Spaghetti sauce viande", "Igname pilée sauce arachide", "Riz gras au poulet"] },
  { day: "Dimanche", dishes: ["Poulet braisé frites", "Sauce gombo viande", "Pâte rouge sauce tomate"] },
];

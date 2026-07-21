import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChefHat,
  Sparkles,
  Truck,
  Users,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Calendar,
  Maximize2,
  X,
  HeartHandshake,
  ShoppingBag,
} from "lucide-react";
import { CartProvider, useCart, formatFCFA } from "@/lib/cart";
import { MENU, CATEGORIES, DAILY_MENU_IDS, WEEK_MENU } from "@/data/menu";
import { SITE, buildWhatsAppUrl } from "@/lib/site-config";
import { Header } from "@/components/anifath/Header";
import { CartPanel } from "@/components/anifath/CartPanel";
import { DishCard } from "@/components/anifath/DishCard";
import { useReveal } from "@/hooks/use-reveal";
import heroDishFallback from "@/assets/hero-dish.jpg";
import kitchen1 from "@/assets/kitchen-1.jpg";
import kitchen2 from "@/assets/kitchen-2.jpg";
import kitchen3 from "@/assets/kitchen-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Cantine de l'Ordre de Malte de Djougou — Repas frais et faits maison" },
      {
        name: "description",
        content:
          "La Cantine de l'Ordre de Malte de Djougou te propose des plats faits maison, cuisinés frais chaque jour. Commande rapide sur WhatsApp ou par téléphone, livraison disponible.",
      },
      { property: "og:title", content: "La Cantine — Des plats faits maison, commandés en un instant" },
      { property: "og:description", content: "La Cantine de l'Ordre de Malte de Djougou te prépare de bons repas frais, chaque jour. Choisis, commande, récupère — sans attendre." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}

function HomeContent() {
  const { count, setOpen } = useCart();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => setLoading(false), 700);
      return () => clearTimeout(hideTimer);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-brown-dark selection:bg-coral selection:text-cream">
      {/* Preloader loading screen with Maltese cross brand logo */}
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FEFCF7] transition-all duration-700 ease-out ${
            fadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
            {/* Pulsing Logo */}
            <div className="relative animate-pulse-slow">
              <img
                src="/logo-cantine.png"
                alt="La Cantine de l'Ordre de Malte de Djougou"
                className="w-64 sm:w-80 h-auto drop-shadow-md"
              />
            </div>
            
            {/* Shimmering Loading bar */}
            <div className="relative w-48 h-1.5 bg-cream-soft rounded-full overflow-hidden border border-border/20">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-coral to-amber rounded-full animate-loading-bar" />
            </div>
            
            <p className="font-display text-xs font-bold text-brown-dark/50 tracking-widest uppercase animate-pulse">
              Chargement...
            </p>
          </div>
        </div>
      )}

      <Header />
      <main>
        <Hero />
        <TrustBar />
        <MenuSection />
        <Gallery />
        <Offer />
        <HowToOrder />
        <Testimonials />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
      <CartPanel />

      {/* Bouton de commande flottant en bas à droite (visible toujours ou quand il y a des articles, montrons-le toujours pour faciliter l'accès comme demandé) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Voir la commande"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-coral text-cream shadow-2xl shadow-coral/45 ring-4 ring-background transition-all duration-300 hover:scale-110 hover:bg-coral-dark active:scale-95 group"
      >
        <ShoppingBag className="h-7 w-7 text-cream transition-transform group-hover:rotate-6" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-brown-dark px-1.5 text-[10px] font-black text-cream shadow-lg ring-2 ring-background animate-bounce">
            {count}
          </span>
        )}
      </button>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`reveal scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

function EyebrowTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-coral ring-1 ring-coral/20">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-black leading-tight text-brown-dark sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base font-medium text-brown-dark/70 sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [offset, setOffset] = useState(0);
  const { setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Liste de sélection de plats pour le défilement automatique (effet vidéo montrant la diversité)
  const slideshowDishes = useMemo(() => {
    const ids = ["riz-gras", "pate-rouge", "igname", "attieke", "poulet-frites", "gombo"];
    return MENU.filter((d) => ids.includes(d.id));
  }, []);

  const [slideIndex, setSlideIndex] = useState(0);

  // Effet de défilement automatique simulant une boucle vidéo de présentation des plats
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowDishes.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [slideshowDishes.length]);

  const activeDish = slideshowDishes[slideIndex] || slideshowDishes[0];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-cream via-cream/60 to-background pb-16 pt-8 sm:pb-24 sm:pt-14">
      {/* Background Animated Orbs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-amber/30 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-coral/25 blur-[100px] animate-pulse-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-12">
        {/* Left Column: Text & CTA */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-800">
          {/* Live Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-background/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brown-dark shadow-sm ring-1 ring-border/80 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>Ouvert aujourd'hui • 6h30 - 22h00</span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.08] tracking-tight text-brown-dark sm:text-5xl lg:text-6xl">
            Des plats faits maison,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-coral to-amber bg-clip-text text-transparent">
                commandés en un instant
              </span>
              <span className="absolute -bottom-1.5 left-0 z-0 h-3.5 w-full rounded-full bg-amber/35 -rotate-1" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-brown-dark/80 sm:text-lg">
            La Cantine de l'Ordre de Malte de Djougou te prépare de bons repas frais, chaque jour. Choisis, commande, récupère — sans attendre.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-coral to-coral-dark px-7 py-4 font-display text-sm font-bold text-cream shadow-xl shadow-coral/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Voir le menu du jour</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-full bg-background px-6 py-4 font-display text-sm font-bold text-brown-dark ring-1 ring-border shadow-sm transition-all duration-300 hover:bg-cream-soft hover:shadow-md active:scale-95"
            >
              <ShoppingBag className="h-4 w-4 text-coral" />
              <span>Commander maintenant</span>
            </button>
          </div>

          {/* Stats Bar */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 rounded-3xl bg-background/80 p-5 ring-1 ring-border/80 backdrop-blur-md shadow-sm">
            {[
              { k: "400+", v: "repas / jour" },
              { k: "7j/7", v: "service continu" },
              { k: "15 min", v: "prêt rapide" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <dt className="font-display text-2xl font-black text-coral">{s.k}</dt>
                <dd className="mt-0.5 text-xs font-bold text-brown-dark/70">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right Column: Carrousel automatique cinématique simulant la vidéo de défilement des plats */}
        <div className="relative flex justify-center w-full">
          <div
            className="animate-float relative aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl shadow-coral/25 ring-8 ring-background/90 sm:aspect-[4/5] sm:max-w-lg animate-in fade-in duration-1000"
            style={{ transform: `translateY(${-offset}px)` }}
          >
            {slideshowDishes.map((d, i) => {
              const isActive = i === slideIndex;
              return (
                <div
                  key={d.id}
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                    isActive ? "opacity-100 scale-105 rotate-0" : "opacity-0 scale-95 rotate-1 pointer-events-none"
                  }`}
                >
                  <img
                    src={d.image || heroDishFallback}
                    alt={d.name}
                    className="h-full w-full object-cover"
                    width={1600}
                    height={1400}
                  />
                </div>
              );
            })}

            {/* Inset highlight shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Card 1: Active Dish name */}
          <div className="animate-float-delayed absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl bg-background/95 p-4 shadow-xl ring-1 ring-border/80 backdrop-blur-xl sm:flex transition-all duration-500">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber/20 text-amber">
              <ChefHat className="h-6 w-6" />
            </div>
            <div className="min-w-[125px]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brown-dark/60">Spécialité Maison</p>
              <p className="font-display text-sm font-extrabold text-brown-dark truncate transition-all duration-300">
                {activeDish.name}
              </p>
            </div>
          </div>

          {/* Floating Card 2: Price Tag */}
          <div className="animate-float absolute -right-3 top-8 hidden rounded-full bg-coral px-5 py-2.5 font-display text-sm font-black text-cream shadow-xl shadow-coral/30 ring-4 ring-background shimmer-badge sm:block transition-all duration-300">
            {formatFCFA(activeDish.price)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust Bar ---------- */
function TrustBar() {
  const items = [
    { icon: ChefHat, text: "Fait maison, chaque jour" },
    { icon: Sparkles, text: "Prêt en quelques clics, sans file d'attente" },
    { icon: Truck, text: "Livraison en chambre disponible" },
    { icon: Users, text: "Ouvert à tous — personnel, patients, visiteurs" },
  ];
  return (
    <Section className="bg-brown-dark py-12 text-cream shadow-inner">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.text} className="flex items-center gap-4 rounded-2xl bg-cream/5 p-4 ring-1 ring-cream/10 backdrop-blur-sm transition-transform duration-300 hover:scale-102">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/25 text-amber">
              <it.icon className="h-6 w-6" />
            </div>
            <p className="min-w-0 font-display text-sm font-bold leading-snug text-cream/90">{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Menu Section ---------- */
function MenuSection() {
  const [cat, setCat] = useState<string>("Plats du jour");
  const [weekOpen, setWeekOpen] = useState(false);
  const daily = MENU.filter((d) => DAILY_MENU_IDS.includes(d.id));
  const filtered = useMemo(
    () => MENU.filter((d) => (cat === "Entrées" ? d.category === "Plats du jour" : d.category === cat)),
    [cat],
  );

  return (
    <Section id="menu" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Notre carte"
          title="Le menu du jour"
          sub="Nouveau menu chaque jour. Ajoute tes plats, ton panier se remplit tout seul."
        />

        {/* Highlight Banner du jour */}
        <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-coral via-coral-dark to-brown-dark/95 p-6 text-cream shadow-2xl shadow-coral/20 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cream backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-amber" />
                Menu du jour fraîchement préparé
              </span>
              <h3 className="mt-2 font-display text-2xl font-black text-cream sm:text-3xl">
                À la une aujourd'hui à La Cantine
              </h3>
            </div>
            <button
              onClick={() => setWeekOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 font-display text-xs font-bold text-coral shadow-md transition-all duration-300 hover:bg-background hover:scale-105 active:scale-95"
            >
              <Calendar className="h-4 w-4" />
              <span>Voir le planning de la semaine</span>
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {daily.map((d) => (
              <div key={d.id} className="group rounded-2xl bg-cream/10 p-4 backdrop-blur-md ring-1 ring-cream/20 transition-all hover:bg-cream/20">
                <p className="font-display text-base font-extrabold text-cream">{d.name}</p>
                <p className="mt-1 font-display text-sm font-bold text-amber">{formatFCFA(d.price)}</p>
              </div>
            ))}
          </div>

          {weekOpen && (
            <div className="mt-6 grid gap-4 rounded-3xl bg-brown-dark/60 p-6 backdrop-blur-md ring-1 ring-cream/15 animate-in fade-in slide-in-from-top-4 duration-400 sm:grid-cols-2 lg:grid-cols-4">
              {WEEK_MENU.map((w) => (
                <div key={w.day} className="rounded-2xl bg-cream/5 p-4 ring-1 ring-cream/10">
                  <p className="font-display text-xs font-black uppercase tracking-wider text-amber">
                    {w.day}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs font-medium text-cream/90">
                    {w.dishes.map((n) => (
                      <li key={n} className="flex items-center gap-1.5">
                        <span className="text-amber">•</span> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 font-display text-xs font-bold transition-all duration-300 ${
                cat === c
                  ? "bg-brown-dark text-cream shadow-lg shadow-brown-dark/20 scale-105"
                  : "bg-cream text-brown-dark ring-1 ring-border/80 hover:bg-cream-soft hover:scale-102"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((d, idx) => (
            <DishCard key={d.id} dish={d} big={cat === "Plats du jour" && idx === 0} />
          ))}
        </div>

        {/* Voir toute la carte Button */}
        <div className="mt-12 text-center">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 font-display text-xs font-bold text-brown-dark ring-1 ring-border transition-all hover:bg-cream-soft hover:scale-102"
          >
            <span>Voir toute la carte</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Gallery Section ---------- */
function Gallery() {
  const imgs = [
    { src: kitchen1, title: "Préparation des assiettes", desc: "Chefs à l'œuvre pour composer vos repas" },
    { src: kitchen2, title: "Service & Dressage", desc: "Soin particulier porté à chaque plat" },
    { src: kitchen3, title: "Ingrédients Frais", desc: "Sélection quotidienne auprès de nos producteurs" },
    { src: kitchen1, title: "Cuisine Spacieuse", desc: "Hygiène et respect strict des normes de sécurité" },
    { src: kitchen2, title: "Plats Prêts à Livrer", desc: "Chauds et emballés hermétiquement" },
  ];

  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <Section id="gallery" className="bg-cream/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Coulisses"
          title="Dans nos cuisines"
          sub="Fraîcheur et hygiène, à chaque étape."
        />

        {/* Gallery Grid */}
        <div className="relative mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imgs.slice(0, 3).map((im, i) => (
              <div
                key={i}
                onClick={() => setActiveModal(i)}
                className="dish-hover group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2rem] bg-card shadow-md ring-1 ring-border/80"
              >
                <img
                  src={im.src}
                  alt={im.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-lg font-black text-cream">{im.title}</h3>
                    <p className="text-xs font-medium text-cream/80">{im.desc}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-dark/90 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-3xl overflow-hidden rounded-[2.5rem] bg-card p-2 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-brown-dark text-cream transition-transform hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={imgs[activeModal].src}
              alt={imgs[activeModal].title}
              className="max-h-[75vh] w-full rounded-[2rem] object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-extrabold text-brown-dark">{imgs[activeModal].title}</h3>
              <p className="mt-1 text-sm font-medium text-brown-dark/70">{imgs[activeModal].desc}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ---------- Offer Section ---------- */
function Offer() {
  const offer1 = MENU.find((d) => d.id === "poulet-frites")!;
  const offer2 = MENU.find((d) => d.id === "attieke")!;
  const { add } = useCart();

  return (
    <Section id="offer" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Promotions"
          title="L'offre du moment"
          sub="Une envie ? Profite de nos plats du moment, à prix doux."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[offer1, offer2].map((d, i) => {
            const promoPrice = Math.round(d.price * 0.85);
            return (
              <article
                key={d.id}
                className="dish-hover group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cream via-amber/15 to-coral/10 p-6 ring-1 ring-border/80 shadow-md sm:p-8"
              >
                <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream shadow-md shimmer-badge">
                      <Sparkles className="h-3 w-3" />
                      {i === 0 ? "Offre Spéciale -15%" : "Menu Combo Express"}
                    </span>

                    <h3 className="mt-4 font-display text-2xl font-black text-brown-dark sm:text-3xl">
                      {d.name} + Jus Frais
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-relaxed text-brown-dark/80 sm:text-sm">
                      Un repas gourmand et équilibré préparé avec passion par nos chefs.
                    </p>

                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="font-display text-3xl font-black text-coral">{formatFCFA(promoPrice)}</span>
                      <span className="text-sm font-bold text-brown-dark/50 line-through">
                        {formatFCFA(d.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => add({ ...d, price: promoPrice })}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-brown-dark px-6 py-3.5 font-display text-xs font-bold text-cream shadow-lg transition-all duration-300 hover:bg-coral hover:scale-105 active:scale-95"
                    >
                      <span>J'en profite</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {d.image && (
                    <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl ring-4 ring-background shadow-lg sm:h-44 sm:w-44">
                      <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- How to Order ---------- */
function HowToOrder() {
  const steps = [
    { n: "01", title: "Choisis tes plats", desc: "Parcours le menu, ajoute ce qui te tente" },
    { n: "02", title: "Envoie ta commande", desc: "Un message WhatsApp ou un appel, en quelques secondes" },
    { n: "03", title: "Récupère et régale-toi", desc: "Sur place ou directement en chambre" },
  ];

  return (
    <Section className="bg-brown-dark py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-cream/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber ring-1 ring-amber/20">
            Rapidité & Simplicité
          </span>
          <h2 className="font-display text-3xl font-black leading-tight text-cream sm:text-4xl md:text-5xl">
            Trois étapes, et c'est prêt
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="group relative rounded-[2rem] bg-cream/5 p-8 ring-1 ring-cream/10 backdrop-blur-md transition-all duration-300 hover:bg-cream/10 hover:scale-103">
              <span className="font-display text-5xl font-black text-amber/40 transition-colors group-hover:text-amber">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-black text-cream">{s.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-cream/70">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { name: "Aïcha K.", role: "Infirmière à l'hôpital", quote: "Le seul endroit où je mange sainement et copieusement pendant mes gardes. Mention spéciale au riz gras !" },
    { name: "Marc D.", role: "Patient", quote: "Commande passée sur WhatsApp depuis mon lit d'hôpital. Livré chaud directement en chambre en un instant." },
    { name: "Fatima B.", role: "Visiteuse", quote: "La nourriture est propre, savoureuse et le personnel est d'une gentillesse remarquable." },
    { name: "Kevin O.", role: "Habitant de Djougou", quote: "Des portions généreuses, des prix très abordables et toujours prêt rapidement à emporter." },
  ];

  return (
    <Section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Avis clients"
          title="Ils se sont régalés"
          sub="Ce que disent nos clients, à l'hôpital et en ville."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <figure key={t.name} className="dish-hover flex flex-col justify-between rounded-[2rem] bg-cream/60 p-6 ring-1 ring-border/80">
              <div>
                <div className="flex gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm font-medium leading-relaxed text-brown-dark/85">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-coral to-amber font-display text-sm font-bold text-cream">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-extrabold text-brown-dark">{t.name}</p>
                  <p className="text-xs font-semibold text-brown-dark/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ Accordion ---------- */
function FAQ() {
  const qs = [
    { q: "Est-ce que je peux commander depuis ma chambre ?", a: "Oui, indique simplement le numéro de ta chambre et ton service lors de la commande." },
    { q: "Quels sont les moyens de paiement acceptés ?", a: "Tu peux payer en espèces à la livraison, ou par Mobile Money (MTN Mobile Money, Moov Money) à la commande." },
    { q: "La cantine est-elle ouverte au public, pas seulement à l'hôpital ?", a: "Absolument ! La Cantine est ouverte à tous : personnel de l'hôpital, patients, visiteurs, et tous les habitants de Djougou." },
    { q: "Quels sont vos horaires d'ouverture ?", a: "Nous sommes ouverts tous les jours, du lundi au dimanche, de 06h30 à 22h00." },
    { q: "Proposez-vous des plats pour régimes spécifiques ?", a: "Oui, nos chefs s'adaptent. Contacte-nous directement pour nous préciser tes besoins nutritionnels." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="bg-cream/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <EyebrowTitle eyebrow="FAQ" title="Tes questions, nos réponses" sub="Toutes les réponses à tes interrogations." />

        <ul className="mt-12 space-y-4">
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={`overflow-hidden rounded-[2rem] bg-card transition-all duration-300 ${
                  isOpen ? "ring-2 ring-coral shadow-lg" : "ring-1 ring-border/80"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-base font-extrabold text-brown-dark sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-coral text-cream" : "bg-cream text-brown-dark"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm font-medium leading-relaxed text-brown-dark/75 animate-in fade-in duration-300">
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative grid grid-cols-2 gap-4">
          <img src={kitchen1} alt="Équipe La Cantine" loading="lazy" className="col-span-2 aspect-[16/9] w-full rounded-[2rem] object-cover shadow-md" />
          <img src={kitchen3} alt="Ingrédients frais" loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover shadow-md" />
          <img src={kitchen2} alt="Plats généreux" loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover shadow-md" />
        </div>
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-coral">
            <HeartHandshake className="h-3.5 w-3.5" />
            Notre Passion
          </span>
          <h2 className="font-display text-3xl font-black leading-tight text-brown-dark sm:text-4xl md:text-5xl">
            L'histoire de la Cantine
          </h2>
          <p className="mt-6 text-base font-medium leading-relaxed text-brown-dark/80 sm:text-lg">
            La Cantine de l'Ordre de Malte de Djougou prépare chaque jour des repas frais et faits maison pour tous ceux qui en ont besoin — le personnel de l'hôpital, les patients, les visiteurs, et tous les habitants de Djougou. Une cuisine simple, généreuse, et toujours prête rapidement.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "100%", v: "Fait maison" },
              { k: "Hygiène", v: "Contrôlée 7j/7" },
              { k: "Service", v: "Chaleureux" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-cream p-4 text-center ring-1 ring-border/80">
                <p className="font-display text-lg font-black text-coral">{s.k}</p>
                <p className="mt-1 text-xs font-bold text-brown-dark/70">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <Section id="contact" className="bg-brown-dark py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-cream/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber ring-1 ring-amber/20">
            Localisation & Infos
          </span>
          <h2 className="font-display text-3xl font-black leading-tight text-cream sm:text-4xl md:text-5xl">
            Nous trouver
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, title: "Horaires", lines: [SITE.hours, "Service continu 7j/7"] },
            { icon: MapPin, title: "Localisation", lines: [SITE.address, "Djougou, Bénin"] },
            { icon: Truck, title: "Zones desservies", lines: ["Chambres d'hôpital", "Bureaux et ville de Djougou"] },
            { icon: Phone, title: "Contact direct", lines: [`WhatsApp : ${SITE.whatsapp.substring(3)}`, `Appel : ${SITE.phone.replace("+229 ", "")}`] },
          ].map((b) => (
            <div key={b.title} className="rounded-[2rem] bg-cream/5 p-6 ring-1 ring-cream/10 backdrop-blur-md transition-all duration-300 hover:bg-cream/10">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral text-cream shadow-md">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-black text-cream">{b.title}</h3>
              <div className="mt-2 space-y-1 text-xs font-medium text-cream/75">
                {b.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href={buildWhatsAppUrl(`Bonjour, je souhaite passer une commande.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-coral to-amber px-8 py-4 font-display text-sm font-black text-cream shadow-xl shadow-coral/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Écrire sur WhatsApp</span>
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-cream px-8 py-4 font-display text-sm font-bold text-brown-dark shadow-md transition-all duration-300 hover:bg-cream-soft hover:scale-105 active:scale-95"
          >
            <Phone className="h-4 w-4 text-coral" />
            <span>Appeler {SITE.phone}</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-background pt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-coral via-coral-dark to-brown-dark p-8 text-center text-cream shadow-2xl sm:p-14">
          <h2 className="font-display text-3xl font-black sm:text-4xl md:text-5xl">
            Une envie ? Commande en un instant.
          </h2>
          <p className="mt-4 text-sm font-medium text-cream/80 sm:text-base">
            La Cantine de l'Ordre de Malte de Djougou prépare chaque jour des repas frais et faits maison.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={buildWhatsAppUrl(`Bonjour, je souhaite commander.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream px-8 py-4 font-display text-sm font-extrabold text-coral shadow-lg transition-all duration-300 hover:bg-background hover:scale-105"
            >
              Commander sur WhatsApp
            </a>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="rounded-full bg-brown-dark px-8 py-4 font-display text-sm font-extrabold text-cream shadow-lg ring-1 ring-cream/20 transition-all duration-300 hover:bg-brown-dark/80 hover:scale-105"
            >
              Appeler directement
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-8 text-xs font-bold text-brown-dark/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.fullName}. Tous droits réservés.</p>
          <p>{SITE.hours}</p>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-coral transition-colors">Accueil</a>
            <a href="#menu" className="hover:text-coral transition-colors">Menu</a>
            <a href="#contact" className="hover:text-coral transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

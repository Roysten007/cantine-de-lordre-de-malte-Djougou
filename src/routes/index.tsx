import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
} from "lucide-react";
import { CartProvider, useCart, formatFCFA } from "@/lib/cart";
import { MENU, CATEGORIES, DAILY_MENU_IDS, WEEK_MENU } from "@/data/menu";
import { SITE, buildWhatsAppUrl } from "@/lib/site-config";
import { Header } from "@/components/anifath/Header";
import { CartPanel } from "@/components/anifath/CartPanel";
import { DishCard } from "@/components/anifath/DishCard";
import { useReveal } from "@/hooks/use-reveal";
import heroDish from "@/assets/hero-dish.jpg";
import kitchen1 from "@/assets/kitchen-1.jpg";
import kitchen2 from "@/assets/kitchen-2.jpg";
import kitchen3 from "@/assets/kitchen-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anifath Resto — Cantine hospitalière & restaurant à Cotonou" },
      {
        name: "description",
        content:
          "Anifath Resto : plats faits maison, frais chaque jour, à l'hôpital comme en ville. Commande sur WhatsApp ou par téléphone, livraison en chambre disponible.",
      },
      { property: "og:title", content: "Anifath Resto — Des plats faits maison, prêts pour toi" },
      { property: "og:description", content: "Cantine hospitalière & resto ouvert à tous à Cotonou. Commande sur WhatsApp." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
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
      </div>
    </CartProvider>
  );
}

/* ---------- Section wrappers ---------- */

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
        <p className="mb-3 inline-block rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-extrabold leading-tight text-brown-dark sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 rounded-full bg-coral/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-coral backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Fait maison, chaque jour
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brown-dark sm:text-5xl lg:text-6xl">
            Des plats faits maison,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">prêts pour toi</span>
              <span className="absolute -bottom-1 left-0 z-0 h-3 w-full rounded-full bg-amber/50" />
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-brown-dark/70 sm:text-lg">
            Fraîchement préparés chaque jour, à l'hôpital comme en ville. Choisis, commande, régale-toi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-bold text-cream shadow-lg shadow-coral/20 transition-all hover:bg-coral-dark hover:shadow-xl active:scale-[0.98]"
            >
              Voir le menu du jour
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 font-display text-sm font-bold text-brown-dark ring-1 ring-border transition-all hover:bg-cream-soft"
            >
              <Phone className="h-4 w-4" />
              Commander maintenant
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "600+", v: "repas / jour" },
              { k: "7j/7", v: "ouvert" },
              { k: "24 min", v: "temps moyen" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-extrabold text-coral">{s.k}</dt>
                <dd className="text-xs font-semibold text-brown-dark/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-coral/20 ring-8 ring-background sm:aspect-[4/5]"
            style={{ transform: `translateY(${-offset}px)` }}
          >
            <img
              src={heroDish}
              alt="Riz gras au poulet servi dans un bol coloré"
              className="h-full w-full object-cover"
              width={1600}
              height={1400}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-background px-4 py-3 shadow-xl ring-1 ring-border sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber/20">
                <ChefHat className="h-5 w-5 text-amber" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brown-dark/60">Aujourd'hui</p>
                <p className="font-display text-sm font-bold text-brown-dark">Riz gras au poulet</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-2 top-6 hidden rounded-full bg-coral px-4 py-2 font-display text-sm font-extrabold text-cream shadow-lg sm:block">
            2 000 F
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
    { icon: Sparkles, text: "Ingrédients frais, sélectionnés avec soin" },
    { icon: Truck, text: "Livraison en chambre disponible" },
    { icon: Users, text: "Ouvert à tous — personnel, patients, visiteurs" },
  ];
  return (
    <Section className="bg-brown-dark py-10 text-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.text} className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral/20 text-amber">
              <it.icon className="h-5 w-5" />
            </div>
            <p className="min-w-0 text-sm font-semibold leading-snug">{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Menu ---------- */

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
          title="Le menu qui te fait envie"
          sub="Parcours la sélection du jour, ou explore les plats de la semaine."
        />

        {/* Aperçu du jour */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-coral to-coral-dark p-6 text-cream sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/80">
                Le menu d'aujourd'hui
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                Ce qu'on prépare pour toi
              </h3>
            </div>
            <button
              onClick={() => setWeekOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-semibold text-coral transition-all hover:bg-background"
            >
              <Calendar className="h-4 w-4" />
              {weekOpen ? "Fermer le planning" : "Voir le planning de la semaine"}
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {daily.map((d) => (
              <div key={d.id} className="rounded-2xl bg-cream/10 p-4 backdrop-blur-sm ring-1 ring-cream/20">
                <p className="font-display text-lg font-bold text-cream">{d.name}</p>
                <p className="mt-1 text-sm font-semibold text-amber">{formatFCFA(d.price)}</p>
              </div>
            ))}
          </div>
          {weekOpen && (
            <div className="mt-6 grid gap-3 rounded-2xl bg-brown-dark/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
              {WEEK_MENU.map((w) => (
                <div key={w.day} className="rounded-xl bg-cream/5 p-3">
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-amber">
                    {w.day}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-cream/85">
                    {w.dishes.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Onglets */}
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                cat === c
                  ? "bg-brown-dark text-cream"
                  : "bg-cream text-brown-dark ring-1 ring-border hover:bg-cream-soft"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((d, idx) => (
            <DishCard key={d.id} dish={d} big={cat === "Plats du jour" && idx === 0} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Gallery ---------- */

function Gallery() {
  const imgs = [
    { src: kitchen1, alt: "Chefs préparant les plats" },
    { src: kitchen2, alt: "Assiette servie" },
    { src: kitchen3, alt: "Ingrédients frais" },
    { src: kitchen1, alt: "Cuisine en action" },
    { src: kitchen2, alt: "Dressage soigné" },
  ];
  const scrollerRef = useRef<HTMLDivElement>(null);
  return (
    <Section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle eyebrow="Coulisses" title="Dans nos cuisines" sub="Fraîcheur et hygiène, à chaque étape." />
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {imgs.map((im, i) => (
            <div
              key={i}
              className="relative aspect-[4/5] w-[75%] shrink-0 snap-center overflow-hidden rounded-3xl shadow-lg sm:w-[45%] lg:w-[32%]"
            >
              <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {imgs.map((_, i) => (
            <span key={i} className="h-1.5 w-6 rounded-full bg-brown-dark/20" />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Offer ---------- */

function Offer() {
  const { add } = useCart();
  const offer = MENU.find((d) => d.id === "poulet-frites")!;
  const offer2 = MENU.find((d) => d.id === "attieke")!;
  return (
    <Section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Promotion"
          title="L'offre du moment"
          sub="Une envie ? Profite de nos plats du moment, à prix doux."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[offer, offer2].map((d, i) => (
            <article
              key={d.id}
              className="dish-hover group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber/30 to-coral/15 p-6 ring-1 ring-border sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
                    {i === 0 ? "Promo -20%" : "Combo repas"}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-brown-dark sm:text-3xl">
                    {d.name}
                  </h3>
                  <p className="mt-2 text-sm text-brown-dark/70">
                    Servi avec un jus au choix. Valable aujourd'hui, sur place ou en livraison.
                  </p>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-3xl font-extrabold text-coral">
                      {formatFCFA(Math.round(d.price * 0.8))}
                    </span>
                    <span className="text-sm font-semibold text-brown-dark/50 line-through">
                      {formatFCFA(d.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => add({ ...d, price: Math.round(d.price * 0.8) })}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brown-dark px-5 py-3 font-display text-sm font-bold text-cream transition-all hover:bg-coral active:scale-[0.98]"
                  >
                    J'en profite
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {d.image && (
                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl ring-4 ring-background sm:h-40 sm:w-40">
                    <img src={d.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- How to order ---------- */

function HowToOrder() {
  const steps = [
    { n: "01", title: "Choisis tes plats", desc: "Parcours le menu et ajoute ce qui te tente." },
    { n: "02", title: "Passe ta commande", desc: "Un clic sur WhatsApp ou un appel, c'est parti." },
    { n: "03", title: "Régale-toi", desc: "Récupère sur place ou en livraison chambre." },
  ];
  return (
    <Section className="bg-brown-dark py-20 text-cream sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-block rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber">
            En 3 étapes
          </p>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-cream sm:text-4xl md:text-5xl">
            Commander, c'est simple
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-3xl bg-cream/5 p-6 ring-1 ring-cream/10">
              <span className="font-display text-5xl font-extrabold text-amber/40">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-extrabold text-cream">{s.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{s.desc}</p>
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
    { name: "Aïcha K.", role: "Infirmière", quote: "Le seul endroit à l'hôpital où je mange comme à la maison. Rapide et vraiment bon." },
    { name: "Marc D.", role: "Visiteur", quote: "J'ai commandé pour mon père en chambre, arrivé chaud en 20 minutes. Bravo l'équipe !" },
    { name: "Fatima B.", role: "Cliente", quote: "Le riz gras au poulet est incontournable. Je passe même quand je ne suis pas de garde." },
    { name: "Kevin O.", role: "Médecin", quote: "Frais, propre, généreux. On sent l'attention dans chaque assiette." },
  ];
  return (
    <Section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EyebrowTitle
          eyebrow="Témoignages"
          title="Ils se sont régalés"
          sub="Ce que disent nos clients, à l'hôpital et en ville."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-cream p-6 ring-1 ring-border">
              <div className="flex gap-0.5 text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-brown-dark/80">"{t.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-coral font-display text-sm font-bold text-cream">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-brown-dark">{t.name}</p>
                  <p className="text-xs text-brown-dark/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const qs = [
    { q: "Est-ce que je peux commander depuis ma chambre ?", a: "Oui, un simple message WhatsApp ou un appel suffit — on livre directement en chambre dans l'enceinte de l'hôpital." },
    { q: "Quels sont les moyens de paiement acceptés ?", a: "Espèces, Mobile Money (MTN, Moov) et paiement à la livraison." },
    { q: "Le resto est-il ouvert au public, pas seulement à l'hôpital ?", a: "Oui, on accueille tout le monde : personnel, patients, visiteurs et clients de passage." },
    { q: "Quels sont vos horaires d'ouverture ?", a: "Tous les jours de 6h30 à 22h00, y compris le weekend." },
    { q: "Proposez-vous des plats pour régimes spécifiques ?", a: "Oui, on propose des options sans piment, sans porc, et des plats plus légers sur demande." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <EyebrowTitle eyebrow="FAQ" title="Tes questions, nos réponses" />
        <ul className="mt-12 space-y-3">
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={`overflow-hidden rounded-3xl bg-background ring-1 transition-all ${isOpen ? "ring-coral shadow-lg" : "ring-border"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-bold text-brown-dark sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all ${isOpen ? "rotate-180 bg-coral text-cream" : "bg-cream text-brown-dark"}`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-brown-dark/70 sm:text-base">{item.a}</p>
                  </div>
                </div>
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
    <Section id="about" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative grid grid-cols-2 gap-4">
          <img src={kitchen1} alt="Équipe en cuisine" loading="lazy" className="col-span-2 aspect-[4/3] w-full rounded-3xl object-cover" />
          <img src={kitchen3} alt="Ingrédients frais" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
          <img src={kitchen2} alt="Dressage" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
        </div>
        <div>
          <p className="mb-3 inline-block rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
            Notre histoire
          </p>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-brown-dark sm:text-4xl md:text-5xl">
            L'histoire d'Anifath Resto
          </h2>
          <p className="mt-5 text-base text-brown-dark/75 sm:text-lg">
            Anifath Resto, c'est une cuisine pensée pour tous ceux qui ont besoin d'un bon repas, vite et
            bien fait — que tu sois de passage, en visite, ou du personnel de l'hôpital. Fraîcheur,
            hygiène et générosité, à chaque assiette.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "10+", v: "ans d'expérience" },
              { k: "20", v: "plats à la carte" },
              { k: "100%", v: "fait maison" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-cream p-4">
                <p className="font-display text-2xl font-extrabold text-coral">{s.k}</p>
                <p className="text-xs font-semibold text-brown-dark/60">{s.v}</p>
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
    <Section id="contact" className="bg-brown-dark py-20 text-cream sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-block rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber">
            Infos pratiques
          </p>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-cream sm:text-4xl md:text-5xl">
            Nous trouver
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, title: "Horaires", lines: [SITE.hours, "7 jours sur 7"] },
            { icon: MapPin, title: "Localisation", lines: [SITE.address, "Accès personnel & public"] },
            { icon: Truck, title: "Zones desservies", lines: ["Chambres de l'hôpital", "Environs proches"] },
            { icon: Phone, title: "Contact", lines: [SITE.phone, "WhatsApp & appel"] },
          ].map((b) => (
            <div key={b.title} className="rounded-3xl bg-cream/5 p-6 ring-1 ring-cream/10">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-cream">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold text-cream">{b.title}</h3>
              <div className="mt-2 space-y-0.5 text-sm text-cream/70">
                {b.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={buildWhatsAppUrl(`Bonjour ${SITE.name}, je souhaite en savoir plus.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-bold text-cream transition-all hover:bg-coral-dark"
          >
            Écrire sur WhatsApp
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 font-display text-sm font-bold text-brown-dark transition-all hover:bg-cream-soft"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-coral to-coral-dark p-8 text-center text-cream sm:p-12">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Une envie ? Passe ta commande maintenant.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={buildWhatsAppUrl(`Bonjour ${SITE.name}, je souhaite commander.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream px-6 py-3.5 font-display text-sm font-bold text-coral transition-all hover:bg-background"
            >
              Commander sur WhatsApp
            </a>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="rounded-full bg-brown-dark px-6 py-3.5 font-display text-sm font-bold text-cream transition-all hover:bg-brown-dark/80"
            >
              Appeler
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-brown-dark/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p>{SITE.hours}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-coral">Facebook</a>
            <a href="#" className="hover:text-coral">Instagram</a>
            <a href="#" className="hover:text-coral">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useRef, useState, useEffect, useCallback } from "react";
import { PATISSERIE_GLACES_ITEMS } from "@/data/menu";
import { useReveal } from "@/hooks/use-reveal";

/* ── Carousel card ─────────────────────────────────────────────── */
function PGCard({ item }: { item: (typeof PATISSERIE_GLACES_ITEMS)[number] }) {
  return (
    <div className="group relative flex-shrink-0 w-56 sm:w-64 overflow-hidden rounded-[2rem] shadow-md ring-1 ring-border/80 bg-card transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay for name */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/75 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-brown-dark backdrop-blur-md">
          {item.category === "Pâtisserie" ? "🥐" : "🍦"} {item.category}
        </span>

        {/* Product name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-display text-base font-black text-cream drop-shadow-lg leading-tight">
            {item.name}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Pagination dots ───────────────────────────────────────────── */
function PaginationDots({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Aller à la douceur ${i + 1}`}
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "w-6 h-2 bg-coral shadow-md shadow-coral/30"
              : "w-2 h-2 bg-border hover:bg-brown-dark/40"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────── */
export function PatisserieGlacesSection() {
  const ref = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = PATISSERIE_GLACES_ITEMS;

  /* Update active dot based on scroll position */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 16 // gap-4 = 16px
      : 240;
    const scrolled = track.scrollLeft;
    const idx = Math.round(scrolled / cardWidth);
    setActiveIndex(Math.min(idx, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Scroll to card on dot click */
  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 16
      : 240;
    track.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setActiveIndex(idx);
  }, []);

  /* Arrow controls */
  const scrollBy = useCallback(
    (dir: 1 | -1) => {
      const next = Math.max(0, Math.min(items.length - 1, activeIndex + dir));
      scrollToIndex(next);
    },
    [activeIndex, items.length, scrollToIndex],
  );

  return (
    <section
      id="patisserie-glaces"
      ref={ref}
      className="reveal scroll-mt-24 py-20 sm:py-28 bg-gradient-to-b from-cream/40 to-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-coral ring-1 ring-coral/20">
            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
            Douceurs maison
          </span>
          <h2 className="font-display text-3xl font-black leading-tight text-brown-dark sm:text-4xl md:text-5xl">
            Pâtisserie &amp; Glaces
          </h2>
          <p className="mt-4 text-base font-medium text-brown-dark/75 sm:text-lg">
            Une petite douceur pour finir en beauté. Nos pâtisseries maison et
            nos glaces bien fraîches t'attendent, juste ici, sur place.
          </p>
        </div>

        {/* Carousel */}
        {items.length > 0 ? (
          <div className="mt-12 relative">
            {/* Arrow left */}
            <button
              onClick={() => scrollBy(-1)}
              disabled={activeIndex === 0}
              aria-label="Précédent"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg ring-1 ring-border/80 transition-all hover:bg-cream-soft hover:scale-110 disabled:opacity-30 disabled:pointer-events-none -translate-x-2"
            >
              <i className="fa-solid fa-chevron-left text-brown-dark text-sm"></i>
            </button>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1 snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {items.map((item) => (
                <div key={item.id} className="snap-start">
                  <PGCard item={item} />
                </div>
              ))}
            </div>

            {/* Arrow right */}
            <button
              onClick={() => scrollBy(1)}
              disabled={activeIndex >= items.length - 1}
              aria-label="Suivant"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg ring-1 ring-border/80 transition-all hover:bg-cream-soft hover:scale-110 disabled:opacity-30 disabled:pointer-events-none translate-x-2"
            >
              <i className="fa-solid fa-chevron-right text-brown-dark text-sm"></i>
            </button>

            {/* Pagination dots */}
            <PaginationDots
              total={items.length}
              active={activeIndex}
              onDotClick={scrollToIndex}
            />
          </div>
        ) : (
          /* Fallback si vide */
          <div className="mt-12 rounded-[2.5rem] bg-cream/60 p-10 text-center ring-1 ring-border/80 max-w-xl mx-auto">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-amber/20 text-coral text-2xl">
              🍦
            </div>
            <p className="font-display text-lg font-bold text-brown-dark">
              Nos douceurs arrivent bientôt par ici. Repasse nous voir !
            </p>
          </div>
        )}

        {/* Vitrine-only notice */}
        <p className="mt-8 text-center text-xs font-semibold text-brown-dark/50 tracking-wide">
          <i className="fa-solid fa-store text-coral mr-1.5"></i>
          Disponible uniquement sur place — à déguster à la cantine
        </p>
      </div>
    </section>
  );
}

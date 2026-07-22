import { SAUCES_INFO, type SauceInfo } from "@/data/menu";
import { useReveal } from "@/hooks/use-reveal";

export function SaucesSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="sauces" ref={ref} className="reveal scroll-mt-24 bg-cream/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-coral ring-1 ring-coral/20">
            <i className="fa-solid fa-pepper-hot text-xs"></i>
            Accompagnements
          </span>
          <h2 className="font-display text-3xl font-black leading-tight text-brown-dark sm:text-4xl md:text-5xl">
            Nos sauces
          </h2>
          <p className="mt-4 text-base font-medium text-brown-dark/75 sm:text-lg">
            Cinq sauces traditionnelles, préparées comme à la maison. Choisis la tienne avec ton riz ou ta pâte.
          </p>
        </div>

        {/* Sauces Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAUCES_INFO.map((s, idx) => (
            <SauceCard key={s.name} sauce={s} featured={idx === 0 || idx === 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SauceCard({ sauce, featured }: { sauce: SauceInfo; featured?: boolean }) {
  return (
    <article
      className={`dish-hover group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card p-6 shadow-md ring-1 ring-border/80 transition-all duration-300 sm:p-7 ${
        featured ? "bg-gradient-to-br from-cream via-amber/10 to-card" : ""
      }`}
    >
      <div>
        {/* Image / Neutral Warm Placeholder Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-cream/80 ring-1 ring-border/50 shadow-inner">
          {sauce.image ? (
            <img
              src={sauce.image}
              alt={sauce.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-brown-dark/30">
              <i className="fa-solid fa-mortar-pestle text-3xl"></i>
            </div>
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-brown-dark/80 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber">
            {sauce.tagline}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-black text-brown-dark">
          {sauce.name}
        </h3>

        <p className="mt-2.5 text-xs font-medium leading-relaxed text-brown-dark/75">
          {sauce.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-coral uppercase tracking-wider">
          <i className="fa-solid fa-circle-check text-xs"></i>
          <span>Au choix avec Riz & Pâte</span>
        </span>
        <span className="text-xs font-black text-brown-dark/60">Inclus</span>
      </div>
    </article>
  );
}

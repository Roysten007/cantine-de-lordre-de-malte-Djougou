import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Accueil", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { count, setOpen, pulseKey } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/60 backdrop-blur"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#hero" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-coral text-cream font-display text-lg font-black">
            a
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-brown-dark">
            Anifath <span className="text-coral">Resto</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-brown-dark/80 transition-colors hover:text-coral"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label={`Ouvrir le panier (${count} article${count > 1 ? "s" : ""})`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-cream text-brown-dark ring-1 ring-border transition-colors hover:bg-cream-soft"
          >
            <span key={pulseKey} className="cart-pulse grid place-items-center">
              <ShoppingBag className="h-5 w-5" />
            </span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] font-bold text-cream">
                {count}
              </span>
            )}
          </button>
          <a
            href="#menu"
            className="hidden shrink-0 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-coral-dark hover:shadow-md sm:inline-flex"
          >
            Commander
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream text-brown-dark ring-1 ring-border md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-brown-dark hover:bg-cream"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Commander maintenant
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

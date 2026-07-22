import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site-config";
import Dock from "@/components/ui/Dock";

const NAV = [
  { label: "Accueil", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { count, setOpen, pulseKey } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("#hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV.map((n) => n.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveNav(`#${sectionId}`);
            break;
          }
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (href: string) => {
    const sectionId = href.substring(1);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dockItems = [
    {
      label: "Accueil",
      icon: <i className="fa-solid fa-house text-sm text-brown-dark transition-colors duration-200"></i>,
      onClick: () => handleScrollTo("#hero"),
      className: activeNav === "#hero" ? "active" : "",
    },
    {
      label: "Menu",
      icon: <i className="fa-solid fa-utensils text-sm text-brown-dark transition-colors duration-200"></i>,
      onClick: () => handleScrollTo("#menu"),
      className: activeNav === "#menu" ? "active" : "",
    },
    {
      label: "Contact",
      icon: <i className="fa-solid fa-phone text-sm text-brown-dark transition-colors duration-200"></i>,
      onClick: () => handleScrollTo("#contact"),
      className: activeNav === "#contact" ? "active" : "",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-brown-dark/5 ring-1 ring-border/50 py-2.5"
          : "bg-transparent backdrop-blur-sm py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-coral to-amber text-cream font-display text-xl font-black shadow-md shadow-coral/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            c
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-brown-dark transition-colors group-hover:text-coral">
              La Cantine
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brown-dark/50">
              Ordre de Malte • Djougou
            </span>
          </div>
        </a>

        {/* Desktop Navigation with fixed width to prevent layout shifts */}
        <nav className="hidden md:flex w-[260px] shrink-0 items-center justify-center overflow-visible">
          <Dock
            items={dockItems}
            magnification={58}
            distance={130}
            panelHeight={48}
            baseItemSize={38}
          />
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden items-center gap-2 rounded-full bg-cream px-3.5 py-2 text-xs font-bold text-brown-dark ring-1 ring-border transition-all hover:bg-cream-soft hover:shadow-sm lg:inline-flex"
          >
            <i className="fa-solid fa-phone text-xs text-coral"></i>
            <span>{SITE.phone}</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label={`Ouvrir le panier (${count} article${count > 1 ? "s" : ""})`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-cream text-brown-dark ring-1 ring-border/80 transition-all duration-300 hover:bg-cream-soft hover:scale-105 active:scale-95 shadow-sm"
          >
            <span key={pulseKey} className="cart-pulse grid place-items-center">
              <i className="fa-solid fa-cart-shopping text-base text-brown-dark"></i>
            </span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] font-extrabold text-cream shadow-md shadow-coral/40 animate-bounce">
                {count}
              </span>
            )}
          </button>

          {/* Commander Button */}
          <a
            href={buildWhatsAppUrl("Bonjour, je souhaite commander.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 font-display text-xs font-bold text-cream shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 sm:inline-flex"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>Commander maintenant</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream text-brown-dark ring-1 ring-border md:hidden"
          >
            {mobileOpen ? <i className="fa-solid fa-xmark text-base"></i> : <i className="fa-solid fa-bars text-base"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-border/80 bg-background/95 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-2 duration-300">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((n) => (
              <button
                key={n.href}
                onClick={() => {
                  setMobileOpen(false);
                  handleScrollTo(n.href);
                }}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold text-brown-dark transition-colors hover:bg-cream"
              >
                <span>{n.label}</span>
                <i className="fa-solid fa-arrow-right text-xs text-coral"></i>
              </button>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-2xl bg-coral px-5 py-3.5 text-center font-display text-sm font-bold text-cream shadow-md shadow-coral/20"
            >
              Commander maintenant
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

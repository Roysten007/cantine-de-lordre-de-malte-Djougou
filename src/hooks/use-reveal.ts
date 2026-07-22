import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "80px" },
    );
    io.observe(el);

    // Timeout de sécurité : si le défilement ne s'est pas encore produit ou si la vue est directe
    const safetyTimer = setTimeout(() => {
      if (el) el.classList.add("reveal-in");
    }, 400);

    return () => {
      io.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);
  return ref;
}

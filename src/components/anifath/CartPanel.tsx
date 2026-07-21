import { useEffect } from "react";
import { Minus, Phone, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatFCFA } from "@/lib/cart";
import { buildWhatsAppUrl, SITE } from "@/lib/site-config";

export function CartPanel() {
  const { items, open, setOpen, setQty, remove, total, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const whatsappMsg = [
    `Bonjour ${SITE.name}, je souhaite commander :`,
    ...items.map((i) => `• ${i.name} × ${i.qty} — ${formatFCFA(i.qty * i.price)}`),
    ``,
    `Total estimé : ${formatFCFA(total)}`,
  ].join("\n");

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-brown-dark/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      />
      <aside
        role="dialog"
        aria-label="Ta commande"
        className={`fixed z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-out
          inset-x-0 bottom-0 h-[85vh] rounded-t-3xl
          sm:inset-y-0 sm:right-0 sm:bottom-auto sm:h-auto sm:w-[420px] sm:rounded-none sm:rounded-l-3xl
          ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-coral" />
            <h2 className="font-display text-xl font-extrabold text-brown-dark">Ta commande</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-cream">
                <ShoppingBag className="h-9 w-9 text-coral" />
              </div>
              <p className="mt-5 font-display text-lg font-bold text-brown-dark">
                Ton panier est vide pour l'instant.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Ajoute tes plats préférés !</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-5 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream hover:bg-coral-dark"
              >
                Voir le menu
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 rounded-2xl bg-cream/60 p-3">
                  {i.image && (
                    <img src={i.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-brown-dark">{i.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-coral">{formatFCFA(i.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center rounded-full bg-background ring-1 ring-border">
                        <button
                          onClick={() => setQty(i.id, i.qty - 1)}
                          aria-label="Diminuer"
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.qty + 1)}
                          aria-label="Augmenter"
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        aria-label="Retirer"
                        className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              <button
                onClick={clear}
                className="mt-2 text-xs font-semibold text-muted-foreground hover:text-destructive"
              >
                Vider le panier
              </button>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-cream/40 px-5 py-4">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Total estimé</span>
              <span className="font-display text-2xl font-extrabold text-brown-dark">
                {formatFCFA(total)}
              </span>
            </div>
            <div className="grid gap-2">
              <a
                href={buildWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 font-display text-sm font-bold text-cream shadow-sm transition-all hover:bg-coral-dark active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
                Choisir WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-full bg-brown-dark px-5 py-3.5 font-display text-sm font-bold text-cream transition-all hover:bg-brown-dark/85 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                Appeler directement
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

import { useEffect, useState } from "react";
import { useCart, formatFCFA } from "@/lib/cart";
import { buildWhatsAppUrl, SITE } from "@/lib/site-config";

export function CartPanel() {
  const { items, open, setOpen, setQty, remove, total, clear } = useCart();

  // Nom sauvegardé localement pour qu'il s'affiche directement les fois suivantes
  const [nom, setNom] = useState(() => localStorage.getItem("cantine_client_nom") || "");
  const [clientType, setClientType] = useState("hospitalier"); // hospitalier | patient | externe
  const [chambre, setChambre] = useState("");

  // Sauvegarder le nom dans le stockage local quand il change
  useEffect(() => {
    localStorage.setItem("cantine_client_nom", nom);
  }, [nom]);

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

  const clientTypeLabel = {
    hospitalier: "Personnel Hospitalier",
    patient: "Patient (Chambre)",
    externe: "Externe / Visiteur",
  }[clientType];

  const whatsappMsg = [
    `*Nouvelle commande - La Cantine de l'Ordre de Malte*`,
    `👤 *Nom* : ${nom || "Non précisé"}`,
    `ℹ️ *Type* : ${clientTypeLabel}`,
    chambre ? `🏥 *Chambre/Service* : ${chambre}` : "",
    `----------------------------------`,
    ...items.map((i) => {
      const dishTitle = i.sauce ? `${i.name} — ${i.sauce}` : i.name;
      return `• ${dishTitle} × ${i.qty} — ${formatFCFA(i.qty * i.price)}`;
    }),
    `----------------------------------`,
    `*Total estimé : ${formatFCFA(total)}*`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!open) return null;

  return (
    <>
      {/* Lighter, non-intrusive backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50 bg-brown-dark/40 backdrop-blur-[1px] transition-opacity duration-300"
      />

      {/* Centered Modal Card */}
      <div className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-[2.5rem] bg-card p-6 shadow-2xl ring-1 ring-border animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-coral/15 text-coral">
              <i className="fa-solid fa-cart-shopping text-base"></i>
            </div>
            <div>
              <h2 className="font-display text-lg font-black text-brown-dark">Ta commande</h2>
              <p className="text-[10px] font-bold text-brown-dark/50">
                {items.length} article{items.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="grid h-8 w-8 place-items-center rounded-full bg-cream text-brown-dark transition-transform hover:scale-110"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-5">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-cream text-coral">
                <i className="fa-solid fa-basket-shopping text-xl"></i>
              </div>
              <p className="font-display text-base font-extrabold text-brown-dark">
                Ton panier est vide pour l'instant.
              </p>
              <p className="mt-1 text-xs font-semibold text-brown-dark/60">
                Ajoute tes plats préférés !
              </p>
            </div>
          ) : (
            <>
              {/* Order items summary list WITH photos */}
              <ul className="divide-y divide-border/60 max-h-52 overflow-y-auto pr-1 space-y-2.5">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 py-2 text-xs">
                    {i.image ? (
                      <img
                        src={i.image}
                        alt={i.name}
                        className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-border/50"
                      />
                    ) : (
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream text-brown-dark/40 ring-1 ring-border/50">
                        <i className="fa-solid fa-utensils text-sm"></i>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-brown-dark truncate">{i.name}</p>
                      {i.sauce && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-extrabold text-coral mt-0.5">
                          <i className="fa-solid fa-pepper-hot text-[9px]"></i>
                          <span>Sauce : {i.sauce}</span>
                        </span>
                      )}
                      <p className="text-[10px] font-semibold text-brown-dark/60 mt-0.5">
                        {formatFCFA(i.price)} × {i.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center rounded-full bg-cream ring-1 ring-border/80">
                        <button
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="grid h-6 w-6 place-items-center text-brown-dark hover:bg-cream-soft rounded-full"
                        >
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span className="w-4 text-center font-bold">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="grid h-6 w-6 place-items-center text-brown-dark hover:bg-cream-soft rounded-full"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        className="text-brown-dark/40 hover:text-destructive p-1 transition-colors"
                      >
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order Form */}
              <div className="space-y-3.5 border-t border-border/80 pt-4">
                <p className="font-display text-sm font-extrabold text-brown-dark">
                  Détails de livraison / récupération
                </p>

                {/* Nom Input (saved to localstorage) */}
                <div>
                  <label htmlFor="client-nom" className="block text-[11px] font-bold text-brown-dark/70 mb-1">
                    Ton nom complet
                  </label>
                  <input
                    id="client-nom"
                    type="text"
                    placeholder="Ex: Koffi Mensah"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full rounded-xl bg-cream/50 border border-border px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-coral/40"
                  />
                </div>

                {/* Client Type selection */}
                <div>
                  <span className="block text-[11px] font-bold text-brown-dark/70 mb-1.5">
                    Tu es :
                  </span>
                  <div className="flex gap-2">
                    {["hospitalier", "patient", "externe"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setClientType(t);
                          if (t === "externe") setChambre("");
                        }}
                        className={`flex-1 rounded-xl py-2 px-1 text-[10px] font-bold border transition-all ${
                          clientType === t
                            ? "bg-coral text-cream border-coral shadow-sm"
                            : "bg-cream/40 border-border text-brown-dark/75 hover:bg-cream-soft"
                        }`}
                      >
                        {t === "hospitalier" ? "Personnel" : t === "patient" ? "Patient" : "Externe"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chambre / Service Input with explanation of what it serves for */}
                {clientType !== "externe" && (
                  <div>
                    <label htmlFor="chambre-service" className="block text-[11px] font-bold text-brown-dark/70 mb-1">
                      {clientType === "patient" 
                        ? "Numéro de ta chambre (ex: Chambre 4, Lit B - Pour te livrer en chambre)" 
                        : "Nom de ton service (ex: Pédiatrie, Chirurgie - Pour te livrer dans ton service)"}
                    </label>
                    <input
                      id="chambre-service"
                      type="text"
                      placeholder={clientType === "patient" ? "Ex: Chambre 12" : "Ex: Pédiatrie"}
                      value={chambre}
                      onChange={(e) => setChambre(e.target.value)}
                      className="w-full rounded-xl bg-cream/50 border border-border px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-coral/40"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="border-t border-border/80 pt-4 space-y-3.5">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-brown-dark/60 uppercase">Total estimé</span>
              <span className="font-display text-xl font-black text-brown-dark">{formatFCFA(total)}</span>
            </div>

            <div className="grid gap-2">
              <a
                href={buildWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 py-3 px-4 text-xs font-black uppercase tracking-wider text-cream shadow-lg active:scale-98 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-base"></i>
                <span>Commander via WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-full bg-brown-dark py-3 px-4 text-xs font-bold text-cream hover:bg-brown-dark/90 active:scale-98 transition-all"
              >
                <i className="fa-solid fa-phone text-xs text-amber"></i>
                <span>Appeler directement</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

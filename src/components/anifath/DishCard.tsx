import { useState } from "react";
import { useCart, formatFCFA, type Dish } from "@/lib/cart";
import { SAUCES_INFO, type Sauce } from "@/data/menu";

export function DishCard({
  dish,
  big = false,
  onSelectSauce,
}: {
  dish: Dish;
  big?: boolean;
  onSelectSauce?: (dish: Dish) => void;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [addedSauceName, setAddedSauceName] = useState<string>("");
  const [showInlineSauces, setShowInlineSauces] = useState(false);

  const hasSauce = dish.hasSauceOption || !!dish.defaultSauce;

  const handleInitialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasSauce) {
      setShowInlineSauces(true);
      return;
    }
    add(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleSelectSauce = (e: React.MouseEvent, sauceName: Sauce) => {
    e.stopPropagation();
    add(dish, sauceName);
    setAddedSauceName(sauceName);
    setAdded(true);
    setShowInlineSauces(false);
    setTimeout(() => {
      setAdded(false);
      setAddedSauceName("");
    }, 1400);
  };

  return (
    <article
      className={`dish-hover group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] bg-card ring-1 ring-border/80 transition-all duration-300 w-full h-full shadow-sm hover:shadow-xl hover:ring-coral/40 ${
        big ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {/* Inline Sauce Selector Overlay (s'affiche au même endroit sur la carte) */}
      {showInlineSauces && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between bg-brown-dark/95 p-5 text-cream backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-cream/15 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber">
                Choix de la sauce
              </span>
              <h4 className="font-display text-base font-extrabold text-cream leading-tight">
                {dish.name}
              </h4>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInlineSauces(false);
              }}
              className="grid h-8 w-8 place-items-center rounded-full bg-cream/15 text-cream transition-all hover:bg-cream/30"
              aria-label="Fermer le choix de sauce"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>

          {/* Liste des sauces */}
          <div className="my-auto space-y-2 py-2">
            <p className="text-[11px] font-semibold text-cream/70">
              Sélectionne ta sauce préférée :
            </p>
            <div className="grid gap-1.5">
              {SAUCES_INFO.map((s) => {
                const isDefault = dish.defaultSauce === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={(e) => handleSelectSauce(e, s.name)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-extrabold transition-all active:scale-98 ${
                      isDefault
                        ? "bg-amber text-brown-dark shadow-md"
                        : "bg-cream/10 text-cream hover:bg-coral hover:text-cream"
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    {isDefault && (
                      <span className="rounded-full bg-brown-dark/20 px-2 py-0.5 text-[9px] font-black uppercase text-brown-dark shrink-0">
                        Conseillé
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowInlineSauces(false);
            }}
            className="w-full rounded-xl bg-cream/10 py-2 text-center text-[11px] font-bold text-cream/60 hover:bg-cream/20"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] w-full shrink-0">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="h-full w-full bg-cream-soft flex flex-col items-center justify-center text-brown-dark/40">
            <i className="fa-solid fa-utensils text-2xl mb-1 text-brown-dark/40"></i>
            <span className="text-[10px] font-bold">Photo à venir</span>
          </div>
        )}

        {/* Gradient shadow overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge Tag */}
        {dish.isBreakfastSuggestion ? (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-amber text-brown-dark px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ring-1 ring-amber/50">
            <i className="fa-solid fa-star text-[10px]"></i>
            <span>Suggestion</span>
          </div>
        ) : dish.tag ? (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-coral/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur-md shadow-md shimmer-badge">
            <i className="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
            <span>{dish.tag}</span>
          </div>
        ) : null}

        {/* Sauce option indicator badge */}
        {dish.defaultSauce ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-coral/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-cream backdrop-blur-md shadow-sm">
            <i className="fa-solid fa-pepper-hot text-[10px]"></i>
            <span>{dish.defaultSauce}</span>
          </div>
        ) : dish.hasSauceOption ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-brown-dark backdrop-blur-md shadow-sm">
            <i className="fa-solid fa-mortar-pestle text-[10px]"></i>
            <span>Sauce au choix</span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-display font-black text-brown-dark transition-colors group-hover:text-coral text-lg leading-tight">
            {dish.name}
          </h3>
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <span className="font-display font-black text-coral text-xl">
              {formatFCFA(dish.price)}
            </span>
            {dish.defaultSauce ? (
              <span className="text-[10px] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full border border-coral/20">
                + {dish.defaultSauce}
              </span>
            ) : dish.hasSauceOption ? (
              <span className="text-[10px] font-bold text-brown-dark/60 bg-cream px-2 py-0.5 rounded-full border border-border/60">
                Sauce au choix
              </span>
            ) : null}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleInitialClick}
          aria-label={`Ajouter ${dish.name} au panier`}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-bold transition-all duration-300 shadow-md ${
            added
              ? "bg-emerald-600 text-white scale-102 shadow-emerald-600/30"
              : "bg-brown-dark text-cream hover:bg-coral hover:scale-102 active:scale-98 hover:shadow-coral/30"
          }`}
        >
          {added ? (
            <>
              <i className="fa-solid fa-circle-check text-sm animate-in zoom-in-50 duration-200"></i>
              <span>{addedSauceName ? `Ajouté (${addedSauceName}) !` : "Ajouté !"}</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus text-xs transition-transform duration-300 group-hover:rotate-90"></i>
              <span>{hasSauce ? "Choisir sa sauce & ajouter" : "Ajouter au panier"}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

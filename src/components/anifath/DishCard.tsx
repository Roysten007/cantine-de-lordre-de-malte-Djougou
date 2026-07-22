import { useState } from "react";
import { useCart, formatFCFA, type Dish } from "@/lib/cart";

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

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ((dish.hasSauceOption || dish.defaultSauce) && onSelectSauce) {
      onSelectSauce(dish);
      return;
    }
    add(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <article
      className={`dish-hover group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card ring-1 ring-border/80 transition-all duration-300 ${
        big ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden ${big ? "aspect-[4/3] sm:aspect-auto sm:h-[400px]" : "aspect-square"}`}>
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
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge Tag */}
        {dish.isBreakfastSuggestion ? (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-amber text-brown-dark px-3.5 py-1 text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ring-1 ring-amber/50">
            <i className="fa-solid fa-star text-xs"></i>
            <span>Suggestion du jour</span>
          </div>
        ) : dish.tag ? (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-coral/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream backdrop-blur-md shadow-md shimmer-badge">
            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
            <span>{dish.tag}</span>
          </div>
        ) : null}

        {/* Sauce option / default sauce indicator badge */}
        {dish.defaultSauce ? (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-coral/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cream backdrop-blur-md shadow-sm">
            <i className="fa-solid fa-pepper-hot text-xs"></i>
            <span>{dish.defaultSauce}</span>
          </div>
        ) : dish.hasSauceOption ? (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-amber/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brown-dark backdrop-blur-md shadow-sm">
            <i className="fa-solid fa-mortar-pestle text-xs"></i>
            <span>Sauce au choix</span>
          </div>
        ) : null}

        {/* Floating Add Button overlay on hover for big cards */}
        {big && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-6 sm:left-6 sm:right-6">
            <span className="rounded-full bg-background/90 px-4 py-1.5 text-xs font-bold text-brown-dark backdrop-blur-md">
              Spécialité Maison <i className="fa-solid fa-fire text-coral ml-1"></i>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-3 p-5 ${big ? "sm:p-6" : ""}`}>
        <div>
          <h3 className={`font-display font-extrabold text-brown-dark transition-colors group-hover:text-coral ${big ? "text-2xl" : "text-base"}`}>
            {dish.name}
          </h3>
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <span className={`font-display font-black text-coral ${big ? "text-2xl sm:text-3xl" : "text-lg"}`}>
              {formatFCFA(dish.price)}
            </span>
            {dish.defaultSauce ? (
              <span className="text-[10px] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full border border-coral/20">
                + {dish.defaultSauce}
              </span>
            ) : dish.hasSauceOption ? (
              <span className="text-[10px] font-bold text-brown-dark/60 bg-cream px-2 py-0.5 rounded-full border border-border/60">
                Choix de sauce
              </span>
            ) : null}
          </div>
        </div>

        {/* Add to Cart Button with text "Ajouter" */}
        <button
          onClick={handleAdd}
          aria-label={`Ajouter ${dish.name} au panier`}
          className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition-all duration-300 shadow-md ${
            added
              ? "bg-emerald-600 text-white scale-102 shadow-emerald-600/30"
              : "bg-brown-dark text-cream hover:bg-coral hover:scale-102 active:scale-98 hover:shadow-coral/30"
          }`}
        >
          {added ? (
            <>
              <i className="fa-solid fa-circle-check text-sm animate-in zoom-in-50 duration-200"></i>
              <span>Ajouté !</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus text-xs transition-transform duration-300 group-hover:rotate-90"></i>
              <span>{dish.hasSauceOption || dish.defaultSauce ? "Choisir sa sauce & ajouter" : "Ajouter"}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

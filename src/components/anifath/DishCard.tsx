import { Plus } from "lucide-react";
import { useCart, formatFCFA, type Dish } from "@/lib/cart";

export function DishCard({ dish, big = false }: { dish: Dish; big?: boolean }) {
  const { add } = useCart();
  return (
    <article
      className={`dish-hover group relative overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60 ${big ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${big ? "aspect-[4/5] sm:aspect-auto sm:h-[420px]" : "aspect-square"}`}>
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-cream-soft" />
        )}
        {dish.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
            {dish.tag}
          </span>
        )}
      </div>
      <div className={`flex items-center justify-between gap-3 p-4 ${big ? "sm:p-6" : ""}`}>
        <div className="min-w-0">
          <h3 className={`truncate font-display font-bold text-brown-dark ${big ? "text-2xl" : "text-base"}`}>
            {dish.name}
          </h3>
          <p className={`mt-1 font-display font-bold text-coral ${big ? "text-2xl" : "text-lg"}`}>
            {formatFCFA(dish.price)}
          </p>
        </div>
        <button
          onClick={() => add(dish)}
          aria-label={`Ajouter ${dish.name} au panier`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brown-dark text-cream transition-all hover:bg-coral hover:scale-110 active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </article>
  );
}

import { useEffect, useState } from "react";
import { SAUCES, type Sauce } from "@/data/menu";
import { formatFCFA, type Dish } from "@/lib/cart";

interface SauceSelectorModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dish: Dish, sauce: Sauce) => void;
}

export function SauceSelectorModal({ dish, isOpen, onClose, onConfirm }: SauceSelectorModalProps) {
  const [selectedSauce, setSelectedSauce] = useState<Sauce | null>(null);

  useEffect(() => {
    if (dish?.defaultSauce && (SAUCES as readonly string[]).includes(dish.defaultSauce)) {
      setSelectedSauce(dish.defaultSauce as Sauce);
    } else {
      setSelectedSauce(null);
    }
  }, [dish, isOpen]);

  if (!isOpen || !dish) return null;

  const handleConfirm = () => {
    if (!selectedSauce) return;
    onConfirm(dish, selectedSauce);
    setSelectedSauce(null);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-brown-dark/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Centered Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-[2.5rem] bg-card p-6 shadow-2xl ring-1 ring-border animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-coral/15 text-coral">
              <i className="fa-solid fa-pepper-hot text-lg"></i>
            </div>
            <div>
              <h3 className="font-display text-lg font-black text-brown-dark">Choisis ta sauce</h3>
              <p className="text-[11px] font-bold text-coral">
                {dish.name} {dish.defaultSauce ? `(${dish.defaultSauce})` : ""} • {formatFCFA(dish.price)} <span className="text-brown-dark/50 font-normal">(Sauce incluse)</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="grid h-8 w-8 place-items-center rounded-full bg-cream text-brown-dark transition-transform hover:scale-110"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Sauce Options List */}
        <div className="py-5">
          <p className="mb-3 text-xs font-bold text-brown-dark/70">
            {dish.defaultSauce
              ? `Sauce ${dish.defaultSauce} pré-sélectionnée (modifiable si désiré) :`
              : "Sélectionne 1 sauce pour accompagner ton plat :"}
          </p>
          <div className="grid gap-2.5">
            {SAUCES.map((sauce) => {
              const isSelected = selectedSauce === sauce;
              const isDefault = dish.defaultSauce === sauce;
              return (
                <button
                  key={sauce}
                  type="button"
                  onClick={() => setSelectedSauce(sauce)}
                  className={`group relative flex items-center justify-between rounded-2xl p-3.5 text-left font-display text-xs font-extrabold transition-all duration-200 border ${
                    isSelected
                      ? "bg-coral text-cream border-coral shadow-md scale-[1.02]"
                      : "bg-cream/60 border-border/80 text-brown-dark hover:bg-cream-soft hover:border-coral/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isSelected ? "bg-cream" : "bg-coral/40 group-hover:bg-coral"
                      }`}
                    />
                    {sauce}
                    {isDefault && (
                      <span className={`ml-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isSelected ? "bg-cream/20 text-cream" : "bg-coral/10 text-coral"}`}>
                        Recommandée
                      </span>
                    )}
                  </span>

                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full transition-all ${
                      isSelected
                        ? "bg-cream text-coral scale-100 opacity-100"
                        : "bg-border/40 text-transparent scale-75 opacity-0"
                    }`}
                  >
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Confirm Action */}
        <div className="border-t border-border/80 pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl bg-cream py-3 text-xs font-bold text-brown-dark/80 hover:bg-cream-soft transition-all"
          >
            Annuler
          </button>

          <button
            type="button"
            disabled={!selectedSauce}
            onClick={handleConfirm}
            className={`flex-[2] flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md ${
              selectedSauce
                ? "bg-brown-dark text-cream hover:bg-coral hover:scale-102 active:scale-98 cursor-pointer shadow-coral/25"
                : "bg-brown-dark/20 text-brown-dark/40 cursor-not-allowed shadow-none"
            }`}
          >
            <i className="fa-solid fa-check text-xs"></i>
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>
    </>
  );
}

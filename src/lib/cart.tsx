import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export type Dish = {
  id: string;
  name: string;
  price: number; // FCFA
  category: string;
  image?: string;
  featured?: boolean;
  tag?: string;
  hasSauceOption?: boolean;
  defaultSauce?: string;
  isBreakfastSuggestion?: boolean;
};

export type CartItem = Dish & {
  dishId: string;
  sauce?: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (d: Dish, sauce?: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  pulseKey: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const add = useCallback((d: Dish, sauce?: string) => {
    const itemId = sauce ? `${d.id}-${sauce}` : d.id;
    setItems((prev) => {
      const found = prev.find((i) => i.id === itemId);
      if (found) return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...d, id: itemId, dishId: d.id, sauce, qty: 1 }];
    });
    setPulseKey((k) => k + 1);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) return setItems((prev) => prev.filter((i) => i.id !== id));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, total } = useMemo(() => {
    const c = items.reduce((s, i) => s + i.qty, 0);
    const t = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { count: c, total: t };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total, open, setOpen, pulseKey }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatFCFA = (n: number) => `${n.toLocaleString("fr-FR")} F`;


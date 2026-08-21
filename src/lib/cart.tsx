import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartLine = { product: Product; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const add = (product: Product) => {
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        return found
          ? prev.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l))
          : [...prev, { product, qty: 1 }];
      });
      setOpen(true);
    };
    const setQty = (id: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.product.id !== id)
          : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
      );
    const remove = (id: string) => setLines((prev) => prev.filter((l) => l.product.id !== id));
    return {
      lines,
      open,
      setOpen,
      add,
      setQty,
      remove,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
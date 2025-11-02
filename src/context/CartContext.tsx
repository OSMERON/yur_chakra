/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ShopItem } from "../data/ShopProducts";

export type CartLine = {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
  item?: ShopItem;
};

type CartState = {
  lines: CartLine[];
  add: (item: ShopItem, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback((item: ShopItem, qty = 1) => {
    setLines(prev => {
      const ix = prev.findIndex(l => l.id === item.id);
      if (ix >= 0) {
        const next = [...prev];
        next[ix] = { ...next[ix], qty: Math.min(next[ix].qty + qty, 99) };
        return next;
      }
      const line: CartLine = {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        qty,
        item,
      };
      return [line, ...prev];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines(prev => prev.filter(l => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines(prev =>
      prev.map(l => (l.id === id ? { ...l, qty: Math.max(1, Math.min(99, qty || 1)) } : l))
    );
  }, []);

  const increment = useCallback(
    (id: string) => setQty(id, (lines.find(l => l.id === id)?.qty || 0) + 1),
    [lines, setQty]
  );

  const decrement = useCallback(
    (id: string) => setQty(id, (lines.find(l => l.id === id)?.qty || 0) - 1),
    [lines, setQty]
  );

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      c += l.qty;
      s += l.qty * l.price;
    }
    return { count: c, subtotal: Number(s.toFixed(2)) };
  }, [lines]);

  const value: CartState = {
    lines,
    add,
    remove,
    setQty,
    increment,
    decrement,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

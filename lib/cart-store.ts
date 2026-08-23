"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  slug: string;
  name: string;
  priceCents: number;
  quantity: number;
  accent: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === item.slug ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity }] });
        }
      },
      removeItem: (slug) => set({ items: get().items.filter((i) => i.slug !== slug) }),
      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "raf-shop-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}

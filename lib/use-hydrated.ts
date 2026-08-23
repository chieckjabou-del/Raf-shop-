import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true.
 * Use this to gate any UI that depends on client-only state (e.g. the
 * Zustand cart store rehydrated from localStorage) so the server-rendered
 * markup and the first client render always match — avoids hydration
 * mismatches on the cart count/total.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

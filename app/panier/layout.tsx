import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre panier",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: LayoutProps<"/panier">) {
  return children;
}

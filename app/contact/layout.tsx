import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe RAF Shop pour toute question produit, commande ou partenariat.",
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { href: "/boutique", label: "Tous les produits" },
      { href: "/notre-methode", label: "Notre méthode de sélection" },
      { href: "/a-propos", label: "À propos de RAF Shop" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "/faq", label: "Questions fréquentes" },
      { href: "/contact", label: "Nous contacter" },
      { href: "/retours-garanties", label: "Retours & garanties" },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/cgv", label: "Conditions générales de vente" },
      { href: "/confidentialite", label: "Confidentialité & cookies" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            RAF <span className="text-accent">SHOP</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            La technologie intelligente sélectionnée pour améliorer votre quotidien.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold text-foreground">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} RAF Shop. Tous droits réservés.</p>
          <p>Catalogue de démonstration — livraison selon le fournisseur de chaque produit.</p>
        </Container>
      </div>
    </footer>
  );
}

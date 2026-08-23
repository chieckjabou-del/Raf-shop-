import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CartButton } from "@/components/layout/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { NAV_LINKS } from "@/components/layout/nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          RAF <span className="text-accent">SHOP</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                  activeClassName="text-foreground"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

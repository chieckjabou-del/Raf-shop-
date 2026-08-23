# RAF Shop

Application e-commerce RAF Shop — sélection de gadgets technologiques.
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.

🌐 **Démo en ligne : https://raf-shop-gamma.vercel.app**
(déploiement automatique à chaque push sur `claude/raf-shop-handover-ooxu4n`)

⚠️ **État actuel : démonstration.** Le catalogue produit est fictif (voir
`lib/products.ts`), et le paiement/l'envoi d'e-mail ne sont pas connectés
(aucun identifiant fourni). Voir `GUIDE_DE_LANCEMENT.md` pour la marche à
suivre complète, `AUDIT_RAPPORT.md` et `AUDIT_RAPPORT_2.md` pour le détail
des deux contre-expertises, et `CHECKLIST_CLIENTE.md` pour ce qu'il reste à
obtenir de la cliente avant une mise en production réelle.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis éditer si besoin
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — sert le build de production (après `npm run build`)
- `npm run lint` — ESLint

## Structure

- `app/` — pages et routes (App Router)
- `components/` — composants UI, produit, panier, layout
- `lib/` — données produit (démo), logique panier/checkout, abstraction
  paiement (Mollie) et e-mail (Resend), toutes deux non configurées ici.

## Variables d'environnement

Voir `.env.example` pour la liste complète et les explications. Aucune clé
API réelle n'est incluse dans ce dépôt.

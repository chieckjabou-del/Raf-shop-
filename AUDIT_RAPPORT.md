# RAF Shop — Rapport d'audit n°1 (contre-expertise indépendante)

Date : 23 août 2026
Posture : cabinet d'audit externe cherchant à casser le projet, pas l'équipe qui l'a construit.

## Contexte

Ce rapport porte sur la **reconstruction complète** de RAF Shop. Le dépôt
Git ne contenait, avant cette session, aucun code — uniquement un document
stratégique (Tome 1 : vision, marché, concurrence, personas). L'audit
ci-dessous porte donc sur l'application construite pendant cette session,
testée par navigateur réel (Playwright, desktop 1440px + mobile 390px) et
par appels API directs.

## Méthode

- Build de production (`next build`) + lint (`eslint`) : 0 erreur, 0 warning.
- Parcours navigateur complet : accueil → boutique → filtre catégorie →
  fiche produit → ajout panier → panier → checkout → confirmation ; FAQ,
  contact, pages légales ; vue mobile 390×844.
- Attaques ciblées sur les routes API (`/api/checkout`, `/api/contact`) :
  prix falsifié, quantités hors bornes (0, 999), slug produit inexistant,
  produit en rupture de stock, JSON malformé, champs manquants.
- Vérification directe des slugs produit invalides (statut HTTP).

## Constats et corrections

| # | Sévérité | Constat | Correction appliquée |
|---|----------|---------|----------------------|
| 1 | 🔴 Élevée | `/produit/[slug]` renvoyait **HTTP 200** au lieu de 404 pour un slug inexistant (le contenu affiché était la bonne page 404, mais le code statut était faux — mauvais pour le SEO et pour tout monitoring externe). Bug de comportement Next.js 16 constaté sur les segments dynamiques prérendus avec `notFound()`. | Ajout de `export const dynamicParams = false` sur `/produit/[slug]` : le catalogue étant statique (`lib/products.ts`), un slug absent est désormais rejeté au niveau du routeur avec un vrai 404 HTTP. Revérifié : nouveau slug jamais vu → 404 confirmé en première requête. |
| 2 | 🟠 Moyenne | Les pages `/panier`, `/checkout`, `/contact` (composants client) n'exportaient aucun `metadata` : l'onglet du navigateur affichait le titre générique de l'accueil sur ces trois pages. | Ajout de `layout.tsx` dédiés à chaque segment (Server Components) exportant un titre propre ; panier et checkout marqués `noindex` (pages transactionnelles sans valeur SEO). |
| 3 | 🟡 Faible | Les données structurées JSON-LD produit (`JSON.stringify` injecté via `dangerouslySetInnerHTML`) n'étaient pas échappées : une future description fournisseur contenant `</script>` casserait la page. | Échappement de `<` en `<` avant injection. |
| 4 | 🟡 Faible | Aucune URL canonique sur l'accueil et la boutique. | Ajout de `alternates.canonical` sur ces deux pages. |
| 5 | 🟡 Faible | Aucune image de partage (Open Graph) : un lien RAF Shop partagé sur Slack/e-mail n'affichait pas de vignette. | Ajout d'une image OG générée dynamiquement (`app/opengraph-image.tsx`), format 1200×630, cohérente avec l'identité visuelle. |

## Points vérifiés et jugés sains (aucune correction nécessaire)

- **Prix jamais fait confiance côté client** : `/api/checkout` recalcule
  systématiquement le total à partir de `lib/products.ts` ; un prix falsifié
  envoyé dans la requête est purement et simplement ignoré.
- **Rupture de stock bloquée aussi côté serveur** (pas seulement le bouton
  désactivé côté client) : tentative d'achat d'un produit en rupture →
  rejetée avec message explicite.
- **Quantités hors bornes rejetées** (0, 999) avec message clair.
- **Slug produit inconnu** dans le panier → commande rejetée avant tout
  appel au prestataire de paiement.
- **Coordonnées de livraison incomplètes/invalides** → rejetées avant tout
  traitement.
- **JSON malformé** → rejeté proprement (400), pas de crash serveur.
- **Secrets jamais exposés côté client** : `MOLLIE_API_KEY` et
  `RESEND_API_KEY` ne sont référencés que dans des fichiers serveur
  (`lib/payment/mollie.ts`, `lib/email.ts`, routes `app/api/*`) — vérifié
  par recherche exhaustive dans le code, aucune fuite vers un composant
  `"use client"`.
- **Contraste texte secondaire** (`--muted` sur `--background`) : ratio
  calculé ≈ 9,5:1, largement au-dessus du seuil AAA (7:1).
- **Hydratation panier** : plus de risque de désynchronisation
  serveur/client — `useHydrated()` utilise `useSyncExternalStore` (pattern
  recommandé), le panier ne s'affiche qu'après confirmation du montage
  client.
- **`new Date()` dans le footer** : sans risque, le Footer est un Server
  Component (rendu une seule fois côté serveur par requête, pas
  d'hydratation à désynchroniser).
- **error.tsx / global-error.tsx / loading.tsx / not-found.tsx** : tous
  présents et conformes aux conventions Next.js App Router.
- **Formulaire de contact** : mêmes règles de validation appliquées côté
  client (bouton désactivé) et côté serveur (API) — pas d'incohérence.

## Niveau de risque global à l'issue de l'audit n°1

**Faible pour une démonstration**, **moyen pour une mise en production
réelle** tant que : le paiement n'est pas connecté, les pages légales ne
sont pas validées par un juriste, et le catalogue reste fictif. Ces trois
points sont traités dans `GUIDE_DE_LANCEMENT.md` et `CHECKLIST_CLIENTE.md`.

Voir `AUDIT_RAPPORT_2.md` pour la seconde contre-expertise (posture CTO
pré-lancement), qui ne répète pas ces constats.

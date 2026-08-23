# RAF Shop — Rapport d'audit n°2 (contre-expertise indépendante)

Date : 23 août 2026
Posture : « Je suis le CTO responsable de mettre RAF Shop en production demain. »

Ce second audit ne répète pas les constats du premier
(`AUDIT_RAPPORT.md`). Il porte spécifiquement sur ce qu'un CTO vérifierait
avant un déploiement réel : configuration, en-têtes, variables
d'environnement, résilience de l'infrastructure.

## Constats et corrections

| # | Sévérité | Constat | Correction appliquée |
|---|----------|---------|----------------------|
| 1 | 🟠 Moyenne | Aucun en-tête de sécurité HTTP configuré (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`). En-tête `X-Powered-By: Next.js` exposé, révélant inutilement la stack technique. | En-têtes de sécurité ajoutés globalement dans `next.config.ts` ; `poweredByHeader: false`. Vérifié par requête HTTP directe : tous les en-têtes attendus sont présents, `X-Powered-By` a disparu. |
| 2 | 🟡 Faible | Aucune contrainte de version Node.js déclarée dans `package.json`, alors que Next.js 16 exige Node ≥ 20.9.0. Un déploiement sur une plateforme utilisant une version antérieure par défaut échouerait silencieusement ou de façon peu claire. | Ajout de `"engines": { "node": ">=20.9.0" }`. |
| 3 | 🟡 Faible | La navigation (desktop et mobile) n'indiquait pas la page active — ni visuellement, ni pour les technologies d'assistance (`aria-current`). | Ajout d'un composant `NavLink` appliqué au header et au menu mobile ; vérifié : `aria-current="page"` présent sur le lien actif, absent ailleurs. |

## Points vérifiés et jugés sains

- **Variables d'environnement** : correspondance exacte entre les variables
  réellement lues dans le code (`process.env.*`, recherche exhaustive) et
  celles documentées dans `.env.example`. Aucune variable fantôme, aucune
  variable manquante.
- **TypeScript strict** : `strict: true` actif dans `tsconfig.json`.
- **Viewport mobile** : meta tag `viewport` correctement injecté par
  Next.js sur toutes les pages (vérifié par inspection du HTML rendu).
- **Cohérence des montants** : le sous-total, les frais de livraison
  (seuil de gratuité 60 €, sinon 4,90 €) et le total sont calculés à partir
  des **mêmes constantes partagées** (`lib/checkout.ts`) côté panier, côté
  page de paiement et côté API — aucun risque de décalage entre le montant
  affiché au client et celui effectivement soumis au prestataire de
  paiement une fois celui-ci connecté.
- **Provenance des dépendances** : vérification que `lucide-react`
  (version `1.33.0`, numérotation majeure inhabituelle pour ce paquet)
  résout bien depuis le registre npm officiel (`registry.npmjs.org`), pas
  d'indice de dépendance malveillante ou de confusion de nom.
- **Aucun secret commité** : seul `.env.example` (sans valeurs réelles) est
  versionné ; `.gitignore` exclut `.env*` avec une exception explicite pour
  `.env.example`.

## Limitations connues, documentées plutôt que masquées

Conformément à la règle de transparence du projet, les points suivants
**ne sont pas corrigés** dans cette version car ils nécessitent une
infrastructure non disponible dans cet environnement — ils sont
documentés plutôt que simulés :

- **Pas de limitation de débit (rate limiting)** sur `/api/checkout` et
  `/api/contact`. Un limiteur en mémoire serait inefficace et trompeur sur
  une infrastructure serverless (chaque instance repart de zéro) : il
  faudrait un store externe (Upstash Redis, Vercel KV) non provisionné
  ici. **À faire avant un lancement avec trafic public réel.**
- **Pas de persistance des commandes** (aucune base de données). Le
  webhook Mollie (`app/api/webhooks/mollie/route.ts`) vérifie le statut
  réel du paiement mais ne peut rien enregistrer durablement. **Bloquant
  pour la production réelle**, documenté dans le code et dans
  `GUIDE_DE_LANCEMENT.md`.
- **`NEXT_PUBLIC_SITE_URL` doit être définie explicitement** lors du
  déploiement, sinon le sitemap, l'image Open Graph et les données
  structurées produit pointeront vers `localhost:3000`. Ce n'est pas un
  bug corrigible dans le code : c'est une variable d'environnement à
  fournir à la plateforme d'hébergement.
- **`robots.ts` et `sitemap.ts` sont générés statiquement au build.**
  Changer `NEXT_PUBLIC_SITE_MODE` de `demo` à `production` nécessite un
  **redéploiement complet**, pas seulement un changement de variable dans
  le tableau de bord d'hébergement.

## Niveau de risque global à l'issue de l'audit n°2

**Prêt pour une démonstration client dès maintenant.** Trois conditions
bloquent une mise en production commerciale réelle : connexion du
paiement (Mollie), persistance des commandes (base de données), et
validation juridique des pages légales. Aucune de ces trois conditions
n'est un problème de qualité du code — ce sont des dépendances externes ou
des décisions qui appartiennent à la cliente.

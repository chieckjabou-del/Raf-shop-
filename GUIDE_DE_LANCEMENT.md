# RAF Shop — Guide de lancement (pour non-développeur)

Ce document explique, en langage simple, où en est le projet, ce qu'il
reste à faire, et comment agir sur chaque point — même sans compétence
technique.

Légende utilisée dans ce document :
✅ VÉRIFIÉ · ⚠️ HYPOTHÈSE / À VALIDER · ❌ NON FAIT · 🔴 BLOQUÉ (dépend de vous)

---

## 0. Modèle commercial confirmé (mise à jour)

✅ **Décision de la cliente** : RAF Shop fonctionne en dropshipping pur.
Concrètement :

1. La cliente négocie directement avec chaque fournisseur.
2. Le fournisseur expédie directement au client final — **RAF Shop ne
   gère aucun stock ni aucune livraison**.
3. Le rôle de RAF Shop se limite à : collecter le paiement du client sur
   le site, **payer le fournisseur** pour le coût du produit, et faire la
   **publicité/marketing** de la boutique.

Le site a été mis à jour en conséquence : les mentions « livraison
Colissimo / point relais » ont été remplacées par « expédié par notre
fournisseur partenaire » partout où elles apparaissaient (fiche produit,
accueil, checkout, FAQ, CGV, retours & garanties).

⚠️ **Point légal à noter** (déjà ajouté dans les CGV, à faire valider par
un juriste) : même si un fournisseur tiers expédie physiquement le
produit, RAF Shop reste, vis-à-vis du client final, le vendeur
responsable de la bonne exécution de la commande (article L.216-1 du
Code de la consommation). Le dropshipping ne transfère pas cette
responsabilité au fournisseur.

---

## 1. Ce qui est prêt aujourd'hui

✅ Un site e-commerce complet et fonctionnel : accueil, boutique avec
filtres par catégorie, fiches produit détaillées, panier, tunnel de
commande, FAQ, page contact, page « à propos », page « notre méthode »,
pages légales (structure prête, textes à valider juridiquement).

✅ Design premium sombre + bleu électrique, cohérent sur toutes les pages,
responsive (testé sur desktop et mobile).

✅ Le panier fonctionne réellement : ajout, suppression, quantités, calcul
du total — vous pouvez le tester vous-même dès que le site est en ligne.

✅ Le prix final est toujours recalculé et vérifié par le serveur, jamais
par ce que le navigateur du client envoie — protection standard contre la
fraude au prix.

⚠️ **Le catalogue est fictif.** Les 8 produits affichés (chargeur, enceinte,
casque, etc.) sont des exemples de démonstration, clairement marqués
« DEMO » sur le site. Aucun n'est un vrai produit en vente.

❌ **Le paiement n'est pas connecté.** Un client qui va jusqu'au bout du
tunnel de commande voit un écran qui explique honnêtement que la
démonstration s'arrête là — aucun faux « paiement réussi » n'est affiché.

❌ **L'envoi d'e-mail n'est pas connecté.** Le formulaire de contact
fonctionne mais les messages ne partent pas encore par e-mail (ils
resteraient visibles uniquement dans les journaux techniques du serveur).

---

## 2. Ce qu'il vous reste à fournir

Voir le détail complet dans `CHECKLIST_CLIENTE.md`. En résumé, dans l'ordre
de priorité pour la démonstration puis pour le lancement réel :

1. **Pour montrer le site à la cliente** : rien de plus n'est nécessaire — la
   version démo actuelle suffit, une fois mise en ligne (voir section 5).
2. **Pour connecter le paiement** : un compte Mollie (voir section 4).
3. **Pour recevoir les messages de contact par e-mail** : un compte Resend
   (gratuit jusqu'à un certain volume) ou un service équivalent.
4. **Pour vendre réellement** : vrais produits, vrais prix, vraies photos,
   informations légales de la société, validation juridique des CGV.

---

## 3. Comment modifier les produits et les prix

Tous les produits sont définis dans un seul fichier :
`lib/products.ts`

Chaque produit est un bloc qui ressemble à ceci :

```ts
{
  slug: "chargeur-voyage-3-en-1",       // identifiant dans l'URL, ne pas changer après publication
  name: "Chargeur MagSafe 3-en-1 Voyage", // nom affiché
  tagline: "...",                        // phrase d'accroche
  description: "...",                    // description longue
  category: "productivite",              // catégorie (voir lib/types.ts pour la liste)
  priceCents: 4990,                      // PRIX EN CENTIMES : 4990 = 49,90 €
  compareAtPriceCents: 6490,             // prix barré (optionnel), enlever la ligne si pas de promo
  specs: [ { label: "Poids", value: "142 g" }, ... ],
  highlights: [ "...", "...", "..." ],
  inStock: true,                         // false = affiche "Rupture de stock", achat bloqué
  accent: "#2b6bff",                     // couleur d'accent de la fiche produit
}
```

**Important : les prix sont en centimes.** 49,90 € s'écrit `4990`, pas
`49.90`. C'est une convention standard en e-commerce pour éviter les
erreurs d'arrondi.

Pour ajouter un vrai produit, dupliquez un bloc existant, remplissez les
vraies informations, et changez `slug` pour quelque chose d'unique (ex.
`ma-nouvelle-enceinte`). Aucune autre modification n'est nécessaire : la
page produit, la boutique, le panier et le total se mettent à jour
automatiquement.

**Pour remplacer les visuels de démonstration par de vraies photos**, il
faudra qu'un développeur ajoute les fichiers image dans `public/produits/`
et modifie `components/product/ProductVisual.tsx` pour afficher une vraie
image (`next/image`) plutôt que l'icône générique actuelle. C'est une
tâche technique simple mais qui nécessite une intervention de code.

---

## 4. Comment connecter le paiement (Mollie)

**Pourquoi Mollie et pas Stripe ?** Vous nous avez demandé d'exclure
Stripe. Après analyse, Mollie a été retenu : il couvre carte bancaire,
PayPal, Apple Pay et Google Pay en une seule intégration, avec une page de
paiement hébergée par Mollie (vous n'avez jamais à gérer de numéros de
carte bancaire vous-même), et il est largement utilisé par les commerçants
français et européens.

Étapes pour activer le paiement réel :

1. Créez un compte sur [mollie.com](https://www.mollie.com) (nécessite vos
   informations d'entreprise — SIRET, RIB).
2. Une fois le compte validé par Mollie, récupérez votre **clé API** dans
   leur tableau de bord (Développeurs → Clés API).
3. Fournissez cette clé pour qu'elle soit ajoutée comme variable
   d'environnement `MOLLIE_API_KEY` sur la plateforme d'hébergement (voir
   section 5) — **ne l'envoyez jamais par e-mail ou chat non sécurisé**,
   utilisez le formulaire sécurisé de la plateforme d'hébergement
   (Vercel : Settings → Environment Variables).
4. Une fois la clé configurée et le site redéployé, le tunnel de commande
   redirige automatiquement vers la vraie page de paiement Mollie — aucune
   autre modification de code n'est nécessaire, tout est déjà branché.

🔴 **Avant d'activer un vrai paiement**, il manque encore une brique
technique : l'enregistrement des commandes (voir section 7, « Limitations
à lever avant la production réelle »). Sans cela, une commande payée ne
serait pas visible nulle part côté RAF Shop au-delà des journaux
techniques — un développeur doit ajouter une base de données avant
d'accepter de vrais paiements.

---

## 5. Le site est en ligne

✅ **URL publique de démonstration : https://raf-shop-gamma.vercel.app**

Déployé sur Vercel (projet `raf-shop`, compte `chieckjabou-dels-projects`),
branché sur la branche `claude/raf-shop-handover-ooxu4n` du dépôt GitHub.
Chaque nouveau `git push` sur cette branche redéploie automatiquement le
site — aucune action manuelle n'est nécessaire pour les mises à jour
futures tant que le code est poussé sur cette branche.

Le site utilise automatiquement son URL de déploiement Vercel pour le
SEO, l'image de partage et le sitemap — vous n'avez rien à configurer
pour la démonstration. `NEXT_PUBLIC_SITE_URL` ne devient utile que le
jour où un nom de domaine personnalisé (ex. rafshop.fr) est branché.

Pour brancher un nom de domaine personnalisé plus tard : tableau de bord
Vercel → projet `raf-shop` → Settings → Domains.

---

## 6. Comment gérer les commandes (une fois le paiement actif)

🔴 Ce point n'est **pas encore construit**. Actuellement, RAF Shop n'a pas
de base de données : c'est la limitation la plus importante avant une
vraie mise en vente. Concrètement, il manque :

- Un endroit où chaque commande payée est enregistrée (base de données).
- Un espace où vous pouvez consulter la liste des commandes.
- L'envoi automatique d'un e-mail de confirmation au client.

C'est un chantier technique clairement identifié et isolé (le code du
webhook de paiement, dans `app/api/webhooks/mollie/route.ts`, contient déjà
un commentaire `TODO` à l'endroit exact où cette fonctionnalité doit être
branchée). Ce n'est pas nécessaire pour la démonstration, mais c'est
bloquant avant d'accepter de vrais paiements.

---

## 7. Limitations à lever avant la production réelle

Résumé des points 🔴 bloquants pour une vraie mise en vente (pas pour la
démonstration, qui est prête dès maintenant) :

1. Base de données pour enregistrer les commandes (section 6).
2. Compte Mollie actif + clé API (section 4).
3. Service d'envoi d'e-mail (Resend ou équivalent) pour les confirmations
   de commande et le formulaire de contact.
4. Vrais produits, vrais prix, vraies photos, vrai stock (section 3).
5. Relecture des pages légales par un professionnel du droit — les textes
   actuels (`app/mentions-legales`, `app/cgv`, `app/confidentialite`,
   `app/retours-garanties`) sont des bases de travail structurées, pas des
   documents juridiquement validés. Chaque page affiche un bandeau
   d'avertissement à ce sujet tant que ce n'est pas fait.
6. Informations légales de la société (raison sociale, SIRET, adresse,
   hébergeur) à insérer dans les mentions légales.
7. Limitation de débit (rate limiting) sur les formulaires publics, pour
   éviter les abus une fois le site exposé à un vrai trafic (voir
   `AUDIT_RAPPORT_2.md`).
8. Passer `NEXT_PUBLIC_SITE_MODE` de `demo` à `production` (et
   redéployer) une fois le catalogue réel en place, pour autoriser
   l'indexation par Google.

---

## 8. Questions fréquentes

**« Est-ce que je peux montrer ce site à la cliente maintenant ? »**
Oui : le site est en ligne à l'adresse https://raf-shop-gamma.vercel.app,
donne une impression professionnelle complète, avec panier fonctionnel.
Précisez simplement à la cliente que le catalogue et le paiement sont en
mode démonstration.

**« Qui a écrit les CGV et mentions légales ? »**
Une IA, à partir des obligations légales françaises standards
(rétractation 14 jours, garantie légale 2 ans, RGPD). Ce n'est **pas** une
validation juridique. Un avocat ou juriste doit les relire avant toute
mise en ligne commerciale.

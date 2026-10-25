# RAF Shop — Checklist des éléments à obtenir de la cliente

Liste de ce qu'il faudra collecter avant de transformer la démonstration
actuelle en boutique réellement opérationnelle. Organisée par priorité.

## Identité de marque

- [ ] Logo (fichier vectoriel de préférence : SVG ou AI/EPS)
- [ ] Charte graphique si elle existe déjà (couleurs, typographie) —
      sinon, la direction actuelle (noir profond + bleu électrique) sert
      de base de travail à valider ou amender
- [ ] Ton de voix / éléments de langage à privilégier ou à éviter

## Catalogue produit (pour chaque produit)

- [x] Nom du produit — 8 produits réels sourcés sur CJdropshipping et
      intégrés le 25/10/2026 (voir `lib/products.ts`)
- [ ] Photos (plusieurs angles, fond neutre de préférence — au minimum une
      photo principale par produit) — chaque fiche affiche encore un
      visuel générique marqué « Photo à venir »
- [x] Compte fournisseur CJdropshipping créé (`Agshop200@gmail.com`) —
      25/10/2026.
- [ ] Description et caractéristiques techniques précises — seul le titre
      de l'annonce fournisseur a été utilisé ; à compléter avant mise en
      vente commerciale (voir « Caractéristiques détaillées » sur
      chaque fiche produit)
- [x] Prix de vente TTC — prix proposés automatiquement (conversion
      USD→EUR + marge par défaut), **à valider ou ajuster** : voir le
      tableau des 8 produits dans `lib/products.ts` (champ `priceCents`)
- [ ] Transporteur et délai d'expédition utilisés par ce fournisseur
- [ ] Garantie constructeur éventuelle, en plus de la garantie légale
- [ ] Éco-participation applicable (obligatoire pour les produits
      électroniques — voir REP/DEEE dans `app/retours-garanties`)

## Politique commerciale

- [ ] Coordonnées et modalités de paiement de chaque fournisseur (RAF Shop
      les paie directement — ce n'est pas le client final qui les paie)
- [ ] Politique de livraison par fournisseur : zones couvertes, délais,
      transporteur — chaque fournisseur gère sa propre expédition
- [ ] Politique de retour par fournisseur : qui prend en charge les frais
      de retour, adresse de retour, délai de remboursement — RAF Shop reste
      l'interlocuteur du client, mais coordonne avec le fournisseur
- [ ] Seuil de livraison offerte (60 € utilisé comme hypothèse dans la
      démonstration — à confirmer)

## Informations légales de l'entreprise

- [ ] Raison sociale et forme juridique
- [ ] Numéro SIRET / RCS
- [ ] Capital social
- [ ] Adresse du siège social
- [ ] Numéro de TVA intracommunautaire
- [ ] Nom du directeur de la publication
- [ ] Adresse e-mail de contact officielle
- [ ] Médiateur de la consommation retenu (obligatoire pour la vente en
      ligne aux consommateurs en France)

## Paiement et finances

- [ ] Décision de créer un compte Mollie (voir `GUIDE_DE_LANCEMENT.md`,
      section 4) — nécessite un RIB professionnel et des justificatifs
      d'entreprise
- [ ] Moyens de paiement à activer précisément (carte bancaire seule, ou
      + PayPal, + Apple Pay / Google Pay)
- [ ] Compte bancaire professionnel destinataire des paiements

## Nom de domaine et hébergement

- [ ] Décision sur le nom de domaine définitif (ex. rafshop.fr) — achat à
      votre charge, généralement 10-15 €/an
- [ ] Compte Vercel (gratuit pour démarrer) pour héberger le site — voir
      `GUIDE_DE_LANCEMENT.md`, section 5
- [ ] Compte Resend (ou service e-mail équivalent) pour l'envoi des
      confirmations de commande et des réponses au formulaire de contact

## Conformité et validation juridique

- [ ] Relecture des mentions légales par un professionnel du droit
- [ ] Relecture des CGV par un professionnel du droit
- [ ] Relecture de la politique de confidentialité (RGPD) — désignation
      d'un contact RGPD si nécessaire
- [ ] Mise en place d'un bandeau de consentement cookies conforme aux
      recommandations CNIL (non implémenté dans la démonstration actuelle)

## Analytics et suivi (optionnel, recommandé avant lancement)

- [ ] Décision sur l'outil d'analyse d'audience (ex. Plausible, Google
      Analytics) — non intégré dans la démonstration actuelle
- [ ] Compte Google Search Console (à activer une fois le site en mode
      `production`, pas avant, pour éviter d'indexer le catalogue fictif)

---

**Rien de tout cela n'est nécessaire pour montrer la démonstration
actuelle à la cliente.** Cette checklist prépare l'étape suivante :
transformer la démonstration en boutique réelle.

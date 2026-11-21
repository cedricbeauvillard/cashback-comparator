# Audit préalable à la migration — 19 novembre 2026

## Vérifications effectuées (GitHub)
- Branche de travail : `feature-cashback-offers-schema`; aucun déploiement ni exécution SQL.
- `main` et la branche de travail ont divergé : branche 12 commits en avance, 1 commit en retard (comparaison GitHub au moment de l'audit). Vérifier le commit de `main` et résoudre toute divergence avant fusion.
- Prisma `4.4.0` et Next.js `12.2.5` d'après `package.json`.
- `prisma/schema.prisma` sur branche de travail contient les champs approuvés et `@@unique([sellerId, cashbackerId, type])`.
- Migration versionnée `20261111220000_add_cashback_offers/migration.sql` prépare la création de CashbackOffer et sa clé unique.
- `docs/sql-drafts/target-existing-tables.sql` est un brouillon SQL **non enregistré comme migration Prisma** : ne pas l'exécuter directement en production.

## Points à résoudre avant validation technique
1. Vérifier la compatibilité exacte des types et contraintes avec le schéma MySQL réel, `_prisma_migrations` et les index existants (aucun accès production utilisé lors de cet audit).
2. Convertir les évolutions des tables existantes en migration Prisma versionnée, ordonnée et reproductible. Ne pas laisser coexister une migration manuelle non suivie et `prisma migrate deploy`.
3. Exécuter `prisma validate` et `prisma migrate diff` / tests de migration sur une base de test, avec Prisma 4.4.
4. Vérifier le comportement de `isPrimary` : au maximum une catégorie principale par marchand ; contrôler les modifications dans une transaction.
5. Tester les relations auto-référentes `Category.parentId` et `Seller.redirectSellerId`, l'interdiction des cycles et les redirections applicatives.
6. Valider la stratégie de conservation des offres et la sécurité des suppressions (les relations CashbackOffer vers Seller/Cashbacker sont actuellement en cascade).
7. Vérifier que les imports historiques continuent de fonctionner, que les colonnes Seller de taux ne sont pas supprimées et que les pages publiques restent compatibles.
8. Réconcilier la branche avec le commit plus récent de `main`, puis effectuer la revue de PR avant fusion.

## Ordre de déploiement recommandé (après autorisation explicite)
- Sauvegarde/restauration testée ; préflight SQL en lecture seule ; migrations additives ; vérifications ; import contrôlé sur jeu pilote ; lecture applicative avec repli legacy ; déploiement progressif.
- Ne pas appliquer de migrations ni modifier la production sans feu vert explicite.

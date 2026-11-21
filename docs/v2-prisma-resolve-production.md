# Synchronisation Prisma V2 — opération en attente d'un accès d'exécution

## État observé le 21 novembre 2026
L'utilisateur a créé dans `defaultdb` les cinq tables V2 via DBeaver. Contrôles transmis : 0 ligne dans chacune, 6 clés étrangères conformes au DDL, et `_prisma_migrations` contient uniquement six migrations de 2022–2023. Le workflow GitHub Actions de validation Prisma hors ligne est vert.

**Aucune commande de résolution Prisma n'a encore été exécutée contre la production.**

## Procédure requise
1. Vérifier que la branche contenant `prisma/schema.prisma` et `prisma/migrations/20261111220000_add_cashback_offers/migration.sql` correspond exactement au DDL déjà appliqué. Le contrôle GitHub actuel vérifie le schéma et des signatures SQL, **pas** une comparaison exhaustive de structure.
2. Depuis un environnement temporaire autorisé pouvant atteindre la base, avec `DATABASE_URL` fourni via un mécanisme sécurisé (pas dans un commit ni dans un log), exécuter `npx prisma@4.4.0 migrate status --schema prisma/schema.prisma` et vérifier qu'aucune migration précédente ne manque.
3. Si le DDL et l'historique sont cohérents, exécuter une seule fois :
   `npx prisma@4.4.0 migrate resolve --applied 20261111220000_add_cashback_offers --schema prisma/schema.prisma`
   Cette commande **enregistre** la migration ; elle ne recrée pas les tables.
4. Vérifier via DBeaver :
   `SELECT migration_name, finished_at, rolled_back_at FROM _prisma_migrations ORDER BY started_at DESC;`
   puis `SELECT COUNT(*)` pour chaque table V2.
5. Ne pas exécuter `prisma migrate deploy` tant que la synchronisation n'est pas confirmée ; ne pas écrire manuellement dans `_prisma_migrations`.

## Accès
Le dépôt GitHub n'a aucun secret Actions de base de données. DBeaver a accès à MySQL mais n'exécute pas la CLI Prisma. Les outils disponibles à l'assistant permettent les commits GitHub, pas les commandes sur DigitalOcean/MySQL. **Le marquage --applied est donc bloqué jusqu'à l'accès à un environnement d'exécution Prisma sécurisé.**

## Ne pas confondre
La création SQL des tables est **terminée** ; la synchronisation de l'historique Prisma **ne l'est pas**. La copie V1→V2 et l'import des 6 973 offres sont des opérations distinctes et non exécutées.

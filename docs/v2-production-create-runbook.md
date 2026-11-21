# Exécution de la création des tables V2 en production — procédure contrôlée

**Autorisation utilisateur :** création des cinq tables V2 vides dans la base MySQL de production. **Ne sont pas autorisés par cette étape :** copie des données, import des 6 973 offres, changement de code public, bascule de trafic ou modification V1.

## Avant l'exécution
1. Vérifier sur DigitalOcean que le cluster ciblé est le bon et que la sauvegarde/restauration est disponible et récente. Conserver le point de restauration et l'horodatage.
2. Lire `_prisma_migrations` pour savoir si `20261111220000_add_cashback_offers` a déjà été appliquée ; si oui **STOP**. Cette migration a changé de contenu sur la branche et ne doit pas être réappliquée sous le même nom. En cas d'historique divergent, créer une nouvelle migration propre et vérifier les checksums.
3. Vérifier que les tables `SellerV2`, `CashbackerV2`, `CategoryV2`, `CategoriesOnSellersV2`, `CashbackOfferV2` n'existent pas déjà. Si l'une existe, **STOP** et auditer, ne pas lancer de script destructeur.
4. Vérifier la syntaxe et la compatibilité Prisma/MySQL de `prisma/schema.prisma` et du script `prisma/migrations/20261111220000_add_cashback_offers/migration.sql` dans un environnement local jetable avant exécution. Un brouillon SQL n'est pas une migration validée.
5. Exécuter uniquement le DDL de création des cinq tables V2, avec un compte ayant les permissions nécessaires. Ne pas exécuter `prisma db push --accept-data-loss` ni `prisma migrate reset`.
6. Contrôler `SHOW TABLES LIKE '%V2'`, `SHOW CREATE TABLE`, les FK, les index, et que les cinq tables sont vides.
7. Contrôler les pages publiques et la console V1. En cas d'échec partiel, arrêter et diagnostiquer : MySQL DDL peut avoir été partiellement committé.

## Séparation stricte
- **Étape A** : créer les cinq tables V2 vides (seule opération autorisée à ce stade).
- **Étape B** : reprise V1 vers V2, à décider et contrôler séparément.
- **Étape C** : chargement des offres WEB / GIFT_CARD / AUTOMATIC, sans Joko pour l'instant.
- **Étape D** : pages pilotes et administration V2, sans changement d'URL.

## État
Le dépôt GitHub contient le brouillon Prisma et SQL, mais aucun outil DigitalOcean / MySQL de production n'est actuellement connecté dans cette conversation. **Aucune création de table n'a été exécutée**.

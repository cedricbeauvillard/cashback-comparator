# Migration CashbackOffer — procédure de déploiement

**Statut : préparée, non exécutée.** Cette migration est additive : elle crée uniquement `CashbackOffer` et deux clés étrangères. Elle ne supprime aucune colonne ni donnée existante.

## Préconditions
1. Vérifier sur DigitalOcean la restauration à un instant précis (7 jours) et la possibilité de restaurer dans un nouveau cluster. Cela **ne remplace pas** une sauvegarde/export indépendant si disponible.
2. Éviter la fenêtre de maintenance MySQL annoncée vendredi.
3. Vérifier dans `defaultdb` : `SHOW TABLES LIKE 'CashbackOffer';` (doit être absent) ; `SHOW CREATE TABLE Seller;` et `SHOW CREATE TABLE Cashbacker;` (IDs compatibles avec INTEGER signé).
4. Prévoir un créneau et garder l'ancienne application en production pendant la migration.

## Exécution (après validation)
- Appliquer la migration Prisma **une seule fois**, via `npx prisma migrate deploy` depuis un environnement autorisé disposant de `DATABASE_URL` et d'un accès SSL au cluster, **avant** tout déploiement qui interroge `CashbackOffer`.
- Ne pas exécuter séparément le SQL puis `migrate deploy` sans enregistrer l'état Prisma : risque de tentative de création en double.
- Vérifier : `SHOW CREATE TABLE CashbackOffer;` et `SELECT COUNT(*) FROM CashbackOffer;` (initialement zéro).
- Ne pas modifier les imports existants, ni les lectures des pages IKEA/Airbnb/JouéClub à cette étape.

## Retour arrière
- Si la création échoue, conserver l'application existante ; diagnostiquer avant de réessayer.
- En cas de souci ultérieur, revenir au code de lecture legacy : **ne pas supprimer la table**, ce qui évite toute perte d'offres ajoutées.
- Une restauration DigitalOcean se fait vers un **nouveau cluster** et exige une procédure de bascule de connexion ; elle n'est pas un bouton d'annulation instantané.

## Étape suivante
- Peupler d'abord les offres JouéClub à partir de données vérifiées, puis introduire une lecture ciblée avec repli sur les champs legacy. Ne pas inventer de taux ni de conditions.

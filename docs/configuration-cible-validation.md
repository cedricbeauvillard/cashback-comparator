# Configuration cible — MeilleursCashback (validation progressive)

**Document de conception uniquement.** Aucun changement de schéma, migration SQL, import ou déploiement en production n'est autorisé par ce document. Les champs ci-dessous sont des décisions de cible et ne sont PAS encore présents dans le schéma Prisma.

## Tables validées

### Seller — existante
- Conserver intégralement les champs existants et les identifiants, y compris les colonnes de taux historiques pendant la transition.
- **Ajouter ultérieurement** `websiteDomain VARCHAR(255) NULL` : domaine officiel de référence pour faciliter le rapprochement ; ni unique ni obligatoire (plusieurs enseignes peuvent partager un domaine).
- **Ajouter ultérieurement** `isActive BOOLEAN NOT NULL DEFAULT TRUE` : statut du marchand, distinct de la disponibilité d'une offre cashback.
- Ne pas ajouter de colonnes supplémentaires de taux ; les offres cibles iront dans CashbackOffer.

### Cashbacker — existante
- Conserver tous les champs et identifiants existants.
- **Ajouter ultérieurement** `isActive BOOLEAN NOT NULL DEFAULT TRUE` : statut de la plateforme, distinct du statut de ses offres.

### Category — existante
- Conserver `id` et `name`.
- **Ajouter ultérieurement** `parentId INT NULL` : clé étrangère auto-référente vers `Category.id` pour une hiérarchie limitée dans l'application à deux niveaux (catégorie / sous-catégorie).
- Les catégories existantes restent des racines (`parentId = NULL`) lors de l'ajout ; la migration et les affectations seront validées séparément.

## En discussion — non validée

### CategoriesOnSellers — existante
- Actuellement : `sellerId`, `categoryId` et clé primaire composite.
- Question à trancher : faut-il une catégorie principale parmi plusieurs associations ?
- Option simple : ajouter `isPrimary BOOLEAN NOT NULL DEFAULT FALSE`, mais ce seul champ ne garantit pas l'unicité de la catégorie principale par marchand ; il faudra des contrôles applicatifs ou une autre conception. **Aucune décision prise.**

## Autres tables à examiner
- SellerMapping : nouvelle table proposée, non validée ni implémentée.
- CashbackOffer : nouvelle table proposée dans la PR #14, non déployée.
- Category, CategoriesOnSellers, Seller, Cashbacker sont des tables existantes ; UserMessage et Administrator restent inchangées.

## Règles métier validées pour les imports cashback
- Une offre cible par combinaison marchand + plateforme + type (WEB / GIFT_CARD / AUTOMATIC).
- Un seul champ `rate` : pour des taux progressifs ou par catégorie d'achat, retenir le taux / montant EUR le plus élevé.
- Plusieurs taux en pourcentage : retenir le pourcentage maximum ; plusieurs montants fixes : retenir le montant maximum.
- Si coexistence d'une offre en EUR et en %, privilégier le pourcentage.
- `FIXED` = montant EUR ; « jusqu'à » = valeur maximale avec `isRangeRate = true`.
- « Pas de cashback en ce moment » = taux 0.
- Utiliser le Mapping Master cumulatif et respecter les rapprochements et exclusions validés.

## Sécurité de la migration
- Aucun changement en production avant validation explicite, vérification du schéma réel, sauvegarde et procédure de retour arrière.
- Ne pas supprimer les colonnes historiques de Seller pendant la migration.

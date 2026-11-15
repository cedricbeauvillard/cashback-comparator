# Configuration cible — MeilleursCashback (validation progressive)

**Document de conception uniquement.** Aucun changement de schéma, migration SQL, import ou déploiement en production n'est autorisé par ce document. Les champs ci-dessous sont des décisions de cible et ne sont PAS encore présents dans le schéma Prisma.

## Tables validées

### Seller — existante
- Conserver intégralement les champs existants et les identifiants, y compris les colonnes de taux historiques pendant la transition.
- **Ajouter ultérieurement** `websiteDomain VARCHAR(255) NULL` : domaine officiel de référence pour faciliter le rapprochement ; ni unique ni obligatoire (plusieurs enseignes peuvent partager un domaine).
- **Ajouter ultérieurement** `isActive BOOLEAN NOT NULL DEFAULT TRUE` : statut du marchand, distinct de la disponibilité d'une offre cashback.
- **Ajouter ultérieurement** `description TEXT NULL` : présentation éditoriale du marchand, destinée à enrichir les fiches marchands et leur contenu SEO. Le champ peut rester vide pendant la transition.
- **Ajouter ultérieurement** `redirectSellerId INT NULL` : référence à `Seller.id` (clé étrangère auto-référente) pour les fusions de marchands et redirections HTTP 301 des anciennes URL vers la fiche de destination. Valeur `NULL` = pas de redirection. Préserver la fiche source et son ancien slug.
- **Règles à implémenter côté application** : empêcher les redirections vers soi-même, les cycles, les destinations inactives et les chaînes de redirections ; faire pointer directement vers la destination finale active. Un marchand inactif sans `redirectSellerId` ne doit pas être redirigé arbitrairement. Les imports devront rattacher les offres au marchand de destination après une fusion. Le champ SQL seul ne crée aucune redirection HTTP.
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
- SellerMapping : **écartée de la configuration cible SQL**. Le Mapping Master Excel reste le référentiel externe cumulatif des alias, identifiants et décisions de rapprochement. Aucun modèle/table SellerMapping à créer.
- CashbackOffer : **structure métier validée** ; nouvelle table proposée dans la PR #14, **non déployée**. Ajouter `lastCheckedAt DATETIME(3) NULL` et une contrainte d'unicité composite `UNIQUE(sellerId, cashbackerId, type)` au modèle et à la migration **avant toute application SQL**. Les 12 champs existants du modèle de PR #14 sont conservés. La PR #14 ne contient pas encore ces deux améliorations : ne pas appliquer la migration en l'état.
- Pour les imports, une combinaison marchand / plateforme / type doit être mise à jour (upsert), jamais dupliquée. `lastCheckedAt` indique la dernière vérification de l'offre et ne remplace pas `updatedAt` (date de modification de la ligne).
- Category, CategoriesOnSellers, Seller, Cashbacker sont des tables existantes ; UserMessage et Administrator restent inchangées.

## Circuit d'import validé (conception)
- Préparer les rapprochements hors de la base SQL à partir du Mapping Master Excel cumulatif ; ne jamais perdre l'historique des alias, ignorés et cas à rapprocher.
- Préparer un Excel d'import contenant des identifiants internes Seller/Cashbacker validés et les champs des offres, plutôt que d'importer des noms de plateformes ambigus.
- Faire évoluer la console d'administration pour charger cet Excel, prévisualiser les créations/mises à jour, contrôler les clés étrangères, les doublons et les conflits, puis appliquer les changements aux seules tables Seller et CashbackOffer.
- Prévoir un journal d'import, une sauvegarde et un retour arrière adaptés avant toute exécution ; conserver les imports legacy tant que le nouveau circuit n'est pas testé.
- Les pages publiques lisent Seller et CashbackOffer, pas le Mapping Master.

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

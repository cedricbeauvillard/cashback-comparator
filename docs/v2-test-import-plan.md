# V2 — plan de test de chargement (sans production)

Décisions validées par l'utilisateur le 20/11/2026 :
- Les **6 973 rattachements Seller** sont acceptés, y compris les 354 écarts de libellés. Ne pas les renvoyer en validation manuelle.
- Les offres concernent seulement **eBuyClub, iGraal, Poulpeo et Widilo**.
- **Joko** peut figurer dans CashbackerV2, mais **aucune offre Joko** ne doit être créée tant qu'un export fiable n'est pas disponible.
- L'approbation des rattachements marchands ne constitue pas une vérification de la fraîcheur des taux ni de l'URL d'affiliation.

## Étapes avant import
1. Disposer d'une copie isolée de MySQL (pas de connexion production) et vérifier le schéma Prisma et les migrations sur cette copie. La migration V2 n'a pas été exécutée.
2. Exécuter `docs/sql-drafts/v2-initial-copy.sql` **une seule fois** sur V2 vide ; vérifier comptes et IDs.
3. Exporter depuis la copie `SellerV2(id)` et `CashbackerV2(id,name)` via `docs/sql-drafts/v2-readonly-preflight.sql`.
4. Rapprocher les 6 973 lignes avec ces exports. Les quatre plateformes doivent chacune correspondre à **un seul** cashbackerId réel. Joko n'entre pas dans les offres.
5. Distinguer les vérifications de clés étrangères/format (automatiques) et la fraîcheur des taux (non démontrée). Ne pas convertir automatiquement une validation de mapping en validation de taux.
6. Prévisualiser insertions, modifications et conflits, puis tester un chargement transactionnel sur la copie uniquement. Aucun import en production sans nouvel accord explicite.

## Risques à corriger avant une exécution réelle
- La migration V2 est un brouillon SQL écrit manuellement et n'a pas encore été comparée à une migration générée par Prisma.
- Le script de copie V1→V2 doit être exécuté seulement si toutes les tables V2 sont vides. Il n'est pas idempotent.
- Un lien marchand source peut être un site marchand et non une URL d'affiliation ; ne pas le traiter comme une redirection validée.
- La table d'offres impose l'unicité `(sellerId,cashbackerId,type)`; les taux 0 ne doivent pas être supprimés.
- Ne jamais désactiver les offres absentes d'un export partiel.
- Le validateur existant marque les lignes `NOT_BUSINESS_VERIFIED` en raison d'un statut de staging historique ; ce statut doit être **renommé** en vérification de fraîcheur des offres et non en doute sur le mapping validé.

## État
Préparation et documentation sur branche GitHub seulement. **Pas de base de test MySQL connectée ni d'import SQL exécuté**.

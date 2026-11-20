# Import CashbackOfferV2 — préparation et contrôles (20/11/2026)

## Données réellement inspectées
Source locale : `cashback_offers_corriges.csv` (séparateur point-virgule, 11 colonnes).
- 6 973 offres uniques par (seller_id, plateforme, type), couvrant 3 728 IDs marchands source.
- 6 518 WEB, 394 GIFT_CARD, 61 AUTOMATIC.
- eBuyClub 3 381 ; Poulpeo 1 517 ; iGraal 1 294 ; Widilo 781.
- 4 814 unités PERCENT ; 2 159 EURO ; 562 lignes « jusqu'à ».
- 1 686 offres avec taux 0, à conserver conformément aux règles métier.
- 4 623 URL non vides ; 6 031 descriptions non vides.
- Aucun doublon sur la clé source (seller_id, plateforme, type). Aucun taux négatif dans cette extraction.
- Les fichiers de préparation initiaux incluent aussi 880 non rapprochés, 3 050 taux invalides ou unités absentes et 1 225 lignes à rapprocher/conflits ; ces populations ne sont **pas** des offres V2 validées et ne doivent pas être chargées automatiquement.

## Fichier de staging préparé
`MeilleursCashback_V2_offres_staging_20261120.csv` est un export local de 6 973 lignes, **non importé**. Colonnes : sellerIdV2, cashbackerName, cashbackerIdV2, type, rate, unit, isRangeRate, description, url, isActive, lastCheckedAt, validationStatus, sourceMerchant, sourceFile, matchMethod.
- `cashbackerIdV2` est intentionnellement vide : le rapprochement avec les identifiants réels de CashbackerV2 reste à effectuer.
- `sellerIdV2` reprend l'ID Seller source, **sous réserve** de vérification après copie V1 → V2.
- `lastCheckedAt` reste vide : ne pas inventer une date de vérification.
- `validationStatus` vaut PENDING_PLATFORM_AND_SELLER_VERIFICATION.
- `isActive=true` est une hypothèse de staging pour les lignes source, pas une confirmation d'actualité des offres : à valider avant chargement.
- Le champ URL est repris tel quel depuis la source, **sans garantie** qu'il s'agisse d'un lien d'affiliation ou de redirection sortante correct.

## Conditions obligatoires avant upsert V2
1. Créer les tables V2 sur une base de test et copier V1 → V2 avec vérification d'intégrité des IDs.
2. Résoudre les noms de plateformes vers leurs IDs CashbackerV2 réels et vérifier les 6 973 clés étrangères SellerV2.
3. Confirmer le statut actif et les URL, ainsi que la fraîcheur des taux ; ne pas inventer lastCheckedAt.
4. Vérifier types, unités, bornes et règles d'agrégation ; prévisualiser créations / mises à jour / conflits.
5. Importer en transaction par lots avec journal, vérification d'unicité et possibilité de reprise ; ne pas désactiver les offres absentes sans politique explicite.
6. Tester les pages pilotes JouéClub, IKEA, Airbnb avant bascule.
7. Aucun import ni déploiement en production sans approbation explicite.

## Plateforme supplémentaire à intégrer : Joko (demande du 20/11/2026)
- Inclure **Joko** dans le référentiel `CashbackerV2` lors de la copie V1 → V2 ; si absent de V1, préparer sa création après vérification des champs obligatoires et de l'absence de doublon. Ne pas inventer son identifiant SQL.
- Inclure Joko dans le mapping des plateformes, les filtres de l'administration V2 et les prochains imports.
- L'extraction de 6 973 offres actuellement préparée ne comporte aucune ligne Joko : les offres Joko devront être ajoutées uniquement à partir d'un export vérifié. Ne pas fabriquer de taux.

## Contrôle préparatoire supplémentaire (20/11/2026)
- Un validateur CSV local, sans connexion à MySQL ni écriture SQL, a été préparé. Il prend en entrée le staging et deux exports **réels** de test `SellerV2(id)` et `CashbackerV2(id,name)`, puis sépare `ready.csv`, `blocked.csv` et `summary.txt`.
- Test de contrôle effectué avec des listes **fictives** de marchands et plateformes (y compris Joko) : 0 ligne prête, 6 973 bloquées pour `NOT_BUSINESS_VERIFIED`. Ces listes ne prouvent aucune correspondance avec la base réelle.
- Le passage au statut `VERIFIED` ne peut se faire qu'après validation métier effective des offres, des plateformes et de leur fraîcheur. Le validateur ne décide pas lui-même du statut.
- Pas d'upsert SQL à ce stade : il faut d'abord des exports d'IDs réels, puis un essai sur une base de test.

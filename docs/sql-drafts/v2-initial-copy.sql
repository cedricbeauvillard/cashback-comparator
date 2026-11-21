-- PREPARATION ONLY — do not run against production without approval and backup.
-- Initial one-time load into EMPTY V2 tables. Re-running is intentionally blocked
-- by primary keys. Run on a disposable clone first.
-- The source is a consistent V1 snapshot; do not use as a recurring sync.
-- Preflight (must all be zero):
SELECT (SELECT COUNT(*) FROM SellerV2) AS sellers_v2,
       (SELECT COUNT(*) FROM CashbackerV2) AS cashbackers_v2,
       (SELECT COUNT(*) FROM CategoryV2) AS categories_v2,
       (SELECT COUNT(*) FROM CategoriesOnSellersV2) AS links_v2,
       (SELECT COUNT(*) FROM CashbackOfferV2) AS offers_v2;

START TRANSACTION;
INSERT INTO SellerV2 (id, name, logoUrl, slug, top40, topSeller, coupon, websiteDomain, isActive, description, redirectSellerId)
SELECT id, name, logoUrl, slug, top40, topSeller, coupon, NULL, TRUE, NULL, NULL FROM Seller;

INSERT INTO CashbackerV2 (id, name, logoUrl, score, `rank`, signupBonus, paymentThreshold, paymentMethod, sponsorshipUrl, reviewsUrl, isActive)
SELECT id, name, logoUrl, score, `rank`, signupBonus, paymentThreshold, paymentMethod, sponsorshipUrl, reviewsUrl, TRUE FROM Cashbacker;

INSERT INTO CategoryV2 (id, name, parentId)
SELECT id, name, NULL FROM Category;

INSERT INTO CategoriesOnSellersV2 (sellerId, categoryId, isPrimary)
SELECT sellerId, categoryId, FALSE FROM CategoriesOnSellers;
COMMIT;

-- Check copied row counts and integrity:
SELECT 'Seller' AS entity, (SELECT COUNT(*) FROM Seller) AS v1_count, (SELECT COUNT(*) FROM SellerV2) AS v2_count
UNION ALL SELECT 'Cashbacker', (SELECT COUNT(*) FROM Cashbacker), (SELECT COUNT(*) FROM CashbackerV2)
UNION ALL SELECT 'Category', (SELECT COUNT(*) FROM Category), (SELECT COUNT(*) FROM CategoryV2)
UNION ALL SELECT 'CategoriesOnSellers', (SELECT COUNT(*) FROM CategoriesOnSellers), (SELECT COUNT(*) FROM CategoriesOnSellersV2);

-- Reconcile actual IDs, names, slugs, flags, and categories using a detailed export.
-- Offers intentionally NOT populated: V1 rate columns cannot reliably distinguish
-- WEB / GIFT_CARD / AUTOMATIC for every source without validated mapping.
-- After explicit validation, a separate upsert import will fill CashbackOfferV2.

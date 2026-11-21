-- READ-ONLY queries for a TEST CLONE after V2 schema and initial copy.
-- Run each SELECT separately and export the result as CSV.
-- No production writes; never run CREATE/INSERT here.

-- Export seller IDs for preflight (sellers_v2.csv):
SELECT id FROM SellerV2 ORDER BY id;

-- Export cashbacker IDs and names (cashbackers_v2.csv):
SELECT id, name FROM CashbackerV2 ORDER BY id;

-- Check whether Joko exists and identify its actual ID (no guessed IDs):
SELECT id, name, isActive FROM CashbackerV2
WHERE LOWER(TRIM(name)) = 'joko';

-- Detect duplicate platform names that would make name-based mapping ambiguous:
SELECT LOWER(TRIM(name)) AS normalizedName, COUNT(*) AS n
FROM CashbackerV2 GROUP BY LOWER(TRIM(name)) HAVING COUNT(*) > 1;

-- Check legacy ID preservation:
SELECT (SELECT COUNT(*) FROM Seller) AS sellersV1,
       (SELECT COUNT(*) FROM SellerV2) AS sellersV2,
       (SELECT COUNT(*) FROM Seller a LEFT JOIN SellerV2 b ON b.id=a.id WHERE b.id IS NULL) AS missingSellerIds,
       (SELECT COUNT(*) FROM Cashbacker a LEFT JOIN CashbackerV2 b ON b.id=a.id WHERE b.id IS NULL) AS missingCashbackerIds;

-- Verify no seller slugs changed (null-safe comparison):
SELECT COUNT(*) AS changedSlugs FROM Seller a
JOIN SellerV2 b ON b.id=a.id WHERE NOT (a.slug <=> b.slug);

-- Check source-category links copied:
SELECT COUNT(*) AS missingCategoryLinks FROM CategoriesOnSellers a
LEFT JOIN CategoriesOnSellersV2 b ON b.sellerId=a.sellerId AND b.categoryId=a.categoryId
WHERE b.sellerId IS NULL;

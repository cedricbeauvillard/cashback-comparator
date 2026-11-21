-- TARGET DRAFT ONLY. Do not apply before inspecting live schema, backups and migration history.
-- Additive changes to existing tables; legacy Seller rate columns are retained.
ALTER TABLE `Seller`
  ADD COLUMN `websiteDomain` VARCHAR(255) NULL,
  ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN `description` TEXT NULL,
  ADD COLUMN `redirectSellerId` INTEGER NULL;

ALTER TABLE `Cashbacker`
  ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE `Category`
  ADD COLUMN `parentId` INTEGER NULL;

ALTER TABLE `CategoriesOnSellers`
  ADD COLUMN `isPrimary` BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX `Seller_redirectSellerId_idx` ON `Seller`(`redirectSellerId`);
CREATE INDEX `Category_parentId_idx` ON `Category`(`parentId`);

ALTER TABLE `Seller`
  ADD CONSTRAINT `Seller_redirectSellerId_fkey`
  FOREIGN KEY (`redirectSellerId`) REFERENCES `Seller`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Category`
  ADD CONSTRAINT `Category_parentId_fkey`
  FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

-- At most one primary category per Seller is a required application-level
-- transactional invariant; this SQL alone does not enforce it.

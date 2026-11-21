-- V2-only migration. No legacy table is altered.
-- Not applied to any database. Validate against a disposable MySQL clone first.
CREATE TABLE `SellerV2` (
 `id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL,
 `logoUrl` TEXT NULL, `slug` TEXT NULL,
 `top40` BOOLEAN NULL DEFAULT false, `topSeller` BOOLEAN NULL DEFAULT false,
 `coupon` BOOLEAN NULL DEFAULT false, `websiteDomain` VARCHAR(255) NULL,
 `isActive` BOOLEAN NOT NULL DEFAULT true, `description` TEXT NULL,
 `redirectSellerId` INTEGER NULL,
 INDEX `SellerV2_redirectSellerId_idx`(`redirectSellerId`), PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `CashbackerV2` (
 `id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL,
 `logoUrl` TEXT NOT NULL, `score` INTEGER NOT NULL DEFAULT 0,
 `rank` INTEGER NOT NULL DEFAULT 0, `signupBonus` INTEGER NOT NULL DEFAULT 0,
 `paymentThreshold` DOUBLE NOT NULL DEFAULT 0,
 `paymentMethod` VARCHAR(255) NOT NULL DEFAULT 'virement bancaire',
 `sponsorshipUrl` TEXT NOT NULL, `reviewsUrl` TEXT NOT NULL,
 `isActive` BOOLEAN NOT NULL DEFAULT true, PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `CategoryV2` (
 `id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL,
 `parentId` INTEGER NULL,
 INDEX `CategoryV2_parentId_idx`(`parentId`), PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `CategoriesOnSellersV2` (
 `sellerId` INTEGER NOT NULL, `categoryId` INTEGER NOT NULL,
 `isPrimary` BOOLEAN NOT NULL DEFAULT false,
 PRIMARY KEY (`sellerId`,`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `CashbackOfferV2` (
 `id` INTEGER NOT NULL AUTO_INCREMENT, `sellerId` INTEGER NOT NULL,
 `cashbackerId` INTEGER NOT NULL,
 `type` ENUM('WEB','GIFT_CARD','AUTOMATIC') NOT NULL,
 `rate` DOUBLE NOT NULL, `unit` ENUM('EURO','PERCENT','NONE') NOT NULL,
 `isRangeRate` BOOLEAN NOT NULL DEFAULT false,
 `description` TEXT NULL, `url` VARCHAR(2048) NULL,
 `isActive` BOOLEAN NOT NULL DEFAULT true,
 `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 `updatedAt` DATETIME(3) NOT NULL,
 `lastCheckedAt` DATETIME(3) NULL,
 UNIQUE INDEX `CashbackOfferV2_sellerId_cashbackerId_type_key`(`sellerId`,`cashbackerId`,`type`),
 INDEX `CashbackOfferV2_sellerId_type_isActive_idx`(`sellerId`,`type`,`isActive`),
 INDEX `CashbackOfferV2_cashbackerId_type_idx`(`cashbackerId`,`type`),
 PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `SellerV2` ADD CONSTRAINT `SellerV2_redirectSellerId_fkey` FOREIGN KEY (`redirectSellerId`) REFERENCES `SellerV2`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `CategoryV2` ADD CONSTRAINT `CategoryV2_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `CategoryV2`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `CategoriesOnSellersV2` ADD CONSTRAINT `CategoriesOnSellersV2_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `SellerV2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `CategoriesOnSellersV2` ADD CONSTRAINT `CategoriesOnSellersV2_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryV2`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `CashbackOfferV2` ADD CONSTRAINT `CashbackOfferV2_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `SellerV2`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `CashbackOfferV2` ADD CONSTRAINT `CashbackOfferV2_cashbackerId_fkey` FOREIGN KEY (`cashbackerId`) REFERENCES `CashbackerV2`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

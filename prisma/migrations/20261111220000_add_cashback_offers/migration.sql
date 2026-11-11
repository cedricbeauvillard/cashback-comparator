-- Additive migration: does not change Seller, Cashbacker or existing offers.
-- Apply only after checking the latest backup and current schema.
CREATE TABLE `CashbackOffer` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `sellerId` INTEGER NOT NULL,
  `cashbackerId` INTEGER NOT NULL,
  `type` ENUM('WEB', 'GIFT_CARD', 'AUTOMATIC') NOT NULL,
  `rate` DOUBLE NOT NULL,
  `unit` ENUM('EURO', 'PERCENT', 'NONE') NOT NULL,
  `isRangeRate` BOOLEAN NOT NULL DEFAULT false,
  `description` TEXT NULL,
  `url` VARCHAR(2048) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  INDEX `CashbackOffer_sellerId_type_isActive_idx`(`sellerId`, `type`, `isActive`),
  INDEX `CashbackOffer_cashbackerId_type_idx`(`cashbackerId`, `type`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `CashbackOffer` ADD CONSTRAINT `CashbackOffer_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `CashbackOffer` ADD CONSTRAINT `CashbackOffer_cashbackerId_fkey` FOREIGN KEY (`cashbackerId`) REFERENCES `Cashbacker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

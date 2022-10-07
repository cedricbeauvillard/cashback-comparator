-- CreateTable
CREATE TABLE `Cashbacker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `logoUrl` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `rank` INTEGER NOT NULL DEFAULT 0,
    `signupBonus` INTEGER NOT NULL DEFAULT 0,
    `paymentThreshold` DOUBLE NULL DEFAULT 0,
    `sponsorshipUrl` VARCHAR(191) NOT NULL,
    `reviewsUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cashbacker_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Category_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seller` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `logoUrl` VARCHAR(191) NULL,
    `top40` BOOLEAN NULL DEFAULT false,
    `topSeller` BOOLEAN NULL DEFAULT false,
    `coupon` BOOLEAN NULL DEFAULT false,
    `isRangeRateIgraal` BOOLEAN NULL DEFAULT false,
    `rateIgraal` DOUBLE NULL DEFAULT 0,
    `unitRateIgraal` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRatePoulpeo` BOOLEAN NULL DEFAULT false,
    `ratePoulpeo` DOUBLE NULL DEFAULT 0,
    `unitRatePoulpeo` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateFunC` BOOLEAN NULL DEFAULT false,
    `rateFunC` DOUBLE NULL DEFAULT 0,
    `unitRateFunC` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateAuBonProfit` BOOLEAN NULL DEFAULT false,
    `rateAuBonProfit` DOUBLE NULL DEFAULT 0,
    `unitRateAuBonProfit` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateFlouzy` BOOLEAN NULL DEFAULT false,
    `rateFlouzy` DOUBLE NULL DEFAULT 0,
    `unitRateFlouzy` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateCapitalKoala` BOOLEAN NULL DEFAULT false,
    `rateCapitalKoala` DOUBLE NULL DEFAULT 0,
    `unitRateCapitalKoala` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateEbuyclub` BOOLEAN NULL DEFAULT false,
    `rateEbuyclub` DOUBLE NULL DEFAULT 0,
    `unitRateEbuyclub` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateWidilo` BOOLEAN NULL DEFAULT false,
    `rateWidilo` DOUBLE NULL DEFAULT 0,
    `unitRateWidilo` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateJoko` BOOLEAN NULL DEFAULT false,
    `rateJoko` DOUBLE NULL DEFAULT 0,
    `unitRateJoko` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateBoursorama` BOOLEAN NULL DEFAULT false,
    `rateBoursorama` DOUBLE NULL DEFAULT 0,
    `unitRateBoursorama` ENUM('EURO', 'PERCENT', 'NONE') NULL,
    `isRangeRateEbuyclubCoupon` BOOLEAN NULL DEFAULT false,
    `rateEbuyclubCoupon` DOUBLE NULL DEFAULT 0,
    `unitRateEbuyclubCoupon` ENUM('EURO', 'PERCENT', 'NONE') NULL,

    UNIQUE INDEX `Seller_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriesOnSellers` (
    `sellerId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`sellerId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriesOnSellers` ADD CONSTRAINT `CategoriesOnSellers_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnSellers` ADD CONSTRAINT `CategoriesOnSellers_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

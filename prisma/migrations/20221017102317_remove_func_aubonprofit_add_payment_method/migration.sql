/*
  Warnings:

  - You are about to drop the column `isRangeRateAuBonProfit` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `isRangeRateFunC` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `rateAuBonProfit` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `rateFunC` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `unitRateAuBonProfit` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `unitRateFunC` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Cashbacker` ADD COLUMN `paymentMethod` VARCHAR(255) NOT NULL DEFAULT 'virement bancaire';

-- AlterTable
ALTER TABLE `Seller` DROP COLUMN `isRangeRateAuBonProfit`,
    DROP COLUMN `isRangeRateFunC`,
    DROP COLUMN `rateAuBonProfit`,
    DROP COLUMN `rateFunC`,
    DROP COLUMN `unitRateAuBonProfit`,
    DROP COLUMN `unitRateFunC`;

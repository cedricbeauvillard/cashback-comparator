/*
  Warnings:

  - Made the column `paymentThreshold` on table `Cashbacker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Cashbacker` MODIFY `paymentThreshold` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Seller` ADD COLUMN `slug` VARCHAR(191) NULL;

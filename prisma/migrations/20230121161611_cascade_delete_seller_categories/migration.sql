-- DropForeignKey
ALTER TABLE `CategoriesOnSellers` DROP FOREIGN KEY `CategoriesOnSellers_sellerId_fkey`;

-- AddForeignKey
ALTER TABLE `CategoriesOnSellers` ADD CONSTRAINT `CategoriesOnSellers_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

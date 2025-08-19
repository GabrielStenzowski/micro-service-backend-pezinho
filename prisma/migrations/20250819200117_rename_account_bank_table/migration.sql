/*
  Warnings:

  - You are about to drop the `user_banking_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_banking_account` DROP FOREIGN KEY `user_banking_account_type_account_fkey`;

-- DropForeignKey
ALTER TABLE `user_banking_account` DROP FOREIGN KEY `user_banking_account_user_id_fkey`;

-- DropIndex
DROP INDEX `Transaction_account_id_fkey` ON `Transaction`;

-- DropTable
DROP TABLE `user_banking_account`;

-- CreateTable
CREATE TABLE `bank_account` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name_account` VARCHAR(191) NOT NULL,
    `type_account` VARCHAR(191) NOT NULL,
    `bank_balance` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_type_account_fkey` FOREIGN KEY (`type_account`) REFERENCES `type_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `bank_account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

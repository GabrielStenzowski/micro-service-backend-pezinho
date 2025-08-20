/*
  Warnings:

  - You are about to alter the column `limit_amount` on the `card` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `current_balance` on the `card` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `target_amount` on the `financial_goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `current_amount` on the `financial_goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `card` ADD COLUMN `account_id` VARCHAR(191) NULL,
    MODIFY `limit_amount` DECIMAL(15, 2) NULL,
    MODIFY `current_balance` DECIMAL(15, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `financial_goal` MODIFY `target_amount` DECIMAL(15, 2) NOT NULL,
    MODIFY `current_amount` DECIMAL(15, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `transaction` MODIFY `amount` DECIMAL(15, 2) NOT NULL;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `bank_account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `bank_balance` on the `bank_account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `bank_account` MODIFY `bank_balance` DECIMAL(15, 2) NOT NULL;

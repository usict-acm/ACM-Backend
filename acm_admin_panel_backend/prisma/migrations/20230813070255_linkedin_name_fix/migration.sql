/*
  Warnings:

  - You are about to drop the column `linkendin` on the `office_bearer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `office_bearer` DROP COLUMN `linkendin`,
    ADD COLUMN `linkedin` TEXT NULL;

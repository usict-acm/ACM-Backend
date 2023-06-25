/*
  Warnings:

  - You are about to drop the column `active` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `added_on` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `membershipNo` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `team` DROP COLUMN `active`,
    DROP COLUMN `added_on`,
    DROP COLUMN `membershipNo`,
    ADD COLUMN `email` TEXT NOT NULL DEFAULT '';

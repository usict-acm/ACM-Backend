/*
  Warnings:

  - You are about to alter the column `project1Image` on the `team` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.
  - You are about to alter the column `project2Image` on the `team` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.
  - You are about to alter the column `project3Image` on the `team` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `team` MODIFY `project1Image` LONGTEXT NULL,
    MODIFY `project2Image` LONGTEXT NULL,
    MODIFY `project3Image` LONGTEXT NULL;

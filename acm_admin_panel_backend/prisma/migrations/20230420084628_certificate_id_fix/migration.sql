/*
  Warnings:

  - The primary key for the `certificate` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `certificate` DROP PRIMARY KEY,
    MODIFY `ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID`);

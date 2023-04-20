-- AlterTable
ALTER TABLE `team` ADD COLUMN `dob` DATE NULL,
    ADD COLUMN `membershipNo` TEXT NOT NULL DEFAULT '12345',
    ADD COLUMN `techStack` TEXT NULL;

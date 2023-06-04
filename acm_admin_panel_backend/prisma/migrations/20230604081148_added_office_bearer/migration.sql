-- CreateTable
CREATE TABLE `office_bearer` (
    `id` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `designation` TEXT NOT NULL,
    `linkendin` TEXT NULL,
    `category` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

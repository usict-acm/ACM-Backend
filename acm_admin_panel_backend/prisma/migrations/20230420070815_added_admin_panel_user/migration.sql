-- CreateTable
CREATE TABLE `AdminPanelUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` TEXT NOT NULL,
    `password` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

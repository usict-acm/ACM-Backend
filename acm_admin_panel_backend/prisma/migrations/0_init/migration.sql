-- CreateTable
CREATE TABLE `blog` (
    `Sno` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(200) NOT NULL,
    `Author` VARCHAR(50) NOT NULL,
    `Content` MEDIUMTEXT NOT NULL,
    `Category` VARCHAR(50) NOT NULL,
    `Event` VARCHAR(100) NULL,
    `Image` TEXT NOT NULL,
    `Date` DATE NOT NULL,

    PRIMARY KEY (`Sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `blogId` INTEGER NOT NULL AUTO_INCREMENT,
    `blogTitle` VARCHAR(256) NOT NULL,
    `coverImage` LONGBLOB NOT NULL,
    `userEmail` VARCHAR(256) NOT NULL,
    `userName` VARCHAR(128) NOT NULL,
    `content` LONGBLOB NOT NULL,
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `published` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lastUpdated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isDraft` BOOLEAN NOT NULL,
    `tags` TEXT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`blogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificate` (
    `ID` INTEGER NOT NULL,
    `uniqueNo` VARCHAR(20) NOT NULL,
    `nameParticipant` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `course` VARCHAR(50) NOT NULL,
    `enrollment_no` VARCHAR(50) NOT NULL,
    `event` VARCHAR(50) NOT NULL,
    `rank` VARCHAR(11) NULL,
    `college` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`ID`, `uniqueNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactus` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `mobile` VARCHAR(100) NULL,
    `college` VARCHAR(200) NULL,
    `message` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dashboardusers` (
    `usertype` VARCHAR(50) NULL,
    `userid` INTEGER NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` CHAR(128) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `profilephoto` MEDIUMBLOB NULL,
    `acmmemberid` VARCHAR(128) NULL,
    `branch` VARCHAR(128) NOT NULL,
    `course` VARCHAR(128) NOT NULL,
    `rollno` VARCHAR(128) NOT NULL,
    `college` VARCHAR(128) NOT NULL,
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lastupdated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `sno` INTEGER NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(10000) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `button1Text` VARCHAR(255) NOT NULL,
    `button1Link` VARCHAR(255) NOT NULL,
    `button2Text` VARCHAR(200) NOT NULL,
    `button2Link` VARCHAR(200) NOT NULL,
    `partners` VARCHAR(200) NOT NULL,
    `speakers` VARCHAR(200) NOT NULL,
    `poster` TEXT NOT NULL,
    `year` INTEGER NOT NULL,
    `time` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventpage` (
    `sno` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `numberOfEvents` VARCHAR(200) NOT NULL,
    `heading` VARCHAR(200) NOT NULL,
    `more` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `sno`(`sno`),
    PRIMARY KEY (`sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fields` (
    `id` INTEGER NOT NULL,
    `formID` TEXT NOT NULL,
    `formName` VARCHAR(255) NOT NULL,
    `fieldName` VARCHAR(255) NOT NULL,
    `fieldType` VARCHAR(255) NOT NULL,
    `ifCheckbox` TEXT NOT NULL,
    `ifRadio` TEXT NOT NULL,
    `required` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL,
    `formID` TEXT NOT NULL,
    `formName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gallery` (
    `Sno` INTEGER NOT NULL,
    `source` TEXT NOT NULL,
    `date` DATE NOT NULL,

    PRIMARY KEY (`Sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invite` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(1000) NOT NULL,
    `email` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `join_us` (
    `id` INTEGER NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `year` INTEGER NOT NULL,
    `acm_no` VARCHAR(20) NOT NULL,
    `course` VARCHAR(50) NOT NULL,
    `club` TEXT NOT NULL,
    `enrollment_no` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `link` (
    `id` INTEGER NOT NULL,
    `linkFor` VARCHAR(500) NOT NULL,
    `originalLink` VARCHAR(1000) NOT NULL,
    `code` VARCHAR(500) NOT NULL,
    `count` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` TEXT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `designation` VARCHAR(50) NOT NULL,
    `linkedin` TEXT NULL,
    `github` TEXT NULL,
    `instagram` TEXT NULL,
    `year` YEAR NOT NULL,
    `category` VARCHAR(20) NOT NULL,
    `added_on` DATE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `user_posts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `author` INT,
    `text` TEXT,
    `media` VARCHAR(255),
    `publish_datetime` DATETIME,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE `post_comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `target` INT,
    `author` INT,
    `publish_datetime` DATETIME,
    `text` TEXT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE `post_likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `target` INT,
    `author` INT,
    `publish_datetime` DATETIME,
    `status` BOOLEAN,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE `locations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    `region` VARCHAR(100),
    `latitude` DOUBLE(8, 6),
    `longitude` DOUBLE(8, 6),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
ALTER TABLE `user_profiles` ADD FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE SET NULL;
ALTER TABLE `user_posts` ADD FOREIGN KEY (`author`) REFERENCES `user_profiles`(`id`) ON DELETE SET NULL;
ALTER TABLE `post_comments` ADD FOREIGN KEY (`author`) REFERENCES `user_profiles`(`id`) ON DELETE SET NULL;
ALTER TABLE `post_comments` ADD FOREIGN KEY (`target`) REFERENCES `user_posts`(`id`) ON DELETE SET NULL;
ALTER TABLE `post_likes` ADD FOREIGN KEY (`target`) REFERENCES `user_posts`(`id`) ON DELETE SET NULL;
ALTER TABLE `post_likes` ADD FOREIGN KEY (`author`) REFERENCES `user_profiles`(`id`) ON DELETE SET NULL;
ALTER TABLE `quotes` ADD FOREIGN KEY (`author`) REFERENCES `user_profiles`(`id`) ON DELETE SET NULL;
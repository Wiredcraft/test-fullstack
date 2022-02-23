-- 
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id`                        INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login_id`                  VARCHAR(255)     NOT NULL UNIQUE,
  `password`                  VARCHAR(255)     NOT NULL,
  `auth_token`                TEXT             NULL,
  `name`                      VARCHAR(255)     NOT NULL,
  `avatar_url`                TEXT             NULL,
  `created_at`                DATETIME         NOT NULL DEFAULT NOW(),
  `updated_at`                DATETIME         NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at`                DATETIME         NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX(`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

DROP TABLE IF EXISTS `lighting_talks`;
CREATE TABLE IF NOT EXISTS `lighting_talks` (
  `id`                        INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`topic`                     VARCHAR(255)     NOT NULL,
	`content`                   TEXT             NOT NULL,
	`rating`                    SMALLINT         NOT NULL DEFAULT 0,
	`poster_id`                 INT              NOT NULL,
  `created_at`                DATETIME         NOT NULL DEFAULT NOW(),
  `updated_at`                DATETIME         NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at`                DATETIME         NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

DROP TABLE IF EXISTS `user_votes`;
CREATE TABLE IF NOT EXISTS `user_votes` (
  `id`                        INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`lighting_talk_id`          INT(10) UNSIGNED NOT NULL,
	`user_id`                   INT(10) UNSIGNED NOT NULL,
  `created_at`                DATETIME         NOT NULL DEFAULT NOW(),
  `updated_at`                DATETIME         NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at`                DATETIME         NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
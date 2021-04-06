#-----------------------------------------------------------------------------------------
# Notice：DB CHARSET should be UTF8MB4 (utf8mb4_general_ci)
#-----------------------------------------------------------------------------------------

CREATE TABLE `user` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`username` varchar(32) UNIQUE,
	`password_hash` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1000001;

CREATE TABLE `talk` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(128) NOT NULL,
	`description` longtext NOT NULL,
	`user_id` int unsigned NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`vote_count` int unsigned NOT NULL DEFAULT 0,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;

CREATE TABLE `vote_record` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`talk_id` int unsigned NOT NULL,
	`user_id` int unsigned NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;

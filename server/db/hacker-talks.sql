-- -------------------------------------------------------------
-- TablePlus 3.11.0(352)
--
-- https://tableplus.com/
--
-- Database: hacker-talks
-- Generation Time: 2020-11-20 00:25:27.5030
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `talks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `description` text NOT NULL,
  `votes` bigint unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `talks_votes` (
  `talk_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  UNIQUE KEY `unique_index_talk_user` (`talk_id`,`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `password` varchar(72) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `talks` (`id`, `title`, `author_id`, `description`, `votes`, `created_at`, `updated_at`) VALUES
('1', 'abc', '5', 'hahahh', '5', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('2', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('3', 'abc', '5', 'hahahh', '7', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('4', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('5', 'abc', '5', 'hahahh', '9', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('6', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('7', 'abc', '5', 'hahahh', '11', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('8', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('9', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('10', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('11', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('12', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('13', 'abc', '5', 'hahahh', '13', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('14', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('15', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('16', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('17', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('18', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('19', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('20', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('21', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('22', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('23', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('24', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('25', 'abc', '5', 'hahahh', '14', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('26', 'def', '6', '12344541234', '15', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('27', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('28', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('29', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('30', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('31', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('32', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('33', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('34', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('35', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('36', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('37', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('38', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('39', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('40', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('41', 'abc', '5', 'hahahh', '4', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('42', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('43', 'abc', '5', 'hahahh', '12', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('44', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('45', 'abc', '5', 'hahahh', '10', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('46', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('47', 'abc', '5', 'hahahh', '8', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('48', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40'),
('49', 'abc', '5', 'hahahh', '6', '2020-11-16 15:11:21', '2020-11-16 15:11:21'),
('50', 'def', '6', '12344541234', '0', '2020-11-16 16:42:40', '2020-11-16 16:42:40');

INSERT INTO `talks_votes` (`talk_id`, `user_id`) VALUES
('1', '5'),
('1', '6'),
('1', '8'),
('1', '9'),
('1', '12'),
('3', '12'),
('5', '12'),
('7', '12'),
('13', '12'),
('25', '13'),
('26', '13'),
('43', '12'),
('45', '12'),
('47', '12'),
('49', '12');

INSERT INTO `users` (`id`, `name`, `password`, `created_at`, `updated_at`) VALUES
('4', 'xpol', '$2b$10$t2Z7mlyBs/t0emxDZdrFuO/vW2hp2BUF4FJtA4n.EyturnBW.Yv86', '2020-11-15 22:56:25', '2020-11-15 22:56:25'),
('5', 'xpol', '$2b$10$/B86KKqTBb.ui2GsDVNUjeX8.tVjhEjNMcsMw1U2PDGLyy3wS36oq', '2020-11-15 22:57:38', '2020-11-15 22:57:38'),
('6', 'xpol', '$2b$10$fH0zMlIcvBrBXr3Q43SPVuqa5QuZS.JJDXXh5MGgc/iv3P8T8iMGi', '2020-11-15 22:58:27', '2020-11-15 22:58:27'),
('7', 'wan', '$2b$10$VazHOWkE6RI/DX1DrszA0.oW.a2BxjWJ.58yzHULKaAF6Pj9ZRGQS', '2020-11-16 15:14:12', '2020-11-16 15:14:12'),
('8', 'wan', '$2b$10$fd3Mp9GFYIYxchmG2E6VvufNmlFu1c4yDH/D0o8LeSvPOyKvZhK5e', '2020-11-16 15:54:08', '2020-11-16 15:54:08'),
('9', 'hah', '$2b$10$APDIY1wolZJ7LXPjf5XkSe8i.tKoqGQkkVAZBbB5M/fhO17dmB5Wm', '2020-11-16 16:41:45', '2020-11-16 16:41:45'),
('10', 'alice', '$2b$10$CjMghXNrQostrm6N88CEC.AFp7NZtvtVyIyN4fiBMIhu7Xcpa.HDC', '2020-11-19 16:42:02', '2020-11-19 16:42:02'),
('11', 'abc', '$2b$10$YlcSU76dioQgcyScncAnruu5mmlC47cJicOmrZpgTjI7.5dFeOEUO', '2020-11-19 21:36:57', '2020-11-19 21:36:57'),
('12', 'xpolife', '$2b$10$bceepbmcnCS2khzl0VHVv.Oj1cUlhbwRGBIMrepyv2M/8bcia48Li', '2020-11-19 21:42:32', '2020-11-19 21:42:32'),
('13', 'www', '$2b$10$qUDuH2qP2bCn.ES788OjFORnpa0ysnNNccseIaooUfmyRP29LbXuS', '2020-11-19 23:40:59', '2020-11-19 23:40:59');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
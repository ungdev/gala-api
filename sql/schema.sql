SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Start` text NOT NULL,
  `End` text NOT NULL,
  `Room` text NOT NULL,
  `Img` text NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;--


ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

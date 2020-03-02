-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2020 at 09:33 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_products`
--

CREATE TABLE `t_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `category` varchar(10) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `t_products`
--

INSERT INTO `t_products` (`id`, `name`, `description`, `price`, `category`) VALUES
(1, 'The Dark Side of the Moon', 'The Dark Side of the Moon is the eighth studio album by the English progressive rock band Pink Floyd, released in March 1973. It built on ideas explored in the band\'s earlier recordings and live shows, but lacks the extended instrumental excursions that characterised their work following the departure in 1968 of founder member, principal composer, and lyricist, Syd Barrett.', '9.99', 'CD'),
(2, 'Abbey Road - The Beatles', 'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969 in the United Kingdom and on 1 October 1969 in the United States. The recording sessions for the album were the last in which all four Beatles participated.', '12.99', 'CD'),
(3, 'Led Zeppelin IV - Led Zep', 'The untitled fourth studio album by the English rock band Led Zeppelin, commonly referred to as Led Zeppelin IV, was released on 8 November 1971 on Atlantic Records. Produced by guitarist Jimmy Page, it was recorded between December 1970 and March 1971 at several locations, most prominently the Victorian house Headley Grange.', '8.00', 'CD'),
(4, 'Nevermind - Nirvana', 'Nevermind is the second studio album by the American rock band Nirvana, released on September 24, 1991. Produced by Butch Vig, Nevermind was the group\'s first release on DGC Records. Frontman Kurt Cobain sought to make music outside the restrictive confines of the Seattle grunge scene, drawing influence from groups such as the Pixies and their use of \"loud/quiet\" dynamics.', '8.99', 'CD'),
(5, 'The Doors - The Doors', 'The Doors is the debut album by American rock band the Doors, recorded in August 1966 and released on January 4, 1967. It was originally released in different stereo and mono mixes, and features the breakthrough single \"Light My Fire\", extended with an instrumental section mostly omitted on the single release, and the lengthy song \"The End\" with its Oedipal spoken word section.', '13.00', 'CD'),
(6, 'A Night at the Opera - Queen', 'A Night at the Opera is the fourth studio album by the British rock band Queen, released in November 1975. Co-produced by Roy Thomas Baker and Queen, it was the most expensive album ever recorded at the time of its release. A commercial success, A Night at the Opera has been voted by the public and cited by music publications as one of Queen\'s finest works. ', '5.99', 'CD'),
(7, 'In Search of Lost Time - Marcel Proust', 'Swann\'s Way, the first part of A la recherche de temps perdu, Marcel Proust\'s seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work.', '5.99', 'BOOK'),
(8, 'Ulysses - James Joyce', 'Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.', '7.95', 'BOOK'),
(9, 'Don Quixote - Miguel de Cervantes', 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper.', '19.99', 'BOOK'),
(10, 'The Great Gatsby - F. Scott Fitzgerald', 'The novel chronicles an era that Fitzgerald himself dubbed the \"Jazz Age\".', '15.00', 'BOOK'),
(11, 'Breath of the Wild - Nintendo', 'The Legend of Zelda: Breath of the Wild[a] is an action-adventure game developed and published by Nintendo, released for the Nintendo Switch and Wii U consoles on March 3, 2017.', '49.99', 'GAME'),
(12, 'Fire Emblem: Three Houses', 'Fire Emblem: Three Houses[a] is a tactical role-playing game, developed by Intelligent Systems and Koei Tecmo for the Nintendo Switch, and published worldwide by Nintendo on July 26, 2019.', '59.99', 'GAME');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_products`
--
ALTER TABLE `t_products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_products`
--
ALTER TABLE `t_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

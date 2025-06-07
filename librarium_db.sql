-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2025 at 10:51 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `librarium_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id_author` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id_author`, `name`, `state`) VALUES
(2, 'Gabriel García Márquez', 1),
(3, 'Isabel Allende', 0),
(4, 'Mario Vargas Llosa', 1),
(5, 'Julio Cortázar', 1),
(6, 'Jorge Luis Borges', 0),
(7, 'Laura Esquivel', 1),
(8, 'Carlos Fuentes', 1),
(9, 'Juan Rulfo', 0),
(10, 'Rosario Castellanos', 1),
(11, 'Pablo Neruda', 1),
(12, 'Octavio Paz', 0),
(13, 'Claribel Alegría', 1),
(14, 'Eduardo Galeano', 0),
(15, 'Manuel Puig', 1),
(16, 'Alfonsina Storni', 1),
(17, 'Horacio Quiroga', 0),
(18, 'Ricardo Piglia', 1),
(19, 'Roberto Bolaño', 1),
(20, 'César Vallejo', 0),
(21, 'Ana María Matute', 1),
(22, 'Miguel Delibes', 0),
(23, 'Juan José Millás', 1),
(24, 'Rosa Montero', 1),
(25, 'Javier Marías', 0),
(26, 'Almudena Grandes', 1),
(27, 'Enrique Vila-Matas', 1),
(28, 'Antonio Muñoz Molina', 0),
(29, 'Elena Poniatowska', 1),
(30, 'Sergio Ramírez', 0),
(31, 'Homero Aridjis', 1),
(32, 'Cristina Peri Rossi', 1),
(33, 'Silvina Ocampo', 0),
(34, 'Guadalupe Nettel', 1),
(35, 'Samanta Schweblin', 0),
(36, 'Mariana Enríquez', 1),
(37, 'Juan Gabriel Vásquez', 1);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id_book` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_author` int DEFAULT NULL,
  `isbn` varchar(20) NOT NULL,
  `year_published` year DEFAULT NULL,
  `num_pages` int DEFAULT NULL,
  `id_category` int DEFAULT NULL,
  `id_publisher` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `state` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id_book`, `name`, `id_author`, `isbn`, `year_published`, `num_pages`, `id_category`, `id_publisher`, `created_at`, `updated_at`, `state`) VALUES
(1, 'Cien años de soledad', 2, '9780307474728', '1967', 432, 1, 1, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(2, 'La casa de los espíritus', 3, '9788408172177', '1982', 496, 4, 2, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(3, 'La ciudad y los perros', 4, '9788439720211', '1963', 384, 1, 3, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(4, 'Rayuela', 5, '9788437604940', '1963', 736, 1, 4, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(5, 'Fervor de Buenos Aires', 6, '9789875666582', '1923', 120, 14, 5, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(6, 'Como agua para chocolate', 7, '9786073134914', '1989', 256, 6, 6, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(7, 'La muerte de Artemio Cruz', 8, '9789681602363', '1962', 352, 1, 7, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(8, 'Pedro Páramo', 9, '9786073134915', '1955', 144, 1, 8, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(9, 'Balún Canán', 10, '9789684113347', '1957', 320, 1, 9, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(10, 'Veinte poemas de amor y una canción desesperada', 11, '9788437604941', '1924', 64, 14, 10, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(11, 'El laberinto de la soledad', 12, '9789684113348', '1950', 256, 15, 11, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(12, 'Sobre héroes y tumbas', 13, '9789875666583', '1961', 480, 1, 12, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(13, 'Las venas abiertas de América Latina', 14, '9789684113349', '1971', 360, 10, 13, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(14, 'El beso de la mujer araña', 15, '9788437604942', '1976', 256, 30, 14, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(15, 'Mundo de siete pozos', 16, '9789875666584', '1934', 112, 14, 15, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(16, 'Cuentos de la selva', 17, '9789684113350', '1918', 160, 29, 16, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(17, 'La invasión', 18, '9789875666585', '1967', 192, 1, 17, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(18, 'Los detectives salvajes', 19, '9788437604943', '1998', 672, 1, 18, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(19, 'Trilce', 20, '9789684113351', '1922', 96, 14, 19, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1),
(20, 'Olvidado Rey Gudú', 21, '9788408172178', '1996', 800, 4, 20, '2025-06-06 20:55:05', '2025-06-06 20:55:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `state`) VALUES
(1, 'Ficción', 1),
(2, 'No Ficción', 1),
(3, 'Ciencia Ficción', 0),
(4, 'Fantasía', 1),
(5, 'Misterio', 1),
(6, 'Romance', 0),
(7, 'Terror', 1),
(8, 'Aventura', 1),
(9, 'Biografía', 0),
(10, 'Historia', 1),
(11, 'Cómic', 1),
(12, 'Juvenil', 1),
(13, 'Infantil', 0),
(14, 'Poesía', 1),
(15, 'Ensayo', 1),
(16, 'Autoayuda', 0),
(17, 'Crecimiento personal', 1),
(18, 'Cocina', 1),
(19, 'Viajes', 0),
(20, 'Arte', 1),
(21, 'Educación', 1),
(22, 'Tecnología', 0),
(23, 'Negocios', 1),
(24, 'Salud', 1),
(25, 'Deportes', 0),
(26, 'Política', 1),
(27, 'Filosofía', 1),
(28, 'Religión', 0),
(29, 'Cuento', 1),
(30, 'Drama', 1),
(31, 'Clásicos', 0),
(32, 'Prueba', 0);

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id_loan` int NOT NULL,
  `id_user` int NOT NULL,
  `id_book` int NOT NULL,
  `loan_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('activo','devuelto','vencido') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id_publisher` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id_publisher`, `name`, `state`) VALUES
(1, 'Buscalibre', 1),
(2, 'Planeta', 1),
(3, 'Alfaguara', 1),
(4, 'Anagrama', 1),
(5, 'Tusquets', 1),
(6, 'Siruela', 1),
(7, 'Salamandra', 1),
(8, 'SM', 1),
(9, 'Edebé', 1),
(10, 'Ediciones B', 1),
(11, 'RBA', 1),
(12, 'Destino', 1),
(13, 'Seix Barral', 1),
(14, 'Alianza Editorial', 1),
(15, 'Espasa', 1),
(16, 'Ariel', 1),
(17, 'Paidós', 1),
(18, 'Crítica', 1),
(19, 'Debate', 1),
(20, 'Taurus', 1),
(21, 'Lumen', 1),
(22, 'Austral', 1),
(23, 'Acantilado', 1),
(24, 'Maeva', 1),
(25, 'Edhasa', 1),
(26, 'Minotauro', 1),
(27, 'Suma de Letras', 1),
(28, 'Grijalbo', 1),
(29, 'Aguilar', 0),
(30, 'Plaza & Janés', 0),
(31, 'Bruguera', 0),
(32, 'Molino', 0),
(33, 'Sirio', 0),
(34, 'Nordica Libros', 0),
(35, 'Impedimenta', 0),
(36, 'Libros del Asteroide', 0),
(37, 'Valdemar', 0),
(38, 'Versátil', 0),
(39, 'Kalandraka', 0),
(40, 'La Galera', 0),
(41, 'Blackie Books', 0),
(42, 'Errata Naturae', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','bibliotecario','usuario') NOT NULL DEFAULT 'usuario',
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Administrador', 'admin@gmail.com', '$2b$10$cV/qLHwslP.GkFVvh7/5Fu94nkQ0DcB7oiEFPGZqsGd7tG0DTd/UG', 'admin', 1, '2025-06-04 13:13:00', '2025-06-04 13:13:00'),
(3, 'Cristian', 'cristian@gmail.com', '$2b$10$psReBMoXeqmcHe3q/HcW1OXskR3N5QusAAtXL0n5tG/Lv5OBXpB2S', 'usuario', 1, '2025-06-04 13:24:30', '2025-06-04 13:44:40'),
(4, 'David', 'david@gmail.com', '$2b$10$X5U.DPpVbSVPVe3Q0mRDGO1NeQdn.pr1J6zm5rtP6gNGzCn223pA6', 'bibliotecario', 1, '2025-06-04 13:51:10', '2025-06-06 20:28:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id_author`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id_book`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `id_author` (`id_author`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_publisher` (`id_publisher`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id_loan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_book` (`id_book`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id_publisher`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id_author` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id_book` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id_loan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id_publisher` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id_author`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`),
  ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`id_publisher`) REFERENCES `publishers` (`id_publisher`);

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id_book`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

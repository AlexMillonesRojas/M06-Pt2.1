-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-11-2022 a las 13:26:02
-- Versión del servidor: 8.0.31-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bank`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `DNI` varchar(9) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Amount` int NOT NULL,
  `Entry date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`DNI`, `Name`, `Amount`, `Entry date`) VALUES
('14259643B', 'Cliente uno', 5000, '2022-11-01'),
('37015644L', 'Cliente dos', 3724, '2022-11-02'),
('50677388Q', 'Cliente tres', 10000, '2022-11-03'),
('44573046N', 'Cliente cuatro', 10001, '2022-11-04'),
('00817642S', 'Cliente cinco', 100000, '2022-11-05'),
('90198339K', 'Cliente seis', 100001, '2022-11-06'),
('91944511X', 'Cliente siete', 1000000, '2022-11-07'),
('32199735B', 'Cliente ocho', 10, '2022-11-08'),
('75539523W', 'Cliente nueve', 0, '2022-11-09'),
('34988121S', 'Cliente diez', 999, '2022-11-10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

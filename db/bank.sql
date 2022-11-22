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
  `Account type` varchar(50) NOT NULL,
  `Amount` varchar(30) NOT NULL,
  `Client type` varchar(30) NOT NULL,
  `Entry date` varchar(30) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`DNI`, `Name`, `Account type`, `Amount`, `Client type`, `Entry date`) VALUES
('14259643B', 'Cliente uno', 'Fixed deposit account', '5000', 'Poor client', '01/11/2022'),
('37015644L', 'Cliente dos', 'Solidary account', '3724', 'Poor client', '02/11/2022'),
('50677388Q', 'Cliente tres', 'Personal account', '10000', 'Poor client', '03/11/2022'),
('44573046N', 'Cliente cuatro', 'Tax-Free Savings Account', '10001', 'Normal client', '04/11/2022'),
('00817642S', 'Cliente cinco', 'Savings account', '100000', 'Normal client', '05/11/2022'),
('90198339K', 'Cliente seis', 'Solidary account', '100001', 'Very rich client', '06/11/2022'),
('91944511X', 'Cliente siete', 'Savings account', '1000000', 'Very rich client', '07/11/2022'),
('32199735B', 'Cliente ocho', 'Tax-Free Savings Account', '10', 'Poor client', '08/11/2022'),
('75539523W', 'Cliente nueve', 'Personal account', '0', 'Poor client', '09/11/2022'),
('34988121S', 'Cliente diez', 'Tax-Free Savings Account', '999', 'Poor client', '10/11/2022');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
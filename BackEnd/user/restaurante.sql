-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 09/05/2025 às 22:38
-- Versão do servidor: 8.3.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `restaurante`
--
CREATE DATABASE IF NOT EXISTS `restaurante` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `restaurante`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `disp_mesas`
--

DROP TABLE IF EXISTS `disp_mesas`;
CREATE TABLE IF NOT EXISTS `disp_mesas` (
  `id_disp_mesa` bigint NOT NULL,
  `desc_disp_mesa` varchar(255) DEFAULT NULL,
  `num_mesa_disp` int NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_disp_mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `disp_mesas`
--

INSERT INTO `disp_mesas` (`id_disp_mesa`, `desc_disp_mesa`, `num_mesa_disp`, `descricao`) VALUES
(1, 'Disponivel', 1, NULL),
(2, 'Indisponivel', 2, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `disp_mesas_seq`
--

DROP TABLE IF EXISTS `disp_mesas_seq`;
CREATE TABLE IF NOT EXISTS `disp_mesas_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `disp_mesas_seq`
--

INSERT INTO `disp_mesas_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mesas`
--

DROP TABLE IF EXISTS `mesas`;
CREATE TABLE IF NOT EXISTS `mesas` (
  `id_mesa` bigint NOT NULL,
  `disp_mesa` int NOT NULL,
  `desc_mesa` varchar(255) DEFAULT NULL,
  `capacidade` int DEFAULT NULL,
  PRIMARY KEY (`id_mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `mesas`
--

INSERT INTO `mesas` (`id_mesa`, `disp_mesa`, `desc_mesa`, `capacidade`) VALUES
(252, 1, 'Mesa com 18 cadeiras', 18),
(253, 2, 'Mesa com 10 cadeiras', 10),
(254, 2, 'Mesa com 4 cadeiras', 4),
(402, 1, 'Mesa com 6 cadeiras', 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mesas_seq`
--

DROP TABLE IF EXISTS `mesas_seq`;
CREATE TABLE IF NOT EXISTS `mesas_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `mesas_seq`
--

INSERT INTO `mesas_seq` (`next_val`) VALUES
(501);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `data_hora_pedido` datetime DEFAULT NULL,
  `email_cliente` text,
  `hora_fim_ocupacao` datetime(6) DEFAULT NULL,
  `horadia_marcada` datetime(6) DEFAULT NULL,
  `horas_ocupacao` int DEFAULT NULL,
  `id_mesa` bigint DEFAULT NULL,
  `nome_cliente` text,
  `telefone_cliente` text,
  PRIMARY KEY (`id`),
  KEY `FK6lnywvattil83fkuh1f9v1cak` (`id_mesa`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `data_hora_pedido`, `email_cliente`, `hora_fim_ocupacao`, `horadia_marcada`, `horas_ocupacao`, `id_mesa`, `nome_cliente`, `telefone_cliente`) VALUES
(6, '2025-05-01 18:56:01', 'teste@gmail.com', '2025-04-30 22:30:00.000000', '2025-04-30 20:30:00.000000', 2, 253, 'Leonardo', '1999999999'),
(7, '2025-05-01 19:03:08', 'teste@gmail.com', '2025-04-30 22:30:00.000000', '2025-04-30 20:30:00.000000', 2, 253, 'Leonardo', '1999999999'),
(8, '2025-05-02 18:21:46', 'teste@gmail.com', '2025-05-31 00:30:00.000000', '2025-05-30 20:30:00.000000', 4, 254, 'Leonardo', '1999999999'),
(11, '2025-05-07 16:36:53', 'leonardoqillian@gmail.com', '2025-05-08 23:40:00.000000', '2025-05-08 20:40:00.000000', 3, 252, 'Leonardo', '199999999');

-- --------------------------------------------------------

--
-- Estrutura para tabela `status_mesa`
--

DROP TABLE IF EXISTS `status_mesa`;
CREATE TABLE IF NOT EXISTS `status_mesa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `status_mesa`
--

INSERT INTO `status_mesa` (`id`, `descricao`) VALUES
(1, 'Disponível'),
(2, 'Indisponível');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

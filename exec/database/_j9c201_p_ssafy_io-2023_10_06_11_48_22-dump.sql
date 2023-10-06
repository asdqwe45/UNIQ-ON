-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: j9c201.p.ssafy.io    Database: uniqon
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_wallets`
--

DROP TABLE IF EXISTS `admin_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_wallets` (
  `admin_address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`admin_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_wallets`
--

LOCK TABLES `admin_wallets` WRITE;
/*!40000 ALTER TABLE `admin_wallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_classifications`
--

DROP TABLE IF EXISTS `main_classifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_classifications` (
  `main_classification_id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`main_classification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_classifications`
--

LOCK TABLES `main_classifications` WRITE;
/*!40000 ALTER TABLE `main_classifications` DISABLE KEYS */;
INSERT INTO `main_classifications` (`main_classification_id`, `image`, `type`) VALUES (1,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EC%97%AC%EC%9A%B0%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','여우'),(2,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EB%8F%84%EB%A7%88%EB%B1%80%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','도마뱀'),(3,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EA%B1%B0%EB%B6%81%EC%9D%B4%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','거북'),(4,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EC%95%B5%EB%AC%B4%EC%83%88%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','앵무새'),(5,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EB%AC%BC%EA%B3%A0%EA%B8%B0%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','물고기'),(6,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EB%B1%80%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','뱀'),(7,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EC%B9%B4%EB%A9%9C%EB%A0%88%EC%98%A8%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','카멜레온'),(8,'https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/%EB%8C%80%EB%B6%84%EB%A5%98/%EC%9C%A0%EB%8B%88%EC%BD%98%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png','🌟');
/*!40000 ALTER TABLE `main_classifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `wallet_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modify_date_time` datetime(6) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` mediumblob,
  `register_date_time` datetime(6) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `vp_token` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`wallet_address`),
  KEY `idx_nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`wallet_address`, `birth`, `gender`, `modify_date_time`, `name`, `nickname`, `password`, `profile_image`, `register_date_time`, `role`, `vp_token`) VALUES ('0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F','1950.11.11','남성','2023-10-05 06:28:51.091373','홍길동','한갤이','$2a$10$k5JwSIa0rnTTitjUPj5Tg.2UeD.ARetn9taBp8s7xAmkN.XNywaA6','','2023-10-05 06:28:51.091480',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmhkR0VpT25zaWFXUk9ZVzFsSWpvaTdLTzg2Ni04NjVPeDY2R2Q3S2FkSWl3aWJtRnRaU0k2SXUyWmplcTR1T3VQbVNJc0luQnBiaUk2SWpVd01URXhNUzB4TWpJek5EVTJOaUlzSW1kbGJtUmxjaUk2SXV1Q3FPeUVzU0lzSW1KcGNuUm9Jam9pTVRrMU1DNHhNUzR4TVNKOWZYMHNJbk4xWWlJNkltUnBaRHBsZEdoeU9uTmxjRzlzYVdFNk1IZ3pOR05ETXpWQk16RkVZak5oTUVRMFFqbGtOalF4TkdJek9FWkVRakk1TjJZek1EWkNSamxHSWl3aWJtSm1Jam94TlRZeU9UVXdNamd5TENKcGMzTWlPaUprYVdRNlpYUm9janB6WlhCdmJHbGhPakI0UVRreVFXVTJOamsyTkRnMk0wRXdORUV4TkRNeU1ERkJSa0pqT0RJMVlUVTVNRGMwTUVJeU5DSjkuaHkwZzFSSktFRzlKVUFrd2JqTFJxZzVZUl8xYVd6eWhJX2Y0Tm12UUtoaG9INTJOaE5ZSVZWY3pZUW92ZzVKY0F4TzdiTjhVSVdrQnMwelljM0tBZXdBIl19LCJpc3MiOiJkaWQ6ZXRocjpzZXBvbGlhOjB4QTkyQWU2Njk2NDg2M0EwNEExNDMyMDFBRkJjODI1YTU5MDc0MEIyNCJ9.e5sTjfmVnGuQlkRPFW1ZBCb5sLW3yUmqS3H2gn1Om4tGtThwukheHcpP16zfwKZlDJG6APfD6HmwCuFlVj9WBQE'),('0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621','1980.01.01','여성','2023-10-05 19:54:54.273350','홍길동','재명이','$2a$10$Pld6f8cQNHiuBiXFKBCU8ODzvu/e1g4JIMhJFw5v9g4g3rl9h17z2','','2023-10-05 06:31:02.758441',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmhkR0VpT25zaWFXUk9ZVzFsSWpvaTdLTzg2Ni04NjVPeDY2R2Q3S2FkSWl3aWJtRnRaU0k2SXUyWmplcTR1T3VQbVNJc0luQnBiaUk2SWpnd01ERXdNUzB5TXpRMU5qYzRJaXdpWjJWdVpHVnlJam9pN0plczdJU3hJaXdpWW1seWRHZ2lPaUl4T1Rnd0xqQXhMakF4SW4xOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmMyVndiMnhwWVRvd2VEWTFaRVprTUdKQ1ltSmlOMk5qTldZeE5UVkNOV1l4WlRjMFFUZGxaak0wWmpWRFJtTTJNakVpTENKdVltWWlPakUxTmpJNU5UQXlPRElzSW1semN5STZJbVJwWkRwbGRHaHlPbk5sY0c5c2FXRTZNSGhCT1RKQlpUWTJPVFkwT0RZelFUQTBRVEUwTXpJd01VRkdRbU00TWpWaE5Ua3dOelF3UWpJMEluMC5HVGlLZG9PcmRCR1NNQk5HRUU4cXhXZG9tRllNN3ZTMnVNWnZyM0hlWTJWbXBUX1p6TE9tYWF4VGZjcy1GSDhoYTctNjNhem1ZVWZzSG9xMUFzTHRlZ0EiXX0sImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHhBOTJBZTY2OTY0ODYzQTA0QTE0MzIwMUFGQmM4MjVhNTkwNzQwQjI0In0.hP8GeNiAaDTVy-sc33tPGIFEGdPP7LyU_i91lUrLJpIuA8Zsn54ARC3y-hmxgzDavxvMNwjKLOO2wFWwYaJGlwA'),('0x8d0e7CEf84d53A26c96D5C290Bef89Ca4281ae0e','1950.11.11','남성','2023-10-05 16:34:45.416827','홍길동','내가누구게','$2a$10$ilFOcgNGWlt2kQf3Z/6a6upvKbHVLyETSSAMI0q2L0Gpr01wdZ.zy','','2023-10-05 16:34:45.416844',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmhkR0VpT25zaWFXUk9ZVzFsSWpvaTdLTzg2Ni04NjVPeDY2R2Q3S2FkSWl3aWJtRnRaU0k2SXUyWmplcTR1T3VQbVNJc0luQnBiaUk2SWpVd01URXhNUzB4TWpJek5EVTJOaUlzSW1kbGJtUmxjaUk2SXV1Q3FPeUVzU0lzSW1KcGNuUm9Jam9pTVRrMU1DNHhNUzR4TVNKOWZYMHNJbk4xWWlJNkltUnBaRHBsZEdoeU9uTmxjRzlzYVdFNk1IZzRaREJsTjBORlpqZzBaRFV6UVRJMll6azJSRFZETWprd1FtVm1PRGxEWVRReU9ERmhaVEJsSWl3aWJtSm1Jam94TlRZeU9UVXdNamd5TENKcGMzTWlPaUprYVdRNlpYUm9janB6WlhCdmJHbGhPakI0UVRreVFXVTJOamsyTkRnMk0wRXdORUV4TkRNeU1ERkJSa0pqT0RJMVlUVTVNRGMwTUVJeU5DSjkuVXB5Wmk5akpXMTg4aWJEOFUzOUpsZUl1UVFsTDhRcHVhc2lvUzZ6c0JnMU5vdWI3bDc2ZjZaSTROeTZpTUdwbHc1ZmpWQ3JGdng5b2xhN3Nnb091QUFFIl19LCJpc3MiOiJkaWQ6ZXRocjpzZXBvbGlhOjB4QTkyQWU2Njk2NDg2M0EwNEExNDMyMDFBRkJjODI1YTU5MDc0MEIyNCJ9._iu2xJlcD5k1i6q_cUf0rkZowLrl16qvyW1Aoe8H-uJQMtRHq7RDcA7I1WZtbr8uH07gs1pG-SEskLxQCXTSNAA'),('0xb760b739267Bb8Bc1d37a9DDb9f600D9aaeff12C','1980.01.01','여성','2023-10-06 01:27:23.452827','홍길동','asd','$2a$10$9D.SKekW7PSYK33VxZE7zOvI29Rf3/0qfm78.tb5uz57vDxARIbW6','','2023-10-06 01:27:23.452888',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTNNamd3T1RFMU16RXNJblpqSWpwN0lrQmpiMjUwWlhoMElqcGJJbWgwZEhCek9pOHZkM2QzTG5jekxtOXlaeTh5TURFNEwyTnlaV1JsYm5ScFlXeHpMM1l4SWwwc0luUjVjR1VpT2xzaVZtVnlhV1pwWVdKc1pVTnlaV1JsYm5ScFlXd2lYU3dpWTNKbFpHVnVkR2xoYkZOMVltcGxZM1FpT25zaVpHRjBZU0k2ZXlKcFpFNWhiV1VpT2lMc283enJyN3pyazdIcm9aM3NwcDBpTENKdVlXMWxJam9pN1ptTjZyaTQ2NC1aSWl3aWNHbHVJam9pT0RBd01UQXhMVEl6TkRVMk56Z2lMQ0puWlc1a1pYSWlPaUxzbDZ6c2hMRWlMQ0ppYVhKMGFDSTZJakU1T0RBdU1ERXVNREVpZlgxOUxDSnpkV0lpT2lKa2FXUTZaWFJvY2pwelpYQnZiR2xoT2pCNFlqYzJNR0kzTXpreU5qZENZamhDWXpGa016ZGhPVVJFWWpsbU5qQXdSRGxoWVdWbVpqRXlReUlzSW01aVppSTZNVFk1TmpVMU5UVXpNU3dpYVhOeklqb2laR2xrT21WMGFISTZjMlZ3YjJ4cFlUb3dlRUU1TWtGbE5qWTVOalE0TmpOQk1EUkJNVFF6TWpBeFFVWkNZemd5TldFMU9UQTNOREJDTWpRaWZRLkdXdmNvd21fc0JkNGwzYjRmR3FhNUdSX0Q4WUZrb2RlS0dEYkhDc3dxcUozLVNUN0pKMTV6UFg5QjlpbjhWdkFMZXI4TWFjSXlKUk9nYS1IWkJXbkxBQSJdfSwiaXNzIjoiZGlkOmV0aHI6c2Vwb2xpYToweEE5MkFlNjY5NjQ4NjNBMDRBMTQzMjAxQUZCYzgyNWE1OTA3NDBCMjQifQ.wELBmhKtUgnasixDitfuHyXr93I2npMksAIVL8ESAnYLX_YUUCWyxQ_PNDDivwQUXb9Y5G5Y9Pmek73WU5DRPwA'),('0xcf764542E31D9A0DCae80751A472701aA8172E84','1980.01.01','여성','2023-10-05 12:06:30.615751','홍길동','ssafy33','$2a$10$65DB0KLY16NOwBENqlEFou41/WjyWjddGuaxgPiubwZG3FQS8Qe7C','','2023-10-05 12:06:30.615767',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmhkR0VpT25zaWFXUk9ZVzFsSWpvaTdLTzg2Ni04NjVPeDY2R2Q3S2FkSWl3aWJtRnRaU0k2SXUyWmplcTR1T3VQbVNJc0luQnBiaUk2SWpnd01ERXdNUzB5TXpRMU5qYzRJaXdpWjJWdVpHVnlJam9pN0plczdJU3hJaXdpWW1seWRHZ2lPaUl4T1Rnd0xqQXhMakF4SW4xOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmMyVndiMnhwWVRvd2VHTm1OelkwTlRReVJUTXhSRGxCTUVSRFlXVTRNRGMxTVVFME56STNNREZoUVRneE56SkZPRFFpTENKdVltWWlPakUxTmpJNU5UQXlPRElzSW1semN5STZJbVJwWkRwbGRHaHlPbk5sY0c5c2FXRTZNSGhCT1RKQlpUWTJPVFkwT0RZelFUQTBRVEUwTXpJd01VRkdRbU00TWpWaE5Ua3dOelF3UWpJMEluMC51T1JWZlp5X1UzbTRya3VGUVlJdGZNYWxJMl9QcTVzTDJnTjlZdnUxdmtGMWt6SS1ENWQyNVduVlRpMGFqYms2UlVfTGFKSk5VU3RIb2xEMGM2V0JCZ0UiXX0sImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHhBOTJBZTY2OTY0ODYzQTA0QTE0MzIwMUFGQmM4MjVhNTkwNzQwQjI0In0.fSLE1_t0IBrfYcbZXKy-W8zkdjFKvBDReC9DMxVWGfQ1L8bZHGrhPVOQxoBaB2wBd48lG2t0EwyCA7Sf0YGD6AE'),('0xd83e613d8B4a2Cb4fAFA04F1ee87C8e6900b81A4','1980.01.01','여성','2023-10-06 00:19:11.767234','홍길동','JeBread','$2a$10$hq5IHacajGITKOUH5bgQrO6VyZ7.SfmJfI/RTdJndhXmbaa0UL/Oi','','2023-10-06 00:19:11.767356',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTNNamd3TWpJMk16a3NJblpqSWpwN0lrQmpiMjUwWlhoMElqcGJJbWgwZEhCek9pOHZkM2QzTG5jekxtOXlaeTh5TURFNEwyTnlaV1JsYm5ScFlXeHpMM1l4SWwwc0luUjVjR1VpT2xzaVZtVnlhV1pwWVdKc1pVTnlaV1JsYm5ScFlXd2lYU3dpWTNKbFpHVnVkR2xoYkZOMVltcGxZM1FpT25zaVpHRjBZU0k2ZXlKcFpFNWhiV1VpT2lMc283enJyN3pyazdIcm9aM3NwcDBpTENKdVlXMWxJam9pN1ptTjZyaTQ2NC1aSWl3aWNHbHVJam9pT0RBd01UQXhMVEl6TkRVMk56Z2lMQ0puWlc1a1pYSWlPaUxzbDZ6c2hMRWlMQ0ppYVhKMGFDSTZJakU1T0RBdU1ERXVNREVpZlgxOUxDSnpkV0lpT2lKa2FXUTZaWFJvY2pwelpYQnZiR2xoT2pCNFpEZ3paVFl4TTJRNFFqUmhNa05pTkdaQlJrRXdORVl4WldVNE4wTTRaVFk1TURCaU9ERkJOQ0lzSW01aVppSTZNVFk1TmpRNE5qWXpPU3dpYVhOeklqb2laR2xrT21WMGFISTZjMlZ3YjJ4cFlUb3dlRUU1TWtGbE5qWTVOalE0TmpOQk1EUkJNVFF6TWpBeFFVWkNZemd5TldFMU9UQTNOREJDTWpRaWZRLlVUZmFpXzh3ZXg3LUQtN2w4TndlTHI4SlZ6T2xNU3hTcVVQVV9xYzhqbDlIVnEwa1ZBbVAzb1k1Q0dkRnhkWTVDT2huUGNNRUpZWmVDTEF5MWlodndRRSJdfSwiaXNzIjoiZGlkOmV0aHI6c2Vwb2xpYToweEE5MkFlNjY5NjQ4NjNBMDRBMTQzMjAxQUZCYzgyNWE1OTA3NDBCMjQifQ.D1rX4EuARF56H7g07ULtwCBKJwrG2zUCgprW6uAg625kEgkyqrcJwkTyI2QI0kbjZZAFYigASLovjkitqAaE1AE'),('0xfBd361508736503f5dBd6DA6a485cA2F04B13115','1950.11.11','남성','2023-10-05 06:37:17.955113','홍길동','병욱','$2a$10$PO3Uxb0dVMMPGSwMgXCbEeT.nNImb1vTY9qdaTQTY1Ng4nJrvqDFq','','2023-10-05 06:37:17.955156',0,'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmhkR0VpT25zaWFXUk9ZVzFsSWpvaTdLTzg2Ni04NjVPeDY2R2Q3S2FkSWl3aWJtRnRaU0k2SXUyWmplcTR1T3VQbVNJc0luQnBiaUk2SWpVd01URXhNUzB4TWpJek5EVTJOaUlzSW1kbGJtUmxjaUk2SXV1Q3FPeUVzU0lzSW1KcGNuUm9Jam9pTVRrMU1DNHhNUzR4TVNKOWZYMHNJbk4xWWlJNkltUnBaRHBsZEdoeU9uTmxjRzlzYVdFNk1IaG1RbVF6TmpFMU1EZzNNelkxTURObU5XUkNaRFpFUVRaaE5EZzFZMEV5UmpBMFFqRXpNVEUxSWl3aWJtSm1Jam94TlRZeU9UVXdNamd5TENKcGMzTWlPaUprYVdRNlpYUm9janB6WlhCdmJHbGhPakI0UVRreVFXVTJOamsyTkRnMk0wRXdORUV4TkRNeU1ERkJSa0pqT0RJMVlUVTVNRGMwTUVJeU5DSjkuenl5U0NQV1NYdEdWdzBReDRqd2xsMldzMUpyWWJsTTRmbjBsZ2dXWk1Qc0NtMUVFNkxyQ0lheERyYkYwVlJuLWFoQWlvY0ZGUlBxd2xXd0liaENIeVFFIl19LCJpc3MiOiJkaWQ6ZXRocjpzZXBvbGlhOjB4QTkyQWU2Njk2NDg2M0EwNEExNDMyMDFBRkJjODI1YTU5MDc0MEIyNCJ9.hUMFnKx7spkws4bTV0J4xhtog507qvihwloSEcIZKRB27SxhvHVCpbKAOLsOSKauJ-eSG26BPCi_0dw2UPUpAwE');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `middle_classifications`
--

DROP TABLE IF EXISTS `middle_classifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `middle_classifications` (
  `middle_classification_id` int NOT NULL AUTO_INCREMENT,
  `feature` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_classification_id` int DEFAULT NULL,
  PRIMARY KEY (`middle_classification_id`),
  KEY `FKd63pkhd38pekme2iu9t2ce5xg` (`main_classification_id`),
  CONSTRAINT `FKd63pkhd38pekme2iu9t2ce5xg` FOREIGN KEY (`main_classification_id`) REFERENCES `main_classifications` (`main_classification_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `middle_classifications`
--

LOCK TABLES `middle_classifications` WRITE;
/*!40000 ALTER TABLE `middle_classifications` DISABLE KEYS */;
INSERT INTO `middle_classifications` (`middle_classification_id`, `feature`, `image`, `species`, `main_classification_id`) VALUES (1,'벵골 여우는 주둥이가 길게 늘어져 있고, 귀가 길고, 머리와 몸길이의 약 50~60%에 달하는 부푼 꼬리를 가진 비교적 작은 여우입니다/등부분의 털 색깔은 매우 다양하지만, 대부분 회색빛이고 흐릿한 색깔입니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%B2%B5%EA%B3%A8%EC%97%AC%EC%9A%B0AI2.png','벵골 여우',1),(2,'아프간여우는 부드러운 회갈색의 털을 가지고 있으며 배는 하얗습니다/등에는 검은 줄무늬가 있으며 때때로 뒷다리가 검다. 머리는 커다란 귀와 가늘고 짧은 주둥이로 특징지어집니다/꼬리는 몸통과 비슷한 길이이며 북슬북슬하고 그 끝은 검습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%95%84%ED%94%84%EA%B0%84%EC%97%AC%EC%9A%B0AI.png','아프간 여우',1),(3,'케이프여우는 은회색 털을 지녔으며 옆구리와 배는 누런빛입니다/큰 귀와 어두운 입주위가 특징적입니다/꼬리는 북슬북슬하고, 어깨높이는 35cm가량이며 몸무게는 2.5kg~3kg 정도입니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%BC%80%EC%9D%B4%ED%94%84%EC%97%AC%EC%9A%B0AI.png','케이프 여우',1),(4,'서남아시아 원산의 사막 도마뱀의 일종으로 레오파드 모프 그대로 표범을 연상케 하는 점무늬가 특징인 도마뱀입니다/발톱과 발가락의 흡반이 없으며 눈꺼풀을 움직일 수 있습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%A0%88%EC%98%A4%ED%8C%8C%EB%93%9CAI.png','레오파드게코 도마뱀',2),(5,'크레스티드 게코의 발색은 회색에서부터 갈색, 붉은색, 주황색, 노란색까지 다채로운 색과 무늬를 가지고 있습니다/그리고 수직 표면도 쉽게 이동할 수 있는 특화된 발바닥을 가지고 있습니다/크레스티드 게코의 꼬리는 물건을 집을 수 있으며 재빠르게 움직일 수 있습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%81%AC%EB%A0%88%EC%8A%A4%ED%8B%B0%EB%93%9CAI.png','크레스티드 게코 도마뱀',2),(6,'턱수염도마뱀은 사납게 생긴 외모와는 달리 매우 온순합니다/성체가 되면 하루의 대부분을 그냥 한가롭게 햇빛이나 쬐고 있을 정도로 느긋한 성격이고, 새끼 시절부터 핸들링을 자주 해 줬다면 사람을 물 일도 거의 없습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%84%B1%EC%88%98%EC%97%BC%EB%8F%84%EB%A7%88%EB%B1%80AI2.png','턱수염 도마뱀',2),(7,'앞발 사이에 복갑의 막대기와 같은 부분이 쟁기와 닮았다고 하여서 붙여진 이름입니다/등딱지는 높은 돔 각 직사각형의 방패에 눈에 잘 띄는 성장고리와 갈색빛입니다/등껍질의 크기는 43cm정도이며 수컷의 경우 전체 길이는 41cm에 10kg정도, 암컷의 경우 37cm에 8.8kg 정도의 무게를 가집니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%9F%81%EA%B8%B0%EA%B1%B0%EB%B6%81AI.png','쟁기 거북',3),(8,'붉은귀거북의 등딱지(갑)는 부드러우며 완만하게 구부러져 있습니다/등딱지는 진초록색에 노란색의 줄무늬가 있습니다/눈의 바로 뒤쪽에 붉은색 무늬가 있는 것이 특징이며, 여기에서 붉은귀거북이라는 이름이 붙었습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%B6%89%EC%9D%80%EA%B7%80%EA%B1%B0%EB%B6%81AI.png','붉은귀 거북',3),(9,'커먼 머스크 터틀의 특징은 어두운 몸색깔과 얼굴에 있는 흰줄기, 그리고 무엇보다 앙증맞은 작은 체구입니다/몸 길이는 8~10cm전 후, 최대신장 13.6cm정도입니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%BB%A4%EB%A8%BC%EB%A8%B8%EC%8A%A4%ED%81%AC%ED%84%B0%ED%8B%80AI.png','커먼 머스크 터틀',3),(10,'몸 색깔은 녹색이며 이마, 얼굴과 꼬리깃 일부가 빨간색이 특징입니다/날개 끝과 꼬리 일부는 청색입니다/보통 2~3마리 정도로 생활하며 나무 위에서 먹이를 찾고 나는 속도가 빠르며 높이 납니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EA%B8%88%EA%B0%95%EC%95%B5%EB%AC%B4AI.png','금강 앵무',4),(11,'몸길이는 약 15cm 내외, 몸무게는 40~60g 정도입니다/아프리카 원산의 앵무로 파트너에 대한 애정이 깊기 때문에 \'러브버드\'라고도 불려요. 연한 핑크색을 띠고 있는 모습에서 이름이 지어졌습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%AA%A8%EB%9E%80%EC%95%B5%EB%AC%B4AI.png','모란 앵무',4),(12,'초록색과 파랑이 혼합된 화려한 앵무입니다/꽃의 꿀을 먹기에 적합하도록 브러시 형태의 혀를 가지고 있다. 과즙을 주로 먹기 때문에 물이 많이 섞인 변을 보는 것이 특징입니다/저지의 삼림에 살며 꽃 꿀, 열매 등을 먹습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%98%A4%EC%83%89%EC%95%B5%EB%AC%B4AI.png','오색 앵무',4),(13,'구피는 성적 이형성을 가지고 있습니다/야생의 구피 암컷은 무늬가 없고 몸 전체가 회색을 띄지만, 수컷은 몸과 꼬리에 다양한 색상의 화려한 무늬나 점 등으로 암컷을 유혹합니다/이로 인해 포식자에게 더 발견되기 쉬워질 수 있습니다.','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EA%B5%AC%ED%94%BCAI.png','구피',5),(14,'화려한 무늬와 머리위에 돋아난 큰 혹이 특징으로 성체는 25~30cm까지 자라는 대형 시클리드입니다/수명은 약 8~10년 정도 되며, 우리나라에선 사람을 알아보고 잘 따르는 것처럼 보여서 \'워터독, 물강아지\'라고도 부릅니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%94%8C%EB%9D%BC%EC%9B%8C%ED%98%BCAI.png','플라워혼',5),(15,'플래티는 어항을 부지런하게 누비고 다니는 작고 귀여운 모습의 열대어입니다/동그랗고 놀란 듯한 눈이 매력적인 플래티는 온순한 성격으로 비슷한 크기의 다른 열대어들과 같이 키워도 싸우지 않고 잘 어울리지만, 플래티 수컷끼리는 공격적인 모습을 보이기도 합니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%94%8C%EB%9E%98%ED%8B%B0AI.png','플래티',5),(16,'킹코브라의 피부는 짙은올리브 또는 갈색이며 검은색, 흰색 또는 노란색 밴드가 교차되어 있습니다/주둥이 가까운 곳, 눈쪽에 두 줄의 가로 무늬가 있습니다/몸길이와 체중은 지역 및 기타 요인에 따라서 변화가 심합니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%82%B9%EC%BD%94%EB%B8%8C%EB%9D%BCAI.png','킹코브라',6),(17,'전체적인 외형은 다 알록달록 화려한 색이 얼핏 보면 산호 뱀과 상당히 유사하지만 전혀 다른 뱀으로 밀크 스네이크는 독이 없습니다/독이 있는 산호 뱀과 구별하는 방법은 붉은 줄무늬가 노란색과 붙어있는지, 검은색과 붙어있는지를 확인하면 구별하기 쉽습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%B0%80%ED%81%AC%EC%8A%A4%EB%84%A4%EC%9D%B4%ED%81%ACAI.png','밀크스네이크',6),(18,'볼파이톤은 작은 체구와 귀여운 외모, 온순한 성격, 튼튼한 체질, 저렴한 가격으로 인해 애완 뱀에 처음 입문하는 사람들에게 이상적인 초보 입문용 뱀으로 킹스네이크, 콘스네이크와 함깨 입문용 스네이크로 평가됩니다/뱀의 암수 구별은 불가능하지는 않지만, 힘듭니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%B3%BC%ED%8C%8C%EC%9D%B4%ED%86%A4AI.png','볼파이톤',6),(19,'베일드 카멜레온은 카멜레온과의 카멜레온속에 속하는 파충류입니다/다른 카멜레온들보다 머리 위에 훨씬 높게 솟은 투구와 마치 눌린 듯 초록색 나뭇잎처럼 생긴 납작한 몸이 특징입니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EB%B2%A0%EC%9D%BC%EB%A6%ACAI.png','베일드 카멜레온',7),(20,'체형이 세로로 넓직하며, 돌출된 두 안구는 360º로 따로 돌아가고, 작은 구멍이 뚫린 눈꺼풀이 항시 덮고 있습니다/발도 두갈래로 나뉘어서 나뭇가지 등을 \'잡는 데\' 유리한 모양입니다/눈을 각각 360도로 굴리는 능력이 있어서 시야에 있어 사실상 사각이 거의 없습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%94%BC%EA%B7%B8%EB%AF%B8AI.png','피그미 카멜레온',7),(21,'세계에서 가장 큰 카멜레온 (보통 몸무게로는 가장 크지만, 길이로는 가장 큰 타이틀을 가진 왕카멜레온보다 작습니다) 중에서 수컷 파슨카멜레온은 눈 위부터 코까지 이어지는 융기선을 가지고 있으며, 두 개의 사마귀 뿔을 형성하고 있습니다/널리 알려진 2종의 아종이 있습니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%ED%8C%8C%EC%8A%A8AI.png','파슨 카멜레온',7),(22,'아펜핀셔의 키는 25-30cm, 몸무게 3-47kg로 소형견이며 토이그룹에 속합니다/작지만 골격이 튼튼하고 동그랗게 반짝이는 작은 눈 때문에 원숭이처럼 보입니다/몸 전체가 덥수룩한 털로 뒤덮여 있고, 입 주위에 턱수염 같은 털이 수북이 나있어 우스꽝스럽게 보입니다','https://kkini.s3.ap-northeast-2.amazonaws.com/uniqon/AI%EC%82%AC%EC%A7%84/%EC%95%84%ED%8E%9C%ED%95%80%EC%85%94AI.png','아펜 핀셔',8);
/*!40000 ALTER TABLE `middle_classifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_collections`
--

DROP TABLE IF EXISTS `my_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_collections` (
  `my_collection_id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_id` int DEFAULT NULL,
  PRIMARY KEY (`my_collection_id`),
  KEY `FK942e7ix1xe9k3u22wy5ud3c1y` (`member_id`),
  KEY `FK7gejjhmcv9f7e9cg3crb3rtab` (`nft_id`),
  CONSTRAINT `FK7gejjhmcv9f7e9cg3crb3rtab` FOREIGN KEY (`nft_id`) REFERENCES `nfts` (`nft_id`) ON DELETE CASCADE,
  CONSTRAINT `FK942e7ix1xe9k3u22wy5ud3c1y` FOREIGN KEY (`member_id`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_collections`
--

LOCK TABLES `my_collections` WRITE;
/*!40000 ALTER TABLE `my_collections` DISABLE KEYS */;
INSERT INTO `my_collections` (`my_collection_id`, `member_id`, `nft_id`) VALUES (13,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',2),(21,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',5),(26,'0xcf764542E31D9A0DCae80751A472701aA8172E84',14),(27,'0xcf764542E31D9A0DCae80751A472701aA8172E84',13);
/*!40000 ALTER TABLE `my_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nfts`
--

DROP TABLE IF EXISTS `nfts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nfts` (
  `nft_id` int NOT NULL AUTO_INCREMENT,
  `age` int DEFAULT NULL,
  `contract_address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liked_cnt` int DEFAULT '0',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_tx_hash` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_id` int DEFAULT NULL,
  `creater` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_classification_id` int DEFAULT NULL,
  `wallet_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`nft_id`),
  KEY `FKdavpc74k5aavveq9yrdgmelx4` (`creater`),
  KEY `FKg4xfiqfqyyersa090njhp3cag` (`middle_classification_id`),
  KEY `FKno2k59ylh78etwrlbeq4f85gg` (`wallet_address`),
  CONSTRAINT `FKdavpc74k5aavveq9yrdgmelx4` FOREIGN KEY (`creater`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE,
  CONSTRAINT `FKg4xfiqfqyyersa090njhp3cag` FOREIGN KEY (`middle_classification_id`) REFERENCES `middle_classifications` (`middle_classification_id`) ON DELETE CASCADE,
  CONSTRAINT `FKno2k59ylh78etwrlbeq4f85gg` FOREIGN KEY (`wallet_address`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nfts`
--

LOCK TABLES `nfts` WRITE;
/*!40000 ALTER TABLE `nfts` DISABLE KEYS */;
INSERT INTO `nfts` (`nft_id`, `age`, `contract_address`, `feature`, `image`, `liked_cnt`, `name`, `nft_tx_hash`, `nft_url`, `token_id`, `creater`, `middle_classification_id`, `wallet_address`) VALUES (1,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','꼬리의 끝이 검다.','https://gateway.pinata.cloud/ipfs/QmT2E7aqjs24qVHSNC6QJWFWo1DjFgEp92LxJz6yDbZ49U',0,'여우비','0x4cd5a630fb461340177e54510490c9da295c325ba4723df7503479c7e695c0a0','https://gateway.pinata.cloud/ipfs/QmaZ8if8j9e2scWtf62YSceRCrDRf78n4W6zvcVZKxzkZj',65,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',2,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(2,8,'0x303a548f56ff203d435190ea3a082b59d726ce36','귀가 크다.','https://gateway.pinata.cloud/ipfs/QmUpTokd71Tbm2owQwZkQhPQnJKPHpuNA2XQkaZj3f5sYN',0,'뱅뱅이','0xa6ea402b7341ecb4776383b1b23c35390d06bcc5dcf9cf9dd38408062f3f3f6e','https://gateway.pinata.cloud/ipfs/QmXD1D5Nhv5PbJ1PjHdmbFWPEryY6icK56yJ51QWCMWCkZ',66,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',1,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(3,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','예쁜 케이시','https://gateway.pinata.cloud/ipfs/QmT2PVKimjH2z3T3VBcjKjmKvBj79w65oMb7uMDhSBxB8V',0,'케이시','0x3f0de474fe4ebfaad9854cf8ce55fe0f88ba666ce76871e440db082f5698b53c','https://gateway.pinata.cloud/ipfs/QmdbSh26nAg2kjM1W8URCSA2CPzTBsqsjXYQCiFXYq5uBz',67,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',3,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(4,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','귀가 뾰족하고 꼬리 끝이 검다.','https://gateway.pinata.cloud/ipfs/QmdFU6zmxLYLn7tMwpm5snHRuc64cyW8hUicDq99sYGP1t',0,'벵벵이','0xb5236bff034175e7b47dd7e839c6768fdc9f3f294ae436008f8a74433dea3e97','https://gateway.pinata.cloud/ipfs/QmZuAKU9nRvLDyg1Ni1yxWwF2phixo7yaMcJRiAufcZYcF',71,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',1,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(5,7,'0x303a548f56ff203d435190ea3a082b59d726ce36','건강이 좋지 못해서 자주 골골됩니다.','https://gateway.pinata.cloud/ipfs/Qmb8uoiUQxZhC3Wh3EzaEeX9vBJPgjzcmcEdZApdHjh1vK',0,'골골이','0xebe5c391268e18090df4765616dde512f9a3809729c75c21100844eb857fe0f6','https://gateway.pinata.cloud/ipfs/QmXpCu4JGHmbCMSKdr36WXTWE16pDGMCvcpP7LKkRWa7sL',72,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',1,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(6,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','아기 도마뱀 코레스 ','https://gateway.pinata.cloud/ipfs/QmPFKnnuZdUN6FycaeqHQgzPUq7GJTu59ommfGaQeoTMy8',0,'코레스','0x1f22bde1b501206a68ec5a748dce68ae1c28121e86c2c5c7bc0eecdc8c425d17','https://gateway.pinata.cloud/ipfs/QmPRs653UDQoKqntF5KzBvg74P2ZdHCjgKQRhxZ6QHckPv',73,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',5,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(7,5,'0x303a548f56ff203d435190ea3a082b59d726ce36','조그맣고 가슴이 하얘요.','https://gateway.pinata.cloud/ipfs/QmUE9zzb3KHzrVYgTYcLHiKXYa6rDJQ92sV8XbAtqGXwn5',0,'폭스바겐','0x35b3cf8eba009098f75cfcf91fe2915c7a676a941c812796cd1f5e90ecb95711','https://gateway.pinata.cloud/ipfs/QmUWfKZxD7PAbTrhjdEVTCaw99MgfrtBq6ZrLJnpSYC4WH',74,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',1,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(8,12,'0x303a548f56ff203d435190ea3a082b59d726ce36','귀가 둥글고 애교가 많아요!!','https://gateway.pinata.cloud/ipfs/QmbczamxcaBBCeeqTcNrC6KiikDdu4BiDqMvnnqCtDEsnF',0,'주황이','0x7011c1e4422f8342eea7268133ab30524a3b44faa47f85fd60bc27c6f6d53f4a','https://gateway.pinata.cloud/ipfs/QmT8Xog2bfLpzP753dVa8Y3HJpSi8cGfhN5HboDBuXud9u',75,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',2,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(9,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','눈매가 사나워 보이지만 애교가 많아요.','https://gateway.pinata.cloud/ipfs/Qmc2pW6r3q4Kg3T2ug2i2Fs9qqHhQaT8NQ7BDfWSEgKQAw',0,'오렌지','0x2cf56203aa9296df152ef56e0b41e4be5b90c421268fb55b7ceb111e474cd684','https://gateway.pinata.cloud/ipfs/QmQ154ySUAGzG1LkDJniDvASEbD9HZcRnNuALz3EQdj6GA',76,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',2,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(10,6,'0x303a548f56ff203d435190ea3a082b59d726ce36','사람을 잘 따라다니고 잘 웃습니다.','https://gateway.pinata.cloud/ipfs/QmY1VPNkZ3aYvxNTA9voB9eiAJb9Q58gcxMJbNggsfEADt',0,'칙칙폭폭스','0x32035009667be5e5da33b6d1ffa2112010180e86d608c75a1810b2fb3e728ae2','https://gateway.pinata.cloud/ipfs/QmQo3K3G6w5wPmBzX3g6iB9VXwdqrUrqaSGJXE6GEmrhn8',77,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',2,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(11,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','경계를 많이 하고 소리를 잘 질러여몽라~~','https://gateway.pinata.cloud/ipfs/QmX9EeduGrbVRoTHiYLBpkVGu2sXn4ypVXxkwgwYbZGcB6',0,'이스케이프','0xd227520778d6a00fcc3f6bcad391a9b2a1bda59ab0fdbc36733881b191acb84f','https://gateway.pinata.cloud/ipfs/QmTWLdwhwgBYuLrb3BwikSdFCJPF3k2p2EwktYoQdRatT1',78,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',3,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(12,15,'0x303a548f56ff203d435190ea3a082b59d726ce36','귀여운 꼬마 거북','https://gateway.pinata.cloud/ipfs/Qmeq5eUidVi6VW6nXXpGqkGH1dxZdNTEoAR9g2rNATwzCu',0,'징기스칸','0xe81b69e2511fcab4e3d38d9f6090cc8c05a0e8735a9b2eabbab9d1d81514dd28','https://gateway.pinata.cloud/ipfs/QmeK3kAv2N4sPCmvXWR8aYMrAJG6Dt6TcgQR59NQPiHzSr',79,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',7,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(13,10,'0x303a548f56ff203d435190ea3a082b59d726ce36','잘생긴 편이구여 늠름해요!!','https://gateway.pinata.cloud/ipfs/QmTfDa9XfjU3Cw4cvrHoKKy1KHXPZiQSNwDpLSLUSHbSv6',0,'핸섬폭스','0x446b70f19deb6c548e98fe9c904578dfbcbc71b01c9117de5ad3fefa85b47036','https://gateway.pinata.cloud/ipfs/QmV4CFzKfWnsBqJa51HgCJqbGgS9iuxSLJVmbeudodArPY',80,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',3,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(14,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','부르면 귀가 쫑긋하게 서고 달려와요~~','https://gateway.pinata.cloud/ipfs/QmQXnqMKbwqcNuRKv1qZbSM2SYTDNRhSisuaP3NrxVGLD1',0,'케이프라다','0xced87d90c8923128c00d3b6bfee1158245031a698b9aee48846da7875f0c185f','https://gateway.pinata.cloud/ipfs/QmNYaEGjkpnGRaKd94nSLzseGobCReHwCYXcteodK88fXg',81,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',3,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(15,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','꼬리가 잘 말려있구 등에 갈기가 있어요!!','https://gateway.pinata.cloud/ipfs/QmVHi4cw1ZedfBJFynr5QUL5YPDzwBcMd9KNhmWMYewZV9',0,'마끼아또','0xe3eceaf449e4124b98054d94b0f666f4b71fd3526d8525889c2cb88bff420baa','https://gateway.pinata.cloud/ipfs/QmZFx6jc6KrDERpmNMEySSv2VSGyXUf9qWrVbTBoqEU3b6',83,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',19,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(16,7,'0x303a548f56ff203d435190ea3a082b59d726ce36','턱수염이 없는 턱수염 도마뱀','https://gateway.pinata.cloud/ipfs/QmTF1CMhMocTPovT9fr9vxXe2hT5aRir8wVFrG41zKGHTD',0,'비어드턱','0xf2c24faa6cce5d1c7c856c936fa2b1d5ca1deec9bef77ee82f05ddd9094d0c40','https://gateway.pinata.cloud/ipfs/QmX6CcY8D31oMT1Z6k6mDxkmqKuRs1Wmmve5woAqhsvNpR',84,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',6,'0xcf764542E31D9A0DCae80751A472701aA8172E84'),(17,7,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸에 줄무늬가 있고 잘 숨어요.','https://gateway.pinata.cloud/ipfs/QmcrhRwwEPByf4ZVT9z4vjSv6RCM9BH7jGK9cTr787omn6',0,'초록이','0x83445ec510d122d518180429d1301c8caab04e566f24107f428c94906689327e','https://gateway.pinata.cloud/ipfs/Qme8ZHJByWyHsF2WBg8Y6fQyrg75EF7J8nPWRS4db6eRBf',85,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',19,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(18,8,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸에 줄무늬가 있고 초록초록해요~','https://gateway.pinata.cloud/ipfs/QmWYWzizELkUBisXhzG8VuYGC8qg4HLG53dm1DD4LEd8rF',0,'그린보','0xe30b9af65b86226c10feb324ad09360fb243ee0ff2cb96d944fc5dc3952fcebd','https://gateway.pinata.cloud/ipfs/QmWumP8a9FTmHiCMs78MXsaGjPc5Kdh7gjPtPEaSwg6eMc',86,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',19,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(19,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','너무 작아서 너무 귀여워요','https://gateway.pinata.cloud/ipfs/QmaJwQEhgFgresrBCYqiGFmdAgcGs8ZwDrq3me8a2FhVHU',0,'쪼꼬미','0x91cbdf53306821868ba0d2332cb56615e11fe452f17b29362330dc993326c743','https://gateway.pinata.cloud/ipfs/QmQhoZoSZFpzk7SV9VvD3jpbjaqJp1rW3WYjGX9hNLfj3a',87,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',20,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(20,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','너무 작아서 잘 안보여요 ㅋㅋ','https://gateway.pinata.cloud/ipfs/QmTLNQ5PopBWW1QqhuYiJpZpQzMhRnR54oStMtteXUNCDB',0,'미니카','0x97148a7b1db2b6e55aada4975c5695f9e9beffbf3d41a65853586709bac79e38','https://gateway.pinata.cloud/ipfs/QmRsbWJ1hg66dEY7h1qsPT9Ea16vSjawg7YpM7Nsu4aHVZ',88,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',20,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(21,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','등에 갈기가 멋져요.','https://gateway.pinata.cloud/ipfs/QmXABQtxV5fYvc6ihepcthJ2rUMR13vXS2YdUz9yJDKwfb',0,'피그','0xfc208e5ca60f4c4bbf360a6a76c22ed38ae921b033a9ccff6679a9c5b3feb2fd','https://gateway.pinata.cloud/ipfs/QmX3ZogyWP1G1WAUmynoM6iW8anPvoapRp8Pz4fMMAY9SA',89,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',20,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(22,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','덩치가 크고 많이 먹어요','https://gateway.pinata.cloud/ipfs/QmZPTP8iidoQ68ToTbAV44STDF3e1uZqvkcV1hHkc3EysU',0,'빅보이','0x42b7002bbe7f6d96c78fb0b4062d61a5502e7a5abc1669a1d54af6ee1b26622f','https://gateway.pinata.cloud/ipfs/QmSGMHCVZ4EAF78kspVgD721di5VcxQAhwUN9ZN5gcBKAV',90,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',21,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(23,8,'0x303a548f56ff203d435190ea3a082b59d726ce36','호기심이 많아서 사고를 많이 쳐요 ㅠㅠ','https://gateway.pinata.cloud/ipfs/QmPrYGvbwXhRzP65qv2jYDBRc2i4oN8c1ebJKGMYXbVf5L',0,'뭉치','0xf988d9fb9b437c7d48c9f1b69b72598984eef8f0c3556fb7e925a17acb54752b','https://gateway.pinata.cloud/ipfs/QmVnD9S2C8McUiTib53RdzodKfFbR1htvEE4W5iE83qy8E',91,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',21,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(24,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','바나나 같은 볼파이톤','https://gateway.pinata.cloud/ipfs/QmbMcZEJh7b4Y5ASWChuGd7hP4hMmMU7UC7vhLPieGFe1G',0,'바나나볼','0x1d0358bab917167a72275f3d6757961810845c866ae0984706559a16a1f72620','https://gateway.pinata.cloud/ipfs/QmdepGL6FanWrymx8A2guiDgbdADPwDnbQBX4UDAoH17LX',92,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',18,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(25,9,'0x303a548f56ff203d435190ea3a082b59d726ce36','잠이 많지만 식사시간은 기가 막히게 알아차려요.','https://gateway.pinata.cloud/ipfs/QmYATE7ZdWvsTCCnT1Zmrv4jZd3cHLVbDQwahg8xb9gCHb',0,'잠만보','0xc963b9fe75c9e3a4998afe5f7fd10fc9e9db6067ee58698dc8ec09d3260b62d5','https://gateway.pinata.cloud/ipfs/QmaaJPV1YaZNTdBpDmi4tg1x9XQdHeAAffGLbPzPkrTyJp',93,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',21,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(26,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','아프리카 뱀 볼파이톤이에욧','https://gateway.pinata.cloud/ipfs/QmPjRL48NotsCxHKU3uPY8nGZeVDBW1EBcRNFzcv3G3vR8',0,'파이어볼','0x4fa817b7b87d551ea1ca1691af1ed8c870de0be8315da0189726d6cce27e046f','https://gateway.pinata.cloud/ipfs/Qme7mLFhjh1EsJzoc3WnD164TxcGTRAB1Y6RbNsuk9deeu',94,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',18,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(27,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','꼬리의 결이 부드러워요.','https://gateway.pinata.cloud/ipfs/QmWA2koCG9RxqsdWzoW8CuFJsitnyt6eHBtpus5W5A59yH',0,'블루밍','0xf72e3d3b661c17d4a47df877f584c5251a5263e574b238a966a739d5ae491d0e','https://gateway.pinata.cloud/ipfs/QmcFZJLtbU2qagEFu5WidHUq9MAMHPMZTuw92YnDUSE91Z',95,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',13,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(28,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸 전체가 까맣고 꼬리 끝이 투명해요.','https://gateway.pinata.cloud/ipfs/QmNVrLbfwoiLZHGfobFyhyJbd1BuWbLQ1Se2MneGkF9GFM',0,'검둥이','0xa19432d529d68d184b413ca9371364ef60f21e7e0106c038b963e8a78769ff03','https://gateway.pinata.cloud/ipfs/QmPJgAryhvMBW2ykZbBokLcBnSt7qLhDz6K16v2qcrNKDV',96,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',13,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(29,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','비늘색이 오묘해요.','https://gateway.pinata.cloud/ipfs/QmNyWSSYgisBsLpG5bUdNdatsezXHCoRpCxq5L9wCdtXtd',0,'빨강이','0x222b86c75bbb4eacb0e55101a8ea2dc6c4f2eae529826647d1a68149a8f4339c','https://gateway.pinata.cloud/ipfs/QmWCNaueJWm67AE2zpNm2LuaVMkJicSMve8kig57X8zw1h',97,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',13,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(30,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','핑크핑크한 몸이 매력이예요.','https://gateway.pinata.cloud/ipfs/QmPVPxCnMvoRE5WrUEzcTs8daHSWaJ5UDod4ncqAGSLiZs',0,'핑크혼','0x4b4bf0c2f48d420368e31269e7d44504e8024f01a0d55451a3256f6465a4066f','https://gateway.pinata.cloud/ipfs/QmNjQFkdxNAb6XxVRHqJGh31YQraqXRS4Eoe7Y7zGA9Y4G',98,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',14,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(31,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸통의 절반이 은색이고 빛을 받으면 반짝거려요.','https://gateway.pinata.cloud/ipfs/QmYM2GaKXAwsZZGn2YRMDQY9AjHTFfWG4aFVhPeD7BSiXW',0,'실버혼','0xaa160905e1179f15438d893f373fc67f613a1e5195c6bf049ed7b4f67ea4c9a7','https://gateway.pinata.cloud/ipfs/Qmd9CwuRFsM8X4YtxfSEhEq3zxbXFRRZiHBGVDqbZo7bkc',99,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',14,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(32,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','퍼렁퍼렁','https://gateway.pinata.cloud/ipfs/Qmeg8qneC6tWSDtjTUVY1ULrCU2y4j7fScbZkndG4qBtdS',0,'퍼렁이','0x91f2403200ffa73d71e7018ba712ffcd6f122bedf7238980c128696aa2b3a6f0','https://gateway.pinata.cloud/ipfs/QmeoqkXQJrfQeu8M1aAHGGK1sJLBWgLxFvE4XF9AUa4sTH',100,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',15,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(33,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','하양하양','https://gateway.pinata.cloud/ipfs/QmeyvUw3fxFSyu32LAdtTzKD6tzb2KGdQWNKz4BzUMZV31',0,'하양이','0x63d58b0d630093e7eeb53bc9c00413e2403456f3f65604613cff875420d7c8d9','https://gateway.pinata.cloud/ipfs/QmUMoNitkNirr6yXAUUaWTo9osbvD25jVGp1o5679buqik',101,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',15,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(34,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','늙어 보였지만 회춘한 파슨이','https://gateway.pinata.cloud/ipfs/QmR3CWpCjeYC98uGxmq3ii6itrp8ogzxW7MsxX5trkFxhW',0,'파슨이','0x84ee1ccb51e799daa32c5cfe7914b84b3415cd3cdd3de55212ca2b5fbba3af04','https://gateway.pinata.cloud/ipfs/QmeVubwU9t9P6udvuTXbtNyALcAiBuMWbTrgvHtcjEej4C',102,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',21,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(35,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','꼬리가 몸에 비해 짧아서 귀여워요.','https://gateway.pinata.cloud/ipfs/QmdWDLJaV3FxVLcqzE3oiTqUiJ7d6GGawt31vv6pbgihqx',0,'레드혼','0xc8fb8d610d5f5b4ae2112613a3c0eee125d5f4ec5134d4243b9d2cffe8995eff','https://gateway.pinata.cloud/ipfs/QmVaVmwkfWuCEVydmrfyiBcANgXfHxk8WWRr6i9Yq6brCS',103,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',14,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(36,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','주황색 몸에 검은 지느러미가 매력이예요.','https://gateway.pinata.cloud/ipfs/QmZuU4wRj8Y7fhei2o5wgvhAWLa14UkQqDWmLY4syaVhJq',0,'오랜지','0x963db2d3450664f0b973597d074065bc3dea8491c1d1df1b51b1eb843ddba336','https://gateway.pinata.cloud/ipfs/QmQ3v1QauzLMEs7hpGFWd8VMgNMoFVvMrWuEpsNgmWvy64',104,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',15,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(37,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','배가 불러있어서 퉁퉁해요.','https://gateway.pinata.cloud/ipfs/QmU9e24dTZ7AqanwvEyznfXnsTeXy4NGppJeE2qSnhaBiA',0,'퉁퉁이','0xfb3b45d7e40ab553bf5120b2329d218bc34f1a2ebdc2f99fa1a41aab647c283f','https://gateway.pinata.cloud/ipfs/QmShYbduFcZkHEV64pJjE4zdkztU1NDZY4bRLvqGdV73ag',106,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',15,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(38,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸에 파랑색과 하늘색이 공존합니다.','https://gateway.pinata.cloud/ipfs/QmcqpZWNAMj6zHFnWs2nMFmu8dc2482j51AjXcWfJitXe6',0,'파랭이','0x8559e94e37d25a1f96edbde0070d7c19ed0b179f9cdd1d55c699e8d842cca81e','https://gateway.pinata.cloud/ipfs/QmbWQ8RUTjo7RzjBjDCgHeCU6mR1kbEs3LqwmabdnsTJ5q',108,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',15,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(39,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','몸에 파랑색과 하늘색이 공존합니다.','https://gateway.pinata.cloud/ipfs/QmcqpZWNAMj6zHFnWs2nMFmu8dc2482j51AjXcWfJitXe6',0,'파랭이','0x58719e49381377f851aa891ee837b779904f6c1c3851483db389c182cf2dbdd8','https://gateway.pinata.cloud/ipfs/QmbWQ8RUTjo7RzjBjDCgHeCU6mR1kbEs3LqwmabdnsTJ5q',107,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',15,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(40,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','털 끝이 파랗고 말을 잘 따라한다.','https://gateway.pinata.cloud/ipfs/QmXjkc54a8J4Hpd8WGEeUkpZUikmb5LzfdvJ3Ys86MTXRE',0,'앵앵','0x294b16c82c68f597d3c687ce7e1d03fef552e8e9ab71bd7699cbde04b1ef0f66','https://gateway.pinata.cloud/ipfs/QmRcuX9QXc56iU19sbJZKjoK7oqXQiPa1LNzYSsr9qnfoT',111,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',10,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(41,5,'0x303a548f56ff203d435190ea3a082b59d726ce36','깃털에 여러가지 색이 담겨 있어 화려하다.','https://gateway.pinata.cloud/ipfs/QmYaAZmd9HMwg2DDGTtB94HsuuadFPWbGdwwKDG5n87CJQ',0,'금강','0xdb23905000b98f72d936f6b6af9119838261863a09b97ac6aa9056fb070fc586','https://gateway.pinata.cloud/ipfs/QmbytGz22sgFxYiXW1U3PMqM45gyuNhoRAQpEBVGwmDsg3',112,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',10,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(42,3,'0x303a548f56ff203d435190ea3a082b59d726ce36','파랑파랑한 깃털이 시원해보여요.','https://gateway.pinata.cloud/ipfs/Qme81MuX54Sn5i9ATkvg4UW3UkSddQx8ZfRx18q4QiMsR9',0,'파랑무','0xdd308eaeeb064cb84ca3259933a61913e475287697ea0303a44eb78c9f0204fc','https://gateway.pinata.cloud/ipfs/QmdWYawewQTJcESdZTZDenbrGN6zeAN4uP1AFhiArbcwYJ',113,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',10,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(43,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','노란색 깃털이 예뻐요,','https://gateway.pinata.cloud/ipfs/QmenUuLuJSLQKn6ZdbMqGX8JmmPkE6qa8ywF2Sh6cDhE7E',0,'노랑이','0xb0de2fa9f64d0e61f6bbb8685f412cb41bdc25d90861836bb2bd02899e64c3ce','https://gateway.pinata.cloud/ipfs/Qmf9zDasu1jQq3LxFDERUTriWNRQ5Xyfu8h81x3jdgdssv',114,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',11,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(44,4,'0x303a548f56ff203d435190ea3a082b59d726ce36','초록색 깃털이 오묘한 느낌을 줘요.','https://gateway.pinata.cloud/ipfs/QmNR1AZuQ7L36zZJ4nsP5kLHHJvXe6Rv5QkMdLztHfjz6D',0,'매실','0xdc095b1ec4644885aea1f1c52ae81e6837eb05ffbb0b9c3eda11c529790dffeb','https://gateway.pinata.cloud/ipfs/QmVytZCmq4FaDLn6GzzYUURGXvGfLjj6pcLaPaJJKqEjnh',116,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',11,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(45,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','노란색 깃털이 예뻐요,','https://gateway.pinata.cloud/ipfs/QmenUuLuJSLQKn6ZdbMqGX8JmmPkE6qa8ywF2Sh6cDhE7E',0,'노랑이','0xd9653ff40361e4444bde9e15912c4193144682dc9eaad9b704a4b61e46d7f5e2','https://gateway.pinata.cloud/ipfs/Qmf9zDasu1jQq3LxFDERUTriWNRQ5Xyfu8h81x3jdgdssv',115,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',11,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(46,5,'0x303a548f56ff203d435190ea3a082b59d726ce36','살이 쪄서 뒤뚱뒤뚱 걸어요.','https://gateway.pinata.cloud/ipfs/QmP8S4d8EMXWzSdSBmUb6PzxXAiR2jNGJFogmtQNz6YEqM',0,'오색실','0x66bb96e092b318c78255aa2d5862c0e0f364e43359304ba153376dad221ab20c','https://gateway.pinata.cloud/ipfs/QmZ3A1TRP196Q3ztmud9F581TXiBD4CyJPMK1edtaS1ycS',117,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',12,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(47,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','날개를 펴면 독수리같아요.','https://gateway.pinata.cloud/ipfs/QmXnYS73C34wMRBGDaqYKzaSNaMhoS1UrpemGJaZ4PrFyh',0,'이글','0xf5ed268b9bbe3d271841fca5c1a8711e5d3fd5b8071eeeb4d301ede85c480397','https://gateway.pinata.cloud/ipfs/QmcqmBEDSpMKjypULQdPt6NE3J8Q8mc19yyf4EPiX8NjGg',118,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',12,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(48,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','아주 작고 귀여운 녀석이랍니다.','https://gateway.pinata.cloud/ipfs/QmSTbDT1o4drknfnkfuEB2UKgaEwWToJmdekvwQiWrxAqG',0,'귀요미','0xf8e02dd78f047322ea11752126a0e7c8ba087286da392a2eb7d77f02e226b24d','https://gateway.pinata.cloud/ipfs/QmT3NCyAWww3f7HQAdE87AN8kYJLFBzhsJus5oR6tfEVfR',119,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',7,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(49,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','노란 등껍질에 갈색 무늬가 인상적이다.','https://gateway.pinata.cloud/ipfs/QmNi1X22D1pmCkn4tnWRcDp3uNCPhvHbHSwy6wGihjCirz',0,'터틀맨','0xdb450348952103b2c790d8e401c8d7ee9783b292ac1938b6de62bee8174050b9','https://gateway.pinata.cloud/ipfs/QmZB2rQaV6dxvJA32MCtUfS5DB1GWkpLcWbQn4XsoVHNDy',120,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',7,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(50,2,'0x303a548f56ff203d435190ea3a082b59d726ce36','랩 잘하는 미란이','https://gateway.pinata.cloud/ipfs/Qmd8kL8YmNUhspKztvFU1bSwryWiSFtZPoYR54sEeuJUUC',0,'미란이','0x62571781b1df19785ba49a62ec41eb25e36ea16ff2c4fcefafd23ad9b7a93f00','https://gateway.pinata.cloud/ipfs/QmW3YvnggQej4sM82qD3SjiwRyxTwfZENAp7o4oj7fwdD9',121,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',11,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(51,25,'0x303a548f56ff203d435190ea3a082b59d726ce36','단단한 등껍질과 초록피부가 너무 멋지다.','https://gateway.pinata.cloud/ipfs/QmNnUddDsAUw9vwT77717kLCmmweh4Dr7pcsxeuFszHZy8',0,'애호박','0x9100ac48574b4000ce38ef1a65576edd7257ae4553298e02872c8cc4f1c1bb30','https://gateway.pinata.cloud/ipfs/QmdjWXRMFYzMsEJJRoPqKq7U9K7HwoHAnQiHa4god7usD3',122,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',8,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(52,1,'0x303a548f56ff203d435190ea3a082b59d726ce36','너 눈을 왜 그렇게 떠','https://gateway.pinata.cloud/ipfs/QmP87n2f7vsoaBjoehLYdRcxfGh7KJmVH16KYjUevN5RiM',0,'무새앵','0x811a591596ffb4117029600de76af5e2460b3dbdcc9830f34d5b7fc6c5ffc17e','https://gateway.pinata.cloud/ipfs/QmcEyDZTvTuSGf9MJQc6oi8oQP8ZHRAK2j2cdhXf8FqP69',124,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F',11,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F');
/*!40000 ALTER TABLE `nfts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `checked` tinyint(1) DEFAULT '0',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_datetime` datetime(6) DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `member_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKojs7hmp2vm78xakpqgr1hgsbk` (`member_id`),
  KEY `FK599539lym3mnkbqks0u806eac` (`post_id`),
  CONSTRAINT `FK599539lym3mnkbqks0u806eac` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `FKojs7hmp2vm78xakpqgr1hgsbk` FOREIGN KEY (`member_id`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sale_completed_datetime` datetime(6) DEFAULT NULL,
  `state` int DEFAULT '0',
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `update_datetime` datetime(6) DEFAULT NULL,
  `buyer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_id` int DEFAULT NULL,
  `seller` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK6v8o4ha5gsci46yp7rnyu807t` (`buyer`),
  KEY `FKswog9cylym2398dhwdrof615x` (`nft_id`),
  KEY `FKjfreojac61sewb20tl2g5317d` (`seller`),
  CONSTRAINT `FK6v8o4ha5gsci46yp7rnyu807t` FOREIGN KEY (`buyer`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE,
  CONSTRAINT `FKjfreojac61sewb20tl2g5317d` FOREIGN KEY (`seller`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE,
  CONSTRAINT `FKswog9cylym2398dhwdrof615x` FOREIGN KEY (`nft_id`) REFERENCES `nfts` (`nft_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`post_id`, `content`, `create_datetime`, `price`, `sale_completed_datetime`, `state`, `title`, `update_datetime`, `buyer`, `nft_id`, `seller`) VALUES (1,'우리 케이시 이쁘죠 아무나 사가세요ㅎㅎ','2023-10-05 08:59:22','0.76','2023-10-05 08:59:22.653059',0,'예쁜 케이시 NFT 팔아요~','2023-10-05 08:59:22.653065',NULL,3,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(2,'크레스티드 도마뱀 코레스입니다. 멋있으니까 당장 사세요.','2023-10-05 16:17:39','0.045','2023-10-05 16:17:39.920238',0,'우리 멋진 코레스','2023-10-05 16:17:39.920253',NULL,6,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(3,'잘생겨서 팔고 싶지 않은데...\n돈이 급해서 ㅠㅠ','2023-10-05 16:22:44','0.01','2023-10-05 16:22:44.247834',0,'정말 잘생긴 여우입니다~~~','2023-10-05 16:22:44.247841',NULL,13,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(4,'쌉니다 싸요','2023-10-05 17:32:30','0.0002','2023-10-05 17:37:22.152395',1,'볼파이톤 NFT 싸게 팔아요~','2023-10-05 17:37:22.152410',NULL,26,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(5,'빨리요','2023-10-05 18:19:24','0.0001','2023-10-05 18:22:15.793697',1,'지수님 사주세요','2023-10-05 18:22:15.793715',NULL,16,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(6,'핑크 혹이 달린 플라워혼입니당~~','2023-10-05 19:01:43','0.0003','2023-10-05 19:01:43.548168',0,'예쁜 핑크 플라워혼 개 이쁨','2023-10-05 19:01:43.548171',NULL,30,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(7,'비늘이 화려한 구피예용~~','2023-10-05 19:02:38','0.0002','2023-10-05 19:02:38.918691',0,'화련한 비늘의 구피 팔아요~','2023-10-05 19:02:38.918694',NULL,29,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621'),(8,'멋있으니까 비싸게 팔아요','2023-10-05 20:08:05','0.09','2023-10-05 20:08:36.715719',0,'간지나는 볼파이톤!','2023-10-05 20:08:36.715741',NULL,24,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(9,'늠름하고 멋있습니다. 쉽게 구할 수 없어요','2023-10-05 20:21:29','0.52','2023-10-05 20:21:29.031233',0,'늠름한~ 카멜레온','2023-10-05 20:21:29.031237',NULL,34,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_histories`
--

DROP TABLE IF EXISTS `transaction_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_histories` (
  `tx_history_id` int NOT NULL,
  `transacted_at` datetime(6) DEFAULT NULL,
  `tx_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_id` int DEFAULT NULL,
  `seller` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tx_history_id`),
  KEY `FKi0mnynlohnmt8ifdsoe83wp4v` (`buyer`),
  KEY `FKbnvml1f5jiw17of4h4n1qjxtn` (`nft_id`),
  KEY `FKhyb6d78p74agl5lyh6n2gyie7` (`seller`),
  CONSTRAINT `FKbnvml1f5jiw17of4h4n1qjxtn` FOREIGN KEY (`nft_id`) REFERENCES `nfts` (`nft_id`) ON DELETE CASCADE,
  CONSTRAINT `FKhyb6d78p74agl5lyh6n2gyie7` FOREIGN KEY (`seller`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE,
  CONSTRAINT `FKi0mnynlohnmt8ifdsoe83wp4v` FOREIGN KEY (`buyer`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_histories`
--

LOCK TABLES `transaction_histories` WRITE;
/*!40000 ALTER TABLE `transaction_histories` DISABLE KEYS */;
INSERT INTO `transaction_histories` (`tx_history_id`, `transacted_at`, `tx_hash`, `buyer`, `nft_id`, `seller`) VALUES (1,'2023-10-05 17:37:22.131713','0x8806cb60dc466d3cb636e58b7332f557631853306e2d89ca01cfa40460afef9b','0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',26,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F'),(2,'2023-10-05 18:22:15.773355','0x98d1b6bb7513fd48290d68bec07d2c27aa273d5ec353bfc34f3a0b1541447624','0xcf764542E31D9A0DCae80751A472701aA8172E84',16,'0x34cC35A31Db3a0D4B9d6414b38FDB297f306BF9F');
/*!40000 ALTER TABLE `transaction_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_histories_seq`
--

DROP TABLE IF EXISTS `transaction_histories_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_histories_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_histories_seq`
--

LOCK TABLES `transaction_histories_seq` WRITE;
/*!40000 ALTER TABLE `transaction_histories_seq` DISABLE KEYS */;
INSERT INTO `transaction_histories_seq` (`next_val`) VALUES (101);
/*!40000 ALTER TABLE `transaction_histories_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `FKolrwumvasyyrf034314mvnfgv` (`member_id`),
  KEY `FK4wjb6x4c8u5tvsui3sgwtqxfu` (`post_id`),
  CONSTRAINT `FK4wjb6x4c8u5tvsui3sgwtqxfu` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `FKolrwumvasyyrf034314mvnfgv` FOREIGN KEY (`member_id`) REFERENCES `members` (`wallet_address`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
INSERT INTO `wish_list` (`wishlist_id`, `member_id`, `post_id`) VALUES (3,'0x65dFd0bBbbb7cc5f155B5f1e74A7ef34f5CFc621',1);
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 11:48:25

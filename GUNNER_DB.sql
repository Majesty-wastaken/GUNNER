-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gunnerugdb
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartID`)
) ENGINE=InnoDB AUTO_INCREMENT=249914 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `CartItemID` int NOT NULL AUTO_INCREMENT,
  `CartID` int NOT NULL,
  `productSlug` varchar(255) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`CartItemID`),
  KEY `productSlug` (`productSlug`),
  KEY `fk_cartid` (`CartID`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`productSlug`) REFERENCES `products` (`slug`),
  CONSTRAINT `fk_cartid` FOREIGN KEY (`CartID`) REFERENCES `cart` (`cartID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_slug` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `payment_method` enum('credit_card','cod') NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','dispatched','delivered') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(255) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `ammo` varchar(255) DEFAULT NULL,
  `weight` decimal(6,2) DEFAULT NULL,
  `image` text,
  `favorited` enum('true','false') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('38 Special Blank Firing Replica Revolver 3\" Barrel 460','38-special-blank-firing-replica-revolver-3-barrel-black','This detective style snub nose blank firing revolver is similar to the gun style seen in so many movies. Perfect as a functional movie prop or starter pistol, this pistol will not let you down. The blank gun feature finger grooved polymer grips for comfort and function. The blank guns fires both single and double action. The Swing out cylinder holds 5 9mm revolver blanks.','Blank Firing Gun',106.99,1,'9MM REV/.380 R cal',2.00,'38-special-blank-firing-replica-revolver-3-barrel-black.jpg','false'),('38 Special Blank Firing Replica Revolver 3\" Barrel 460 NICKEL','38-special-blank-firing-replica-revolver-3-barrel-nickel','This detective style snub nose blank firing revolver is similar to the gun style seen in so many movies. Perfect as a functional movie prop or starter pistol, this pistol will not let you down. The blank gun feature finger grooved polymer grips for comfort and function. The blank guns fires both single and double action. The Swing out cylinder holds 5 9mm revolver blanks.','Blank Firing Gun',122.99,1,'9MM REV/.380 R cal',2.00,'38-special-blank-firing-replica-revolver-3-barrel-nickel.jpg','false'),('Dicle 8000 9mm Front Firing Blank Gun Semi Automatic - Chrome/Gold','dicle-8000-9mm-front-firing-blank-gun-semi-automatic-chrome-gold','We are happy to introduce the Dicle 8000 front firing blank gun model. This authentic, full sized, fully operative, front firing blank gun reproduction weighs and feels like the original. This front firing blank gun fires extra loud 9mm PA blanks in both single and double action. Load the 10 round clip, pull back the slide, and fire as fast as you can pull the trigger! It comes complete with one magazine and a hard shell carrying case and will hold (9) 9mm blanks in the magazine and (1) 9mm blank in the chamber.','Blank Firing Gun',134.99,1,'9MM PAK',1.90,'dicle-8000-9mm-front-firing-blank-gun-semi-automatic-chrome-gold.jpg','false'),('Kimar Double Action 209 Shotgun Primer Pistol PSTL, STARTER, 209 PRIMER 310.014','kimar-double-action-209-shotgun-primer-pistol-black','Chambered to fire convenient .209 shotgun primers, this pistol is build to work. The larger frame brings the heft and balance of a traditional pistol to this starter/training pistol. It holds 5 primers in the swing out cylinder. It features a 2\" barrel, assembled with black checkered composite grips and has a black gloss finish.','Blank Firing Gun',129.99,1,'209 Shotgun Primer',1.50,'kimar-double-action-209-shotgun-primer-pistol-black.jpg','false'),('Kimar Model 92 Front Firing Blank Gun 401.107','kimar-model-92-front-firing-blank-gun-black','The Deluxe 9mm front firing Semi-Auto M92 Pistol is modeled after the Beretta M9 pistol, which is the chosen pistol of the United States military. This front firing blank gun replica of the famous sidearm does justice to it\'s reputation, with smooth slide action and realistic weight and feel. Like the original, it is a semi-automatic pistol, which means once properly loaded, every squeeze of the trigger will cycle a round from the ejecting clip. It loads 9mm blank cartridges in a 11 round double lined magazine, which ensures that when it\'s fired, the look, feel, and sound will make you feel like you are firing the real thing. Manufactured with precision metal construction, this military classic fires single and double action. Release the clip, load the 9mm blanks, reload the clip, pull back the slide and commence firing. This front firing blank gun is as seen in the movies, TV, and used extensively in law enforcement training. Bonus: it comes with FREE foam lined carry case!','Blank Firing Gun',163.99,1,'9MM PAK',1.90,'kimar-model-92-front-firing-blank-gun-black.jpg','false');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-02  0:27:55

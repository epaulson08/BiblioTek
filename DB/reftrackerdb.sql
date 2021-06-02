-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reftrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `reftrackerdb` ;

-- -----------------------------------------------------
-- Schema reftrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reftrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `reftrackerdb` ;

-- -----------------------------------------------------
-- Table `author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author` ;

CREATE TABLE IF NOT EXISTS `author` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `middle_name` VARCHAR(45) NULL DEFAULT NULL,
  `suffix` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `journal` ;

CREATE TABLE IF NOT EXISTS `journal` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL DEFAULT NULL,
  `abbreviation` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `journal_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `journal_article` ;

CREATE TABLE IF NOT EXISTS `journal_article` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NULL DEFAULT NULL,
  `volume_num` INT(11) NULL DEFAULT NULL,
  `year_published` INT(11) NULL DEFAULT NULL,
  `doi` VARCHAR(500) NULL DEFAULT NULL,
  `journal_id` INT(11) NOT NULL,
  `pages` VARCHAR(45) NULL,
  `issue_num` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_journal_article_journal1_idx` (`journal_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `author_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author_article` ;

CREATE TABLE IF NOT EXISTS `author_article` (
  `journal_article_id` INT(11) NOT NULL,
  `author_id` INT(11) NOT NULL,
  PRIMARY KEY (`journal_article_id`, `author_id`),
  INDEX `fk_journal_article_has_author_author1_idx` (`author_id` ASC),
  INDEX `fk_journal_article_has_author_journal_article_idx` (`journal_article_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(200) NULL,
  `first_name` VARCHAR(200) NULL,
  `last_name` VARCHAR(200) NULL,
  `middle_name` VARCHAR(200) NULL,
  `role` VARCHAR(45) NULL,
  `localdate` DATE NULL,
  `enabled` TINYINT NULL,
  `create_date` DATETIME NULL,
  `update_date` DATETIME NULL,
  `dob` DATE NULL,
  `suffix` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_collection` ;

CREATE TABLE IF NOT EXISTS `my_collection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(2000) NULL,
  `description` TEXT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_collection_user1_idx` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag` ;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(200) NULL,
  `user_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tag_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag_article` ;

CREATE TABLE IF NOT EXISTS `tag_article` (
  `tag_id` INT NOT NULL,
  `journal_article_id` INT(11) NOT NULL,
  PRIMARY KEY (`tag_id`, `journal_article_id`),
  INDEX `fk_tag_has_journal_article_journal_article1_idx` (`journal_article_id` ASC),
  INDEX `fk_tag_has_journal_article_tag1_idx` (`tag_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_collection_journal_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_collection_journal_article` ;

CREATE TABLE IF NOT EXISTS `my_collection_journal_article` (
  `my_collection_id` INT NOT NULL,
  `journal_article_id` INT NOT NULL,
  PRIMARY KEY (`my_collection_id`, `journal_article_id`),
  INDEX `fk_article_collection_has_journal_article_journal_article1_idx` (`journal_article_id` ASC),
  INDEX `fk_article_collection_has_journal_article_article_collectio_idx` (`my_collection_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `citation_style`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `citation_style` ;

CREATE TABLE IF NOT EXISTS `citation_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `definitive_reference` VARCHAR(450) NULL,
  `definitive_reference_url` VARCHAR(450) NULL,
  `abbreviation` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `citation_style_link`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `citation_style_link` ;

CREATE TABLE IF NOT EXISTS `citation_style_link` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(450) NULL,
  `comment` VARCHAR(45) NULL,
  `citation_style_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_citation_style_link_citation_style1_idx` (`citation_style_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_citation_style`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_citation_style` ;

CREATE TABLE IF NOT EXISTS `user_citation_style` (
  `user_id` INT NOT NULL,
  `citation_style_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `citation_style_id`),
  INDEX `fk_user_has_citation_style_citation_style1_idx` (`citation_style_id` ASC),
  INDEX `fk_user_has_citation_style_user1_idx` (`user_id` ASC))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

-- -----------------------------------------------------
-- Data for table `author`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (1, '', 'et al', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (2, 'A', 'Aftkya', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (3, 'E', 'Rudnicka-Drozak', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (4, 'B', 'Ryobojad', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (5, 'J', 'Beitler', 'R', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (6, 'N', 'Link', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (7, 'D', 'Bails', 'B', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (8, 'K', 'Hurdle', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (9, 'D', 'Chong', 'H', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (10, 'J', 'Bannard-Smith', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (11, 'G', 'Lighthall', 'K', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (12, 'C', 'Subbe', 'P', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (13, 'L', 'Durham', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (14, 'J', 'Welch', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (15, 'R', 'Bellomo', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (16, 'Åsa', 'Askim', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (17, 'Florentin', 'Moser', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (18, 'Lise', 'Gustad', 'T', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (19, 'Helga', 'Stene', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (20, 'Maren', 'Gundersen', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (21, 'Bjørn', 'Åsvold', ' Olav', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (22, 'Jostein', 'Dale', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (23, 'Lars', 'Bjørnsen', 'Petter', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (24, 'Jan', 'Damås', 'Kristian', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (25, 'Erik', 'Solligård', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (26, 'Adam', 'Singer', 'J', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (27, 'Tassiopoulos', 'Apostolos', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (28, 'Robert', 'Kirsner', 'S', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (29, 'Peter', 'Calder', 'C', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (30, 'Gordon', 'Jensen', 'L', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (31, 'Berthold', 'Koletzko', 'V', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (32, 'Pierre', 'Singer', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (33, 'Geert', 'Wanten', 'J. A.', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (34, 'Bernard', 'Gordon', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (35, 'Tuyet', 'Abraham', 'Nguyen', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (36, 'Peter', 'Morawiecki', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (37, 'Amy', 'Flischel', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (38, 'Bharata', 'Agrawal', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (39, 'T', 'Song', 'Ted', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (40, 'Phil', 'Lieberman', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (41, 'Mohamed', 'Gad', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (42, 'Amit', 'Gupta', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (43, 'James', 'Thrall', 'H', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (44, 'Xiang', 'Li', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (45, 'Quanzheng', 'Li', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (46, 'Cinthia', 'Cruz', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (47, 'Synho', 'Do', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (48, 'Keith', 'Dreyer', '', '');
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (49, 'James', 'Brink', '', '');

COMMIT;


-- -----------------------------------------------------
-- Data for table `journal`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (1, 'New England Journal of Medicine', 'NEJM');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (2, 'British Journal of Medicine', 'BMJ');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (3, 'Perioperative Care and Operating Room Management', '');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (4, 'Resuscitation', '');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (5, 'Critical Care', '');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (6, 'Pediatric Critical Care Medicine', 'Pediatr Crit Care Med');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (7, 'European Journal of Oncology', 'Eur J Oncology');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (8, 'Journal of the American Medical Association', 'JAMA');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (9, 'Australian Critical Care', '');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (10, 'Scandanavian Journal of Trauma, Resuscitation and Emergency Medicine', '');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (11, 'Intensive Care Medicine', 'Intensive Care Med');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (12, 'Cleveland Clinic Journal of Medicine', 'Cleveland Clin J Med');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (13, 'Journal of the American College of Radiology', 'J Am Coll Radiol');

COMMIT;


-- -----------------------------------------------------
-- Data for table `journal_article`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (1, 'Reduction in hospital-wide mortality after implementation of a rapid response team: a long-term cohort study', 15, 2011, '', 5, 'R269', '6');
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (2, 'Clinical outcomes of patients seen by rapid response teams: a template for benchmarking international teams', 107, 2016, 'http://dx.doi.org/10.1016/j.resuscitation.2016.07.001', 4, '7-12', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (3, 'Poor performance of quick-SOFA (qSOFA) score in predicting severe sepsis and mortality – a prospective study of patients admitted with infection to the emergency department', 25, 2017, '10.1186/s13049-017-0399-4', 10, '', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (4, 'Evaluation and management of lower-extremity ulcers', 377, 2017, '10.1056/NEJMra1615243', 1, '1559-67', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (5, 'Lipid emulsions in parenteral nutrition of intensive care patients: current thinking and future directions', 36, 2010, '10.1007/s00134-009-1744-5', 11, '735-749', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (6, 'Acute lung failure--our evolving understanding of ARDS', 377, 2017, '10.1056/NEJMp1706595', 1, '507-509', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (7, 'Aleukemic leukemia cutis', 86, 2019, '10.3949/ccjm.86a.18057', 12, '85-86', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (8, 'Who needs to carry an epinephrine autoinjector?', 86, 2019, 'doi:10.3949/ccjm.86a.17123', 12, '66-72', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (9, 'Dancing sternal wires: a radiologic sign of sternal dehiscence', 86, 2019, 'doi:10.3949/ccjm.86a.18091', 12, '87-88', NULL);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`, `pages`, `issue_num`) VALUES (10, 'Artificial intelligence and machine learning in radiology: opportunities, challenges, pitfalls, and criteria for success', 15, 2018, 'https://doi.org/10.1016/j.jacr.2017.12.026', 13, '504-508', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `author_article`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (1, 4);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (1, 5);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (1, 6);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (1, 7);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (1, 8);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 9);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 10);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 11);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 12);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 13);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 14);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (2, 15);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 16);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 17);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 18);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 19);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 20);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 21);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 22);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 23);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 24);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (3, 25);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (4, 26);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (4, 27);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (4, 28);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (5, 29);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (5, 30);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (5, 31);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (5, 32);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (5, 33);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (6, 34);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (7, 35);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (7, 36);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (7, 37);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (7, 38);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (8, 39);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (8, 40);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (9, 41);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (9, 42);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 43);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 44);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 45);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 46);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 47);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 48);
INSERT INTO `author_article` (`journal_article_id`, `author_id`) VALUES (10, 49);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `middle_name`, `role`, `localdate`, `enabled`, `create_date`, `update_date`, `dob`, `suffix`) VALUES (1, 'testuser', 'wombat1', 'tester@test.com', 'Testy', 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `my_collection`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `my_collection` (`id`, `name`, `description`, `user_id`) VALUES (1, 'Rapid response paper', 'Articles for rapid response team review project, fall 2020', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `my_collection_journal_article`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `my_collection_journal_article` (`my_collection_id`, `journal_article_id`) VALUES (1, 1);
INSERT INTO `my_collection_journal_article` (`my_collection_id`, `journal_article_id`) VALUES (1, 2);
INSERT INTO `my_collection_journal_article` (`my_collection_id`, `journal_article_id`) VALUES (1, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `citation_style`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `citation_style` (`id`, `name`, `definitive_reference`, `definitive_reference_url`, `abbreviation`) VALUES (1, 'American Psychological Association', NULL, NULL, 'APA');
INSERT INTO `citation_style` (`id`, `name`, `definitive_reference`, `definitive_reference_url`, `abbreviation`) VALUES (2, 'American Medical Association', NULL, NULL, 'AMA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `citation_style_link`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `citation_style_link` (`id`, `url`, `comment`, `citation_style_id`) VALUES (1, 'https://owl.purdue.edu/owl/research_and_citation/ama_style/index.html', NULL, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_citation_style`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `user_citation_style` (`user_id`, `citation_style_id`) VALUES (1, 1);
INSERT INTO `user_citation_style` (`user_id`, `citation_style_id`) VALUES (1, 2);

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
-- Table `journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `journal` ;

CREATE TABLE IF NOT EXISTS `journal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL,
  `abbreviation` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journal_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `journal_article` ;

CREATE TABLE IF NOT EXISTS `journal_article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NULL,
  `volume_num` INT NULL,
  `year_published` INT NULL,
  `doi` VARCHAR(500) NULL,
  `journal_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_journal_article_journal1_idx` (`journal_id` ASC),
  CONSTRAINT `fk_journal_article_journal1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `journal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author` ;

CREATE TABLE IF NOT EXISTS `author` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `middle_name` VARCHAR(45) NULL,
  `suffix` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `author_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author_article` ;

CREATE TABLE IF NOT EXISTS `author_article` (
  `journal_article_id` INT NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`journal_article_id`, `author_id`),
  INDEX `fk_journal_article_has_author_author1_idx` (`author_id` ASC),
  INDEX `fk_journal_article_has_author_journal_article_idx` (`journal_article_id` ASC),
  CONSTRAINT `fk_journal_article_has_author_journal_article`
    FOREIGN KEY (`journal_article_id`)
    REFERENCES `journal_article` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_journal_article_has_author_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `author` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `journal`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (1, 'New England Journal of Medicine', 'NEJM');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (2, 'British Journal of Medicine', 'BMJ');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (3, 'Perioperative Care and Operating Room Management', NULL);
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (4, 'Resuscitation', NULL);
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (5, 'Critical Care', NULL);
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (6, 'Pediatric Critical Care Medicine', 'Pediatr Crit Care Med');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (7, 'European Journal of Oncology', 'Eur J Oncology');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (8, 'Journal of the American Medicine Association', 'JAMA');
INSERT INTO `journal` (`id`, `name`, `abbreviation`) VALUES (9, 'Australian Critical Care', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `journal_article`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`) VALUES (1, 'Reduction in hospital-wide mortality after implementation of a rapid response team: a lng-term cohort study.', 15, 2011, '', 5);
INSERT INTO `journal_article` (`id`, `title`, `volume_num`, `year_published`, `doi`, `journal_id`) VALUES (2, 'Clinical outcomes of patients seen by rapid response teams: a template for benchmarking international teams.', 107, 2016, 'http://dx.doi.org/10.1016/j.resuscitation.2016.07.001', 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `author`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (1, 'A', 'Aftkya', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (2, 'E', 'Rudnicka-Drozak', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (3, 'B', 'Ryobojad', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (4, 'J', 'Beitler', 'R', NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (5, 'N', 'Link', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (6, 'D', 'Bails', 'B', NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (7, 'K', 'Hurdle', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (8, 'D', 'Chong', 'H', NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (9, 'et al', NULL, NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (10, 'J', 'Bannard-Smith', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (11, 'G', 'Lighthall', 'K', NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (12, 'C', 'Subbe', 'P', NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (13, 'L', 'Durham', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (14, 'J', 'Welch', NULL, NULL);
INSERT INTO `author` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`) VALUES (15, 'R', 'Bellomo', NULL, NULL);

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

COMMIT;


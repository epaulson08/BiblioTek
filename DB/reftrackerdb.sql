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
  PRIMARY KEY (`id`),
  INDEX `fk_journal_article_journal1_idx` (`journal_id` ASC),
  CONSTRAINT `fk_journal_article_journal1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `journal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  INDEX `fk_journal_article_has_author_journal_article_idx` (`journal_article_id` ASC),
  CONSTRAINT `fk_journal_article_has_author_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `author` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_journal_article_has_author_journal_article`
    FOREIGN KEY (`journal_article_id`)
    REFERENCES `journal_article` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `article_collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `article_collection` ;

CREATE TABLE IF NOT EXISTS `article_collection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(2000) NULL,
  `description` TEXT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_collection_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_article_collection_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  INDEX `fk_tag_has_journal_article_tag1_idx` (`tag_id` ASC),
  CONSTRAINT `fk_tag_has_journal_article_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_has_journal_article_journal_article1`
    FOREIGN KEY (`journal_article_id`)
    REFERENCES `journal_article` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `article_article_collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `article_article_collection` ;

CREATE TABLE IF NOT EXISTS `article_article_collection` (
  `article_collection_id` INT NOT NULL,
  `journal_article_id` INT(11) NOT NULL,
  PRIMARY KEY (`article_collection_id`, `journal_article_id`),
  INDEX `fk_article_collection_has_journal_article_journal_article1_idx` (`journal_article_id` ASC),
  INDEX `fk_article_collection_has_journal_article_article_collectio_idx` (`article_collection_id` ASC),
  CONSTRAINT `fk_article_collection_has_journal_article_article_collection1`
    FOREIGN KEY (`article_collection_id`)
    REFERENCES `article_collection` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_collection_has_journal_article_journal_article1`
    FOREIGN KEY (`journal_article_id`)
    REFERENCES `journal_article` (`id`)
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
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`) VALUES (1, 'testuser', 'testuser', NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `article_collection`
-- -----------------------------------------------------
START TRANSACTION;
USE `reftrackerdb`;
INSERT INTO `article_collection` (`id`, `name`, `description`, `user_id`) VALUES (1, 'Rapid response paper', 'Articles for rapid response team review project', 1);

COMMIT;


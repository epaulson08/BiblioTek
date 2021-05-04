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


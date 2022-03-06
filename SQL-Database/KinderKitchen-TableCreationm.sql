CREATE TABLE `sp22_4398_tug61809`.`Accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `account_email` VARCHAR(45) NOT NULL,
  `account_password` VARCHAR(45) NOT NULL,
  `account_zipcode` VARCHAR(45) NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  UNIQUE INDEX `account_email_UNIQUE` (`account_email` ASC));


CREATE TABLE `sp22_4398_tug61809`.`Items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(45) NOT NULL,
  `expiration_date` DATE NOT NULL,
  `category_id` INT NULL,
  `account_id` INT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `Items-Account_idx` (`account_id` ASC),
  CONSTRAINT `Items-Account`
    FOREIGN KEY (`account_id`)
    REFERENCES `sp22_4398_tug61809`.`Accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `sp22_4398_tug61809`.`Categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_id`));


ALTER TABLE `sp22_4398_tug61809`.`Items` 
ADD INDEX `Items-Categoties_idx` (`category_id` ASC);
ALTER TABLE `sp22_4398_tug61809`.`Items` 
ADD CONSTRAINT `Items-Categoties`
  FOREIGN KEY (`category_id`)
  REFERENCES `sp22_4398_tug61809`.`Categories` (`category_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


INSERT INTO `sp22_4398_tug61809`.`Accounts` (`account_email`, `account_password`) VALUES ('test@kinderkitchen.com', 'abc123');

INSERT INTO `sp22_4398_tug61809`.`Categories` (`category_name`) VALUES ('Fridge');
INSERT INTO `sp22_4398_tug61809`.`Categories` (`category_name`) VALUES ('Pantry');

INSERT INTO `sp22_4398_tug61809`.`Items` (`item_name`, `expiration_date`, `category_id`, `account_id`) VALUES ('Milk', '2022-03-06', '1', '1');
INSERT INTO `sp22_4398_tug61809`.`Items` (`item_name`, `expiration_date`, `category_id`, `account_id`) VALUES ('Lucky Charms', '2022-03-17', '2', '1');
INSERT INTO `sp22_4398_tug61809`.`Items` (`item_name`, `expiration_date`, `category_id`, `account_id`) VALUES ('Eggs', '2022-04-20', '1', '1');
INSERT INTO `sp22_4398_tug61809`.`Items` (`item_name`, `expiration_date`, `category_id`, `account_id`) VALUES ('Goldfish', '2022-02-28', '2', '1');





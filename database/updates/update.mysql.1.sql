
-- Version 1

--
-- Table structure for table `signals`
--

CREATE TABLE `signals` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `provider` VARCHAR(36) NOT NULL,
  `user` VARCHAR(36) NOT NULL,
  `exchange` VARCHAR(50) NOT NULL,
  `stub` VARCHAR(50) NOT NULL,
  `symbol` VARCHAR(50) NOT NULL,
  `signal` VARCHAR(50) NOT NULL,
  `result` TINYINT NOT NULL,
  `message` TEXT NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE,
  INDEX `IDX_PROVIDER` (`provider` ASC) INVISIBLE,
  INDEX `IDX_USER` (`user` ASC) VISIBLE,
  INDEX `IDX_TIMESTAMP` (`timestamp` ASC) INVISIBLE,
  INDEX `IDX_RESULT` (`result` ASC) VISIBLE);



--
-- Update version
--

REPLACE INTO `settings` (`mainkey`, `subkey`, `value`) VALUES ('core', 'mysql:dbver', '2');
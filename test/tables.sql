SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Features;
DROP TABLE IF EXISTS Bugs;
DROP TABLE IF EXISTS employees_teams;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `Teams` (
`team_id` int(11) NOT NULL AUTO_INCREMENT,
`team_name` varchar(255) NOT NULL,
`daily_meeting_time` varchar(255) NOT NULL,
`meeting_location` varchar(255) NOT NULL,
`team_leader` int(11) DEFAULT NULL,
`feature` int(11),
PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Employees` (
`employee_id` int(11) NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
`email_address` varchar(255) NOT NULL,
`date_of_hire` DATE NOT NULL,
PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Features` (
`feature_id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) DEFAULT NULL,
`deadline` DATE DEFAULT NULL,
`status` int(11) NOT NULL,
`team` int(11),
PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Bugs` (
`bug_id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) NOT NULL,
`urgency` int(11) NOT NULL,
`complete` BOOLEAN NOT NULL DEFAULT 0,
`employee` int(11) DEFAULT NULL,
PRIMARY KEY (`bug_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `employees_teams` (
  `employee` INT NOT NULL,
  `team` INT NOT NULL,
  PRIMARY KEY(`employee`, `team`),
  FOREIGN KEY fk_emp(`employee`) REFERENCES `Employees` (`employee_id`)
  ON DELETE CASCADE,
  FOREIGN KEY fk_team(`team`) REFERENCES `Teams` (`team_id`)
  ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `Teams` 
ADD CONSTRAINT fk_teams_1
FOREIGN KEY (`team_leader`) REFERENCES `Employees` (`employee_id`)
ON DELETE CASCADE;

ALTER TABLE `Teams` 
ADD CONSTRAINT fk_teams_2
FOREIGN KEY (`feature`) REFERENCES `Features` (`feature_id`)
ON DELETE CASCADE;

ALTER TABLE `Features` 
ADD CONSTRAINT fk_feat_1
FOREIGN KEY (`team`) REFERENCES `Teams` (`team_id`)
ON DELETE CASCADE;

ALTER TABLE `Bugs` 
ADD CONSTRAINT fk_bugs_1
FOREIGN KEY (`employee`) REFERENCES `Employees` (`employee_id`)
ON DELETE CASCADE;

INSERT INTO `Employees` (`first_name`, `last_name`, `email_address`, `date_of_hire`) VALUES
('Donald', 'Taylor', 'taylordo@oregonstate.edu', '2021-02-08'),
('Chris', 'Peterman', 'petermac@oregonstate.edu', '2021-02-08'),
('Frank', 'Thomas', 'fthomas@email.com', '2021-02-08'),
('Eric', 'Johnson', 'ejohnson@email.com', '2021-02-08');

INSERT INTO `Features` (`description`, `status`, `deadline`, `team`) VALUES
('Create all the tables for our database', 1, '2021-02-14', NULL),
('Implement data manipulation from front end', 1, '2021-02-14', NULL);

INSERT INTO `Teams` (`team_name`, `daily_meeting_time`, `meeting_location`, `team_leader`, `feature`) VALUES
('Management', '6:15pm', 'Big Blue Button', NULL, NULL),
("Don's Team", '9:00am', "Don's Bedroom", 1, 1),
("Chris's Team", '8:00pm', "Chris's Place", 2, 2);

INSERT INTO `Bugs` (`description`, `urgency`, `complete`, `employee`) VALUES
('Nothing works!!!', 3, 0, 1),
("Other things also don't work!", 3, 0, 2);

INSERT INTO `employees_teams` (employee, team) VALUES
(1, 1), (2,1), (1,2), (2,2), (2,3), (4,3);

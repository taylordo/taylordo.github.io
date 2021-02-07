SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS bugs;
-- DROP TABLE IF EXISTS employee_teams;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `teams` (
`team_id` int(11) NOT NULL AUTO_INCREMENT,
`team_name` varchar(255) NOT NULL,
`daily_meeting_time` varchar(255) NOT NULL,
`meeting_location` varchar(255) NOT NULL,
`team_leader` int(11) DEFAULT NULL,
`feature` int(11) DEFAULT NULL,
PRIMARY KEY (`team_id`),
FOREIGN KEY (`team_leader`) REFERENCES `employees` (`employee_id`),
FOREIGN KEY (`feature`) REFERENCES `features` (`feature_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `employees` (
`employee_id` int(11) NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
`email_address` varchar(255) NOT NULL,
`date_of_hire` DATE NOT NULL,
PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `features` (
`feature_id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) DEFAULT NULL,
`deadline` DATE DEFAULT NULL,
`status` int(11) NOT NULL,
`team` varchar(255) NOT NULL,
PRIMARY KEY (`feature_id`),
FOREIGN KEY (`team`) REFERENCES `teams` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `bugs` (
`bug_id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) NOT NULL,
`urgency` int(11) NOT NULL,
`complete` BOOLEAN NOT NULL DEFAULT 0,
`team` varchar(255) NOT NULL,
`employee` int(11) DEFAULT NULL,
PRIMARY KEY (`feature_id`),
FOREIGN KEY (`employee`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- CREATE TABLE `employee_teams` (
-- I'm not sure how to implement this one yet.
--) ENGINE=InnoDB DEFAULT CHARSET=latin1;
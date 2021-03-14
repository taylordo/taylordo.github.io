--****************************
--Employee Queries
--****************************

--Get all Employees for the Employee list
SELECT * FROM Employees ORDER BY first_name;

--Add new Employee
INSERT INTO Employee (first_name, last_name, email_address, date_of_hire) VALUES (:first_name_input, :last_name_input, :email_address_input, :date_of_hire_input);

--Update Employee
UPDATE Employee SET first_name = :first_name_input, last_name= :last_name_input, email_address = :email_address_input, date_of_hire= :date_of_hire_input WHERE employee_id= :employee_id_from_the_employee_list;

--Delete Employee
DELETE FROM Employee WHERE employee_id = :employee_id_from_the_employee_list;

--****************************
--Teams Queries
--****************************

--Get all Teams for the Teams list
SELECT * FROM Teams ORDER BY team_name;

--Get employees for dropdown menus:
SELECT employee_id, first_name, last_name FROM Employees ORDER BY first_name;

--Add new Team
INSERT INTO Teams (team_name, daily_meeting_time, meeting_location, team_leader, feature) VALUES (:team_name_input, :daily_meeting_time_input, :meeting_location_input, :team_leader_input, :feature_input);

--Update Team
UPDATE Teams SET team_name = :team_name_input, daily_meeting_time= :daily_meeting_time_input, meeting_location = :meeting_location_input, team_leader= :team_leader_input WHERE team_id= :team_id_from_the_team_list;

--Delete Team
DELETE FROM Teams WHERE team_id = :team_id_from_the_team_list;

--Get all team members for a specific Team
SELECT first_name, last_name FROM employees_teams INNER JOIN Employees ON employees_teams.employee = Employees.employee_id WHERE team = :team_id_from_the_team_list;

--Add Team member
INSERT INTO employees_teams (employee, team) VALUES (:employee_id_input, :team_id_from_the_team_list);

--Delete Team member
DELETE FROM employees_teams WHERE employee = :employee_id_from_team_members_list AND team = team_id_from_the_team_list;

--****************************
--Bugs Queries
--****************************

-- Get all bugs in the list
SELECT * FROM Bugs; 

-- Get resolved bugs
SELECT * FROM Bugs WHERE complete = 1;

-- GET unresolved bugs
SELECT * FROM Bugs WHERE complete = 0;

-- Add new bug
INSERT INTO Bugs (description, urgency, complete, employee) VALUES (:description_of_issue, :urgency_level_number, :boolean_of_complete_default_0, :employee_id_from_employee_table_or_null);

-- Update bug
UPDATE Bugs SET description = :new_description, urgency = :new_urgency, employee = :new_employee_or_null WHERE bug_id = :bug_id_from_list;

-- Complete bug repair
UPDATE Bugs SET complete = :complete WHERE bug_id = :bug_id_from_list;

-- Delete bug
DELETE FROM Bugs WHERE bug_id = :bug_id_of_bug_to_be_deleted;

--****************************
--Features Queries
--****************************

--Get all features
SELECT * FROM Features;

--Get all Teams for Teams dropdown Menu
SELECT team_id, team_name FROM Teams ORDER BY team_name;

-- Add new features
INSERT INTO Features (description, deadline, status, team) VALUES (:description_of_feature, :date_to_complete, :current_status_of_project, :team_assigned_defaults_to_null);

-- Update feature
UPDATE Features SET description = :new_description, deadline = :new_deadline, status = :new_status, team = :new_team_or_null;

-- Delete feature
DELETE FROM Features WHERE feature_id = :feature_id_to_be_deleted;
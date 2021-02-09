--Get all Employees for the Employee list
SELECT * FROM Employees

--Add new Employee
INSERT INTO Employee (first_name, last_name, email_address, date_of_hire) VALUES (:first_name_input, :last_name_input, :email_address_input, :date_of_hire_input)

--Update Employee
UPDATE Employee SET first_name = :first_name_input, last_name= :last_name_input, email_address = :email_address_input, date_of_hire= :date_of_hire_input WHERE employee_id= :employee_id_from_the_employee_list

--Delete Employee
DELETE FROM Employee WHERE employee_id = :employee_id_from_the_employee_list

--Get all Teams for the Teams list
SELECT * FROM Teams

--Add new Team
INSERT INTO Teams (team_name, daily_meeting_time, meeting_location, team_leader) VALUES (:team_name_input, :daily_meeting_time_input, :meeting_location_input, :team_leader_input)

--Update Team
UPDATE Teams SET team_name = :team_name_input, daily_meeting_time= :daily_meeting_time_input, meeting_location = :meeting_location_input, team_leader= :team_leader_input WHERE team_id= :team_id_from_the_team_list

--Delete Team
DELETE FROM Teams WHERE team_id = :team_id_from_the_team_list

--Get all team members for a specific Team
SELECT first_name, last_name FROM employees_teams INNER JOIN Employees ON employees_teams.employee = Employees.employee_id WHERE team = :team_id_from_the_team_list;

--Add Team member
INSERT INTO employees_teams (employee, team) VALUES (:employee_id_input, :team_id_from_the_team_list)

--Delete Team member
DELETE FROM employees_teams WHERE employee = :employee_id_from_team_members_list AND team = team_id_from_the_team_list



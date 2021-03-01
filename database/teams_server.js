var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4757);
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

const getAllTeamsQuery = "SELECT * FROM Teams;"
const getAllEmployeesQuery = "SELECT employee_id, first_name, last_name FROM Employees;"
const getEmployeesByTeamQuery = "SELECT employee_id, first_name, last_name FROM employees_teams INNER JOIN Employees ON employees_teams.employee = Employees.employee_id WHERE team = ";

const insertNewTeamQuery = "INSERT INTO Teams (`team_name`, `daily_meeting_time`, `meeting_location`, `team_leader`) VALUES (?, ?, ?, ?)";
const insertNewMemberQuery = "INSERT INTO employees_teams (employee, team) VALUES (?,?)";

const deleteMemberQuery = "DELETE FROM employees_teams WHERE employee = ? AND team = ?"
const deleteTeamQuery = "DELETE FROM Teams WHERE team_id = ?"

const updateTeamQuery = "UPDATE Teams SET team_name = ?, daily_meeting_time= ?, meeting_location = ?, team_leader= ? WHERE team_id= ?"


const getAllTeams = (res, context, employees_teams_complete) => {
  mysql.pool.query(getAllTeamsQuery, (err, results, fields) => {
    if(err){
      next(err);
      return;
    }

    context.teams = results;
    employees_teams_complete();
  })
}

const getAllEmployees = (res, context, employees_teams_complete) => {
    mysql.pool.query(getAllEmployeesQuery, (err, results, fields) => {
      if(err){
        next(err);
        return;
      }
  
      context.employees = results;
      employees_teams_complete();
    })
  }

const getEmployeesByTeam = (res, team, complete) => {
    mysql.pool.query(getEmployeesByTeamQuery + team.team_id, (err, results, fields) => {
      if(err){
        next(err);
        return;
      }
  
      team.members = results;
      complete();
    })
  }

const getAllData = (res, next) => {
  var context = {};
  var callbackCount = 0;

  getAllTeams(res, context, employees_teams_complete);
  getAllEmployees(res, context, employees_teams_complete);
  
  function employees_teams_complete(){
      callbackCount++;
      if (callbackCount >= 2){
          for(i = 0; i < context.teams.length; i++){
              getEmployeesByTeam(res, context.teams[i], complete);
          }
      }
  }

  function complete(){
      callbackCount++;
      if(callbackCount >= 2 + context.teams.length){
          res.json(context)
      }
  }
  
}


//Initial Data Display
app.get('/',function(req,res,next){
    getAllData(res, next)
  });


//Insert New Team or Insert new team member

app.post('/',function(req,res,next){
    
    if (req.body.new_team == true){
      //submit new team
      var {team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input} = req.body;
      mysql.pool.query(insertNewTeamQuery, [team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input], function(err, result){
        if(err){
          next(err);
          return;
        }
        getAllData(res, next)
      });
    }
    else{
      //submit new team member to team
      var {employee_id_input, team_id_input} = req.body;
      mysql.pool.query(insertNewMemberQuery, [employee_id_input, team_id_input], function(err, result){
        if(err){
          next(err);
          return;
        }
        getAllData(res, next)
      });
    }

    
  });


//Delete Team or Team Member
app.delete('/',function(req,res,next){
    
  if (req.body.delete_member == true){
    //delete team member
    var {employee_id_input, team_id_input} = req.body;
    mysql.pool.query(deleteMemberQuery, [employee_id_input, team_id_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      getAllData(res, next)
    });
  }
  else{
    //delete team
    var {team_id_input} = req.body;
    mysql.pool.query(deleteTeamQuery, [team_id_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      getAllData(res, next)
    });
  }
  
});

//Update Team
app.put('/',function(req,res,next){
  console.log(req.body);
  
  var {team_id, team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input} = req.body;
  mysql.pool.query(updateTeamQuery, [team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input, team_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
  

});



app.use(function(req,res){
    res.status(404);
    console.log('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    console.log(err.status);
  });
  
  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });
var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4756);
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

const getAllTeamsQuery = "SELECT * FROM Teams;"
const getAllEmployeesQuery = "SELECT employee_id, first_name, last_name FROM Employees;"
const getEmployeesByTeamQuery = "SELECT employee_id, first_name, last_name FROM employees_teams INNER JOIN Employees ON employees_teams.employee = Employees.employee_id WHERE team = ";

const insertNewTeamQuery = "INSERT INTO Teams (`team_name`, `daily_meeting_time`, `meeting_location`, `team_leader`) VALUES (?, ?, ?, ?)";



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


//Initial Data Display
app.get('/',function(req,res,next){
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

  });


//Insert New Team

app.post('/',function(req,res,next){
    
    var {team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input} = req.body;
    mysql.pool.query(insertNewTeamQuery, [team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      
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
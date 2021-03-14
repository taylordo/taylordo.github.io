var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

//var router = express.Router();

var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4756);
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

//Employee Queries
const getAllEmployeesQuery = "SELECT * FROM Employees ORDER BY first_name;"
const insertEmployeeQuery = "INSERT INTO Employees (`first_name`, `last_name`, `email_address`, `date_of_hire`) VALUES (?, ?, ?, ?)";
const deleteEmployeeQuery = "DELETE FROM Employees WHERE employee_id = ?"
const updateEmployeeQuery = "UPDATE Employees SET first_name = ?, last_name= ?, email_address = ?, date_of_hire= ? WHERE employee_id= ?"

//Teams Queries
const getAllTeamsQuery = "SELECT * FROM Teams ORDER BY team_name;"
const getEmployeesQuery = "SELECT employee_id, first_name, last_name FROM Employees ORDER BY first_name;" 
const getEmployeesByTeamQuery = "SELECT employee_id, first_name, last_name FROM employees_teams INNER JOIN Employees ON employees_teams.employee = Employees.employee_id WHERE team = ? ORDER BY first_name";

const insertNewTeamQuery = "INSERT INTO Teams (`team_name`, `daily_meeting_time`, `meeting_location`, `team_leader`) VALUES (?, ?, ?, ?)";
const insertNewMemberQuery = "INSERT INTO employees_teams (employee, team) VALUES (?,?)";

const deleteMemberQuery = "DELETE FROM employees_teams WHERE employee = ? AND team = ?"
const deleteTeamQuery = "DELETE FROM Teams WHERE team_id = ?"

const updateTeamQuery = "UPDATE Teams SET team_name = ?, daily_meeting_time= ?, meeting_location = ?, team_leader= ? WHERE team_id= ?"

//Bugs Queries
const getAllBugsQuery = "SELECT * FROM Bugs;";
const insertBugQuery = "INSERT INTO Bugs (`description`, `urgency`, `complete`, `employee`) VALUES (?, ?, ?, ?)";
const deleteBugQuery = "DELETE FROM Bugs WHERE bug_id = ?";

//Features Queries
const getAllFeaturesQuery = "SELECT * FROM Features;";
const getTeamsQuery = "SELECT team_id, team_name FROM Teams ORDER BY team_name;"
const insertFeatureQuery = "INSERT INTO Features (`description`, `deadline`, `status`, `team`) VALUES (?, ?, ?, ?);";
const updateFeatureQuery = "UPDATE Features SET description = ?, deadline = ?, status = ?, team = ? WHERE feature_id = ? "
const deleteFeatureQuery = "DELETE FROM Features WHERE Feature_id = ?";



/* 
***********************************
EMPLOYEE ROUTE HANDLERS AND METHODS
***********************************
*/
const getAllData = (res) => {
  mysql.pool.query(getAllEmployeesQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
    res.json({"rows" : rows});
  })
}

//Initial Data Display
app.get('/employees',function(req,res,next){
  
    mysql.pool.query(getAllEmployeesQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
      getAllData(res)
    });
  });

//Insert New Employee
app.post('/employees',function(req,res,next){
    
    var {first_name_input, last_name_input, email_input, date_input} = req.body;
    mysql.pool.query(insertEmployeeQuery, [first_name_input, last_name_input, email_input, date_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      getAllData(res);
    });
    
  });

//Delete Employee
app.delete('/employees',function(req,res,next){
    
  employee_id = req.body.employee_id
  
  mysql.pool.query(deleteEmployeeQuery, [employee_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
  
});

//Update Employee
app.put('/employees',function(req,res,next){
    
  var {employee_id, first_name_input, last_name_input, email_input, date_input} = req.body;
  mysql.pool.query(updateEmployeeQuery, [first_name_input, last_name_input, email_input, date_input, employee_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
  
});
  
/* 
***********************************
TEAMS ROUTE HANDLERS AND METHODS
***********************************
*/

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
    mysql.pool.query(getEmployeesQuery, (err, results, fields) => {
      if(err){
        next(err);
        return;
      }
  
      context.employees = results;
      employees_teams_complete();
    })
  }

const getEmployeesByTeam = (res, team, complete) => {
    mysql.pool.query(getEmployeesByTeamQuery, [team.team_id], (err, results, fields) => {
      if(err){
        next(err);
        return;
      }
  
      team.members = results;
      complete();
    })
  }

const getAllTeamData = (res, next) => {
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
app.get('/teams',function(req,res,next){
    getAllTeamData(res, next)
  });


//Insert New Team or Insert new team member

app.post('/teams',function(req,res,next){
    
    if (req.body.new_team == true){
      //add new team
      var {team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input} = req.body;
      
      if (team_leader_input == 'null'){
        team_leader_input = null
      }

      mysql.pool.query(insertNewTeamQuery, [team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input], function(err, result){
        if(err){
          next(err);
          return;
        }
        getAllTeamData(res, next)
      });
    }
    else{
      //add new team member to team
      var {employee_id_input, team_id_input} = req.body;
      mysql.pool.query(insertNewMemberQuery, [employee_id_input, team_id_input], function(err, result){
        if(err){
          next(err);
          return;
        }
        getAllTeamData(res, next)
      });
    }

    
  });


//Delete Team or Team Member
app.delete('/teams',function(req,res,next){
    
  if (req.body.delete_member == true){
    //delete team member
    var {employee_id_input, team_id_input} = req.body;
    mysql.pool.query(deleteMemberQuery, [employee_id_input, team_id_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      getAllTeamData(res, next)
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
      getAllTeamData(res, next)
    });
  }
  
});

//Update Team
app.put('/teams',function(req,res,next){
  
  var {team_id, team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input} = req.body;

  if (team_leader_input == 'null'){
    team_leader_input = null
  }


  mysql.pool.query(updateTeamQuery, [team_name_input, daily_meeting_time_input, meeting_location_input, team_leader_input, team_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllTeamData(res);
  });
  

});

/* 
***********************************
BUGS ROUTE HANDLERS AND METHODS
***********************************
*/
const getAllBugsData = (res, rows, employees) => {
  res.json({"rows" : rows, "employees" : employees});
}

//Initial Data Display
app.get('/bugs',function(req,res,next){
  var context = {};

  mysql.pool.query(getAllBugsQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getEmployeesQuery, (err, employees, fields) => {
    if(err) {
      next(err);
      return;
    }

  getAllBugsData(res, rows, employees)
  })
  });
});

//Insert New Bug
app.post('/bugs',function(req,res,next){

var {new_description_input, new_urgency_input, new_completion_input, new_employee_input} = req.body;

if (new_employee_input == 'null'){
  new_employee_input = null
}

mysql.pool.query(insertBugQuery, [new_description_input, new_urgency_input, new_completion_input, new_employee_input], function(err, result){
  if(err){
    next(err);
    return;
  }
  
  mysql.pool.query(getAllBugsQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getEmployeesQuery, (err, employees, fields) => {
    if(err) {
      next(err);
      return;
    }

  getAllBugsData(res, rows, employees)
  })
  });   
});
});

//Update Bug
app.put('/bugs', function(req, res, next){

const sizeOf = Object.keys(req.body).length;

let queryText;
let queryParams;

if (sizeOf > 2) {
var description = req.body.description;
var urgency = req.body.urgency;
var employee = req.body.employee;
var bug_id = req.body.bug_id;

if (employee == 'null'){
  employee = null
}

queryText = `UPDATE Bugs SET description = ?, urgency = ?, employee = ? WHERE bug_id = ?;`
queryParams = [description, urgency, employee, bug_id]
} else {
  const resolved = req.body.resolved;
  const bug_id = req.body.bug_id;
  queryText = `UPDATE Bugs SET complete = ? WHERE bug_id = ?`;
  queryParams = [resolved, bug_id];
}

mysql.pool.query(queryText, queryParams, function(err, result) {
  if(err){
    next(err);
    return;
  }

  mysql.pool.query(getAllBugsQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getEmployeesQuery, (err, employees, fields) => {
    if(err) {
      next(err);
      return;
    }

  getAllBugsData(res, rows, employees)
  })
  });

});

})

//Delete Bug
app.delete('/bugs', function(req, res, next) {

const bug_id = req.body.bug_id

mysql.pool.query(deleteBugQuery, [bug_id], function(err, result) {
  if(err) {
    next(err);
    return;
  }
  mysql.pool.query(getAllBugsQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getEmployeesQuery, (err, employees, fields) => {
    if(err) {
      next(err);
      return;
    }

  getAllBugsData(res, rows, employees)
  })

  });
})
})

/* 
***********************************
FEATURES ROUTE HANDLERS AND METHODS
***********************************
*/
const getAllFeaturesData = (res, rows, team) => {
  res.json({"rows" : rows, "team" : team});
}

//Initial Data Display
app.get('/features',function(req,res,next){
  var context = {};

  mysql.pool.query(getAllFeaturesQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getTeamsQuery, (err, team, fields) => {
    if(err){
      next(err);
      return;
    }

    getAllFeaturesData(res, rows, team)
  })
  });
});

//Insert New Feature
app.post('/features',function(req,res,next){

  var description = req.body.description;
  var date = req.body.date;
  var status = req.body.status;
  var team = req.body.team;
  var feature_id = req.body.feature_id;

  if (team == 'null'){
    team = null
  }

  mysql.pool.query(insertFeatureQuery, [description, date, status, team, feature_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query(getAllFeaturesQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
      mysql.pool.query(getTeamsQuery, (err, team, fields) => {
        if(err){
          next(err);
          return;
        }

        getAllFeaturesData(res, rows, team)
      })
    });
  });

});

//Update Feature
app.put('/features', function(req, res, next) {

var description = req.body.description;
var date = req.body.date;
var status = req.body.status;
var team = req.body.team;
var feature_id = req.body.feature_id;

if (team == 'null'){
  team = null
}

mysql.pool.query(updateFeatureQuery, [description, date, status, team, feature_id], function(err, result) {
  if(err){
    next(err);
    return;
  }
  mysql.pool.query(getAllFeaturesQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getTeamsQuery, (err, team, fields) => {
    if(err){
      next(err);
      return;
    }

    getAllFeaturesData(res, rows, team)
  })
});
})
})

//Delete Feature
app.delete('/features', function(req, res, next) {

const feature_id = req.body.feature_id;

mysql.pool.query(deleteFeatureQuery, [feature_id], function(err, result){
  if(err){
    next(err);
    return;
  }
  mysql.pool.query(getAllFeaturesQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
  mysql.pool.query(getTeamsQuery, (err, team, fields) => {
    if(err){
      next(err);
      return;
    }

    getAllFeaturesData(res, rows, team)
  })
});
});

})


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
    


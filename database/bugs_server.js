var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4759); 
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

const getAllQuery = "SELECT * FROM Bugs;";
const getEmpQuery = "SELECT employee_id, first_name, last_name FROM Employees;"
const insertQuery = "INSERT INTO Bugs (`description`, `urgency`, `complete`, `employee`) VALUES (?, ?, ?, ?)";
const deleteQuery = "DELETE FROM Bugs WHERE bug_id = ?";

const getAllData = (res, rows, employees) => {
    res.json({"rows" : rows, "employees" : employees});
}

app.get('/',function(req,res,next){
    var context = {};
  
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getEmpQuery, (err, employees, fields) => {
      if(err) {
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, employees)
    })
    });
  });

  //Insert New Bug
app.post('/',function(req,res,next){

  console.log(req.body)

  //var context = {};
  
  var {new_description_input, new_urgency_input, new_completion_input, new_employee_input} = req.body;
  
  mysql.pool.query(insertQuery, [new_description_input, new_urgency_input, new_completion_input, new_employee_input], function(err, result){
    if(err){
      next(err);
      return;
    }
    
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getEmpQuery, (err, employees, fields) => {
      if(err) {
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, employees)
    })
    });   
  });
});

app.put('/', function(req, res, next){
  console.log(Object.keys(req.body).length);
  const sizeOf = Object.keys(req.body).length;

  let queryText;
  let queryParams;

  if (sizeOf > 2) {
  const description = req.body.description;
  const urgency = req.body.urgency;
  const employee = req.body.employee;
  const bug_id = req.body.bug_id;

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

    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getEmpQuery, (err, employees, fields) => {
      if(err) {
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, employees)
    })
    });

  });

})

app.delete('/', function(req, res, next) {
  console.log(req.body)

  const bug_id = req.body.bug_id

  mysql.pool.query(deleteQuery, [bug_id], function(err, result) {
    if(err) {
      next(err);
      return;
    }
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getEmpQuery, (err, employees, fields) => {
      if(err) {
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, employees)
    })

    });
  })
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
  
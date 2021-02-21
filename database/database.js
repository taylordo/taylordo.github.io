var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4756);
app.use("/public_html", express.static('../../../public_html/'));
app.use(CORS())

const getAllQuery = "SELECT * FROM Bugs;";
const insertQuery = "INSERT INTO Bugs (`description`, `urgency`, `complete`, `employee`) VALUES (?, ?, ?, ?)";

const getAllData = (res) => {
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
    res.json({"rows" : rows});
  })
}

app.get('/',function(req,res,next){
    var context = {};
  
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res)
    });
  });

  //Insert New Bug
app.post('/',function(req,res,next){

  console.log(req.body)

  //var context = {};
  
  var {new_description_input, new_urgency_input, new_completion_input, new_employee_input} = req.body;
  console.log(new_description_input)
  console.log(new_urgency_input)
  console.log(new_completion_input)
  console.log(new_employee_input)
  mysql.pool.query(insertQuery, [new_description_input, new_urgency_input, new_completion_input, new_employee_input], function(err, result){
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
  
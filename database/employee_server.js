var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var router = express.Router();

var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));
//app.set('port', 4756);
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())


const getAllQuery = "SELECT * FROM Employees;"
const insertQuery = "INSERT INTO Employees (`first_name`, `last_name`, `email_address`, `date_of_hire`) VALUES (?, ?, ?, ?)";
const deleteQuery = "DELETE FROM Employees WHERE employee_id = ?"
const updateQuery = "UPDATE Employees SET first_name = ?, last_name= ?, email_address = ?, date_of_hire= ? WHERE employee_id= ?"

const getAllData = (res) => {
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
    res.json({"rows" : rows});
    //res.send('???')
  })
}

//Initial Data Display
router.get('/employees',function(req,res,next){
    var context = {};
    res.sendFile(path.join(__dirname + '/index.html'));
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res)
    });
  });

//Insert New Employee
app.post('/',function(req,res,next){
    
    var {first_name_input, last_name_input, email_input, date_input} = req.body;
    mysql.pool.query(insertQuery, [first_name_input, last_name_input, email_input, date_input], function(err, result){
      if(err){
        next(err);
        return;
      }
      getAllData(res);
    });
    
  });

//Delete Employee
app.delete('/',function(req,res,next){
    
  employee_id = req.body.employee_id
  
  mysql.pool.query(deleteQuery, [employee_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
  
});

//Update Employee
app.put('/',function(req,res,next){
    
  var {employee_id, first_name_input, last_name_input, email_input, date_input} = req.body;
  mysql.pool.query(updateQuery, [first_name_input, last_name_input, email_input, date_input, employee_id], function(err, result){
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
  
  /*
  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });
    */

module.exports = router;
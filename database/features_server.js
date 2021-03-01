var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4760); //4758
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

const getAllQuery = "SELECT * FROM Features;";
const getTeamQuery = "SELECT team_id, team_name FROM Teams;"
const insertQuery = "INSERT INTO Features (`description`, `deadline`, `status`, `team`) VALUES (?, ?, ?, ?);";
const updateQuery = "UPDATE Features SET description = ?, deadline = ?, status = ?, team = ? WHERE feature_id = ? "
const deleteQuery = "DELETE FROM Features WHERE Feature_id = ?";

const getAllData = (res, rows, team) => {
    res.json({"rows" : rows, "team" : team});
}

app.get('/',function(req,res,next){
    var context = {};
  
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getTeamQuery, (err, team, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, team)
    })
    });
  });

  //Insert New Bug
app.post('/',function(req,res,next){

  //var context = {};
  
  const description = req.body.description;
  const date = req.body.date;
  const status = req.body.status;
  const team = req.body.team;
  const feature_id = req.body.feature_id;

  console.log(team);

  mysql.pool.query(insertQuery, [description, date, status, team, feature_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getTeamQuery, (err, team, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, team)
    })
  });
});
  
});

app.put('/', function(req, res, next) {

  console.log(req.body)

  const description = req.body.description;
  const date = req.body.date;
  const status = req.body.status;
  const team = req.body.team;
  const feature_id = req.body.feature_id;

  mysql.pool.query(updateQuery, [description, date, status, team, feature_id], function(err, result) {
    if(err){
      next(err);
      return;
    }
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getTeamQuery, (err, team, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, team)
    })
  });
  })
})

app.delete('/', function(req, res, next) {

  const feature_id = req.body.feature_id;

  mysql.pool.query(deleteQuery, [feature_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
    mysql.pool.query(getTeamQuery, (err, team, fields) => {
      if(err){
        next(err);
        return;
      }
    //   context.results = JSON.stringify(rows);
      getAllData(res, rows, team)
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
  
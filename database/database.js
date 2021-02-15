var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('port', 4756);
app.use("/public_html", express.static('../../public_html/'));
app.use(CORS())

const getAllQuery = "SELECT * FROM Bugs;"

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
  
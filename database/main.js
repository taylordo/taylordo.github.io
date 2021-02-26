var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var router = express.Router();

var CORS = require('cors')

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use('/public_html', express.static('../../public_html/'));
app.use(CORS())
//app.set('view engine', 'html');
app.set('port', 4756);
app.set('mysql', mysql);

//app.use('/employees', require('./employee_server.js'));
//app.use('/teams', require('./teams_server.js'));
//app.use('/features', require('./feature_server.js'));
//app.use('/bugs', require('./bugs_server.js'));

/*
app.get('/employees', function(req, res){
  res.send('employees.html')
  
});
*/

router.get('/employees', function(req, res, next){
  res.send('Hello Employees');
})


/*
app.use(function(req,res){
  res.status(404);
  console.log(404)
  
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  console.log(500)
});
*/

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_taylordo',
  password        : '8706',
  database        : 'cs340_taylordo'
});

module.exports.pool = pool;

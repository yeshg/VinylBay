var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_bagchia',
  password        : '5203',
  database        : 'cs340_bagchia'
});

module.exports.pool = pool;
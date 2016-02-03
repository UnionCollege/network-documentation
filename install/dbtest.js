var mysql = require('mysql')
var config = require('./../config.js')

var connection = mysql.createConnection({
  host: config.mariadb.host,
  user: config.mariadb.user,
  password: config.mariadb.pass,
  database: config.mariadb.db
})

connection.connect(function (err) {
  if (err) {
    console.error('[sql] error connecting: ' + err.stack)
    return
  }
  console.log('[sql] connected as id ' + connection.threadId)
})

connection.query('SHOW TABLES', function (err, result, fields) {
  if (err) {
    throw err
  }
  console.log(result)
})

connection.end()

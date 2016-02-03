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

// Create table: panel_ports
connection.query('CREATE TABLE IF NOT EXISTS panel_ports(id INT NOT NULL AUTO_INCREMENT, port VARCHAR(3) NOT NULL, destination VARCHAR(15) DEFAULT NULL, PRIMARY KEY(id))', function (err, result, fields) {
  if (err) {
    throw err
  }
})

// Create table: node_panel
connection.query('CREATE TABLE IF NOT EXISTS node_panel(node VARCHAR(2) NOT NULL, panel VARCHAR(2) NOT NULL, panel_id INT(11) NOT NULL, PRIMARY KEY(node, panel), FOREIGN KEY(panel_id) REFERENCES panel_ports(id))', function (err, result, fields) {
  if (err) {
    throw err
  }
})

// Create table: switch_details
connection.query('CREATE TABLE IF NOT EXISTS switch_details(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(10), ip VARCHAR(16), mac VARCHAR(16), PRIMARY KEY(id))', function (err, result, fields) {
  if (err) {
    throw err
  }
})

// Create table: switch_ports
connection.query('CREATE TABLE IF NOT EXISTS switch_ports(id INT NOT NULL AUTO_INCREMENT, panel INT, switch INT, switch_port VARCHAR(5), PRIMARY KEY(id), FOREIGN KEY(panel) REFERENCES panel_ports(id), FOREIGN KEY(switch) REFERENCES switch_details(id))', function (err, result, fields) {
  if (err) {
    throw err
  }
})

// Create table: alpha
connection.query('CREATE TABLE IF NOT EXISTS alpha(letter VARCHAR(1) NOT NULL, phonetic VARCHAR(15), PRIMARY KEY(letter))', function (err, result, fields) {
  if (err) {
    throw err
  }
})

connection.query('SHOW TABLES', function (err, result, fields) {
  if (err) {
    throw err
  }
  console.log(result)
})

connection.end()

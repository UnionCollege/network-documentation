var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config.js')
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.mariadb.host,
    user: config.mariadb.user,
    password: config.mariadb.pass,
    database: config.mariadb.db,
    charset: 'utf8'
  }
})
var Bookshelf = require('bookshelf')(knex)


var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/netdoc')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('[mongoose] connected to mongodb://localhost/netdoc')
})

var app = express()
var routes = require('./routes/')

app.set('view engine', 'jade')
app.set('port', config.port)
app.set('ip', process.env.IP || 'localhost')

app.use(express.static('public'))
app.locals.sitename = config.sitename
app.locals.source_url = 'https://github.com/UnionCollege/network-documentation'

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(routes)

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})

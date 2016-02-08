var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config.js')

var mongoose = require('mongoose')
mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.db)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('[mongoose] connected to mongodb://' + config.mongo.host + '/' + config.mongo.db)
})

var app = express()
var routes = require('./routes/')

app.set('view engine', 'jade')
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || 'localhost')

app.use(express.static('public'))
app.locals.sitename = 'Network Docs'
app.locals.source_url = 'https://github.com/UnionCollege/network-documentation'

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(routes)

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})

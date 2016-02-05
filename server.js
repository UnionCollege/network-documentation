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

// Models
var switch_detailsModel = Bookshelf.Model.extend({
  tableName: 'switch_details'
})
var apsModel = Bookshelf.Model.extend({
  tableName: 'access_points'
})
var alphaModel = Bookshelf.Model.extend({
  tableName: 'alpha'
})
var panel_portsModel = Bookshelf.Model.extend({
  tableName: 'panel_ports'
})
var node_panelModel = Bookshelf.Model.extend({
  tableName: 'node_panel',
  panel_id: function () {
    return this.hasMany(panel_portsModel, 'id')
  }
})
var switch_portsModel = Bookshelf.Model.extend({
  tableName: 'switch_ports',
  panel: function () {
    return this.belongsTo(panel_portsModel, 'id')
  },
  switch: function () {
    return this.hasOne(switch_detailsModel, 'id')
  }
})

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
  extended: true
}))
app.use(bodyParser.json())

/*
var apsCollection = Bookshelf.Collection.extend({
  model: apsModel
})
var alphaCollection = Bookshelf.Collection.extend({
  model: alphaModel
})
var panel_portsCollection = Bookshelf.Collection.extend({
  model: panel_portsModel
})
var node_panelCollection = Bookshelf.Collection.extend({
  model: node_panelModel
})
var switch_portsCollection = Bookshelf.Collection.extend({
  model: switch_portsModel
})
var switch_detailsCollection = Bookshelf.Collection.extend({
  model: switch_detailsModel
})
*/

app.use(routes)

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})

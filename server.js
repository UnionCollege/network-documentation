var express = require('express')

var app = express()
var routes = require('./routes/')

app.set('view engine', 'jade')
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || 'localhost')

app.use(express.static('public'))
app.locals.sitename = 'Network Documentation'
app.locals.source_url = 'https://github.com/UnionCollege/network-documentation'

app.use(routes)

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s%s', address.address, address.port)
})

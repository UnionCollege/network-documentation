var express = require('express')
var router = module.exports = express.Router()

router.get('/', function (req, res) {
  return res.render('index')
})

router.use(require('./network'))

router.get('/phone', function (req, res) {
  return res.render('phone')
})

router.use(require('./misc'))

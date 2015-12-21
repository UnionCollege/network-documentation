var express = require('express')
var router = module.exports = express.Router()

router.get('/', function (req, res) {
  return res.render('index')
})

router.get('/network', function (req, res) {
  return res.render('network')
})

router.get('/phone', function (req, res) {
  return res.render('phone')
})

router.get('/misc', function (req, res) {
  return res.render('misc')
})

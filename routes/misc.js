var express = require('express')
var router = module.exports = express.Router()

router.get('/misc', function (req, res) {
  return res.render('misc')
})

router.get('/misc/nato', function (req, res) {
  return res.render('misc/nato')
})

router.get('/misc/drives', function (req, res) {
  return res.render('misc/drives')
})

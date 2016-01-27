var express = require('express')
var router = module.exports = express.Router()

var AlphaDB = require('./../models/alpha.js')

// router.use(require('./auth'))

router.get('/', function (req, res) {
  return res.render('index')
})

router.use(require('./network'))

router.get('/phone', function (req, res) {
  return res.render('phone')
})

// Miscellaneous
router.get('/misc', function (req, res, next) {
  AlphaDB.find().sort('letter').exec(function (err, alphas) {
    if (err) {
      return next(err)
    }
    res.render('misc', {
      alpha: alphas
    })
  })
})

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About'
  })
})

// router.use(require('./error'))

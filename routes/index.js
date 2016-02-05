var express = require('express')
var router = module.exports = express.Router()

var AlphaDB = require('./../models/alpha.js')

// router.use(require('./auth'))

router.get('/', function (req, res) {
  return res.render('index')
})

router.use(require('./network/aps.js'))
router.use(require('./network/map.js'))
router.use(require('./network/patch.js'))

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

// 404 handler
router.use(function (req, res) {
  console.warn('404 Not Found: %s', req.originalUrl)
  res.status(404).render('error', {
    title: '404 Error',
    message: 'Page not found'
  })
})

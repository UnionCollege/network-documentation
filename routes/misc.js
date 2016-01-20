var express = require('express')
var router = module.exports = express.Router()

var AlphaDB = require('./../models/alpha.js')

router.get('/misc/drives', function (req, res) {
  return res.render('misc/drives')
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

router.get('/misc/drives', function (req, res, next) {
  res.render('misc/drives', {
    title: 'Network Drives'
  })
})

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About'
  })
})

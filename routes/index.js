var express = require('express')
// var mssql = require('mssql')
// var config = require('../config.js')
var router = module.exports = express.Router()

var AlphaDB = require('./../models/alpha.js')

// router.use(require('./auth'))

router.get('/', function (req, res) {
  res.render('index')
})

router.use(require('./network.js'))

router.use(require('./phone.js'))

router.get('/computers', function (req, res) {
  /*
  mssql.connect('mssql://' + config.mssql.user + ':' + config.mssql.pass + '@' + config.mssql.host + '/' + config.mssql.db).then(function () {
    new mssql.Request().query('select * from mytable').then(function (recordset) {
      console.log(recordset)
    }).catch(function (err) {
      console.warn(err)
    })
  }).catch(function (err) {
    console.warn(err)
  })
  */
  res.render('computers', {
    title: 'Computers'
  })
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

// 404 handler
router.use(function (req, res) {
  console.warn('404 Not Found: %s', req.originalUrl)
  res.status(404).render('error', {
    title: '404 Error',
    message: 'Page not found'
  })
})

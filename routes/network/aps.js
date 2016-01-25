var express = require('express')
var ApsDB = require('./../../models/aps.js')

var router = module.exports = express.Router()

router.get('/network/aps', function (req, res, next) {
  ApsDB.find().sort({'name': 1}).exec(function (err, ap) {
    if (err) {
      return next(err)
    }
    res.render('network/aps', {
      title: 'Access Points',
      aps: ap
    })
  })
})

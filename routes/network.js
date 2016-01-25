var express = require('express')
var PatchDB = require('./../models/patch.js')
var ApsDB = require('./../models/aps.js')
var router = module.exports = express.Router()

/*
function pad (num) {
  var size = 2
  var s = '000000000' + num
  return s.substr(s.length - size)
}
*/

router.get('/network', function (req, res) {
  return res.render('network')
})

router.get('/network/switch', function (req, res) {
  return res.render('network/switch')
})

router.get('/network/patch', function (req, res, next) {
  PatchDB.find().sort({'node': 1, 'panel': 1}).exec(function (err, pa) {
    if (err) {
      return next(err)
    }
    pa.forEach(function (panel) {
      panel.port.sort(function (a, b) {
        return a.num - b.num
      })
    })
    res.render('network/patch', {
      title: 'Patch Panels',
      patch: pa
    })
  })
})

router.use(require('./dynamic/patch.js'))

router.get('/network/server', function (req, res, next) {
  res.render('network/server', {
    title: 'Servers',
    servers: [{
      name: 'UCC1',
      ip: '10.2.2.42',
      network: 'Server',
      os: 'Windows Server 2012 R2 Datacenter',
      sw: {
        name: 'ph142',
        port: 'a33'
      }
    }]
  })
})

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

// Phone
router.get('/phone', function (req, res, next) {
  res.render('phone', {
    title: 'Phones'
  })
})

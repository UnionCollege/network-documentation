var express = require('express')
var router = module.exports = express.Router()

router.get('/network', function (req, res) {
  return res.redirect('/')
})

router.get('/network/switch', function (req, res) {
  return res.render('network/switch')
})

router.use(require('./network/patch.js'))

router.get('/servers', function (req, res, next) {
  res.render('servers', {
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

router.use(require('./network/aps.js'))

// Phone
router.get('/phone', function (req, res, next) {
  res.render('phone', {
    title: 'Phones'
  })
})

var express = require('express')
var router = module.exports = express.Router()

router.get('/network', function (req, res) {
  return res.render('network')
})

router.get('/network/switch', function (req, res) {
  return res.render('network/switch')
})

router.get('/network/patch', function (req, res) {
  return res.render('network/patch')
})

router.get('/network/server', function (req, res) {
  return res.render('network/server', {
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

router.get('/network/wap', function (req, res) {
  return res.render('network/wap')
})

var express = require('express')
var ApsDB = require('./../../models/aps.js')

var router = module.exports = express.Router()

router.get('/network/aps', function (req, res, next) {
  ApsDB.find().sort({'name': 1}).exec(function (err, ap) {
    if (err) {
      return next(err)
    }
    res.render('network/aps', {
      title: 'Wireless Access Points',
      aps: ap
    })
  })
})

router.get('/network/aps/add', function (req, res, next) {
  res.render('network/add/aps', {
    title: 'Add Access Point'
  })
})

router.get('/network/aps/:name', function (req, res, next) {
  console.log('Editing ' + req.params.name)
  ApsDB.findOne({'name': req.params.name}, function (err, aps) {
    if (err) {
      console.warn(err)
    } if (aps) {
      console.log(aps)
      res.render('network/add/aps', {
        title: 'Editing ' + aps.name,
        apdetail: {
          name: aps.name,
          mac: aps.mac,
          swname: aps.sw.name,
          swport: aps.sw.port
        },
        id1: true,
        path: req.path
      })
    } else {
      res.render('error', {
        title: 'Access Point Not Found',
        notification: {
          title: 'Access Point Not Found',
          severity: 'danger',
          message: req.params.name + ' does not exist. Here is a kitten instead.'
        }
      })
    }
  })
})

router.post('/network/aps/add', saveAP)
router.post('/network/aps/:name', saveAP)

function saveAP (req, res, next) {
  if (req.body.action === 'delete') {
    return deleteAP(req, res, next)
  }

  var name = (req.body.name) ? req.body.name : req.params.name
  var mac = (req.body.mac) ? req.body.mac : req.params.mac
  var swname = req.body.swname
  var swport = req.body.swport

  ApsDB.findOne({name: name}, function (err, aps) {
    if (err) {
      return next(err)
    }
    if (!aps) {
      aps = new ApsDB()
    }
    aps.name = name
    aps.mac = mac
    aps.sw.name = swname
    aps.sw.port = swport
    aps.save()
    res.redirect('/network/aps')
  })
}

function deleteAP (req, res, next) {
  var name = (req.body.name) ? req.body.name : req.params.name
  ApsDB.findOne({name: name}, function (err, aps) {
    if (err) {
      console.warn(err)
    }
    aps.remove()
  })
  res.redirect('/network/aps')
}

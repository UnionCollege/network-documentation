var express = require('express')
var router = module.exports = express.Router()
var PhoneDB = require('./../models/phone.js')

router.get('/phone', function (req, res) {
  PhoneDB.find().sort('arial').exec(function (err, arials) {
    if (err) {
      console.warn(err)
    }
    res.render('phone', {
      title: 'Phones',
      arial: arials
    })
  })
})

router.get('/phone/add', function (req, res) {
  res.render('phoneAdd', {
    title: 'Add Phone'
  })
})

router.get('/phone/:id', function (req, res) {
  PhoneDB.findOne({'arial': req.params.id}, function (err, arials) {
    if (err) {
      console.warn(err)
    }
    if (arials) {
      res.render('phoneAdd', {
        title: 'Editing Arial ' + arials.arial,
        arial: arials
      })
    } else {
      res.redirect('/phone/add')
    }
  })
})

router.post('/phone/add', savePhone)
router.post('/phone/:id', savePhone)

function savePhone (req, res, next) {
  if (req.body.action === 'delete') {
    return deletePhone(req, res, next)
  }
  var id = (req.body.id) ? req.body.id : req.params.id
  var room = req.body.room
  var desc = req.body.desc

  PhoneDB.findOne({arial: id}, function (err, arials) {
    if (err) {
      console.warn(err)
    }
    if (!arials) {
      arials = new PhoneDB()
    }
    arials.arial = id
    arials.room = room
    arials.desc = desc
    arials.save()
    res.redirect('/phone')
  })
}

function deletePhone (req, res, next) {
  var id = (req.body.id) ? req.body.id : req.params.id
  PhoneDB.findOne({arial: id}, function (err, arials) {
    if (err) {
      console.warn(err)
    }
    arials.remove()
  })
  res.redirect('/phone')
}

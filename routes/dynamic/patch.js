var express = require('express')
var PatchDB = require('./../../models/patch.js')

var router = module.exports = express.Router()

router.get('/network/patch/add', function (req, res, next) {
  res.render('network/add/patch', {
    title: 'Add Panel'
  })
})

router.get('/network/patch/:node/:panel/:num', function (req, res, next) {
  PatchDB.findOne({
    'node': req.params.node,
    'panel': req.params.panel,
    'port.num': req.params.num
  }, function (err, pa) {
    if (err) {
      console.warn(err)
    }
    if (pa) {
      var x
      for (var y in pa.port) {
        if (pa.port[y].num === Number(req.params.num)) {
          x = y
        }
      }
      res.render('network/add/patch', {
        title: 'Node ' + pa.node + ', Panel ' + pa.panel + ', Port ' + pa.port[x].num,
        padetail: {
          node: pa.node,
          panel: pa.panel,
          num: pa.port[x].num,
          dest: pa.port[x].dest,
          swname: pa.port[x].sw.name,
          swport: pa.port[x].sw.port
        },
        id1: true,
        path: req.path
      })
    } else {
      res.render('error', {
        title: 'Error',
        notification: {
          title: 'Error',
          severity: 'danger',
          message: 'Node ' + req.params.node + ', Panel ' + req.params.panel + ', Port ' + req.params.num + ' does not exist.'
        }
      })
    }
  })
})

router.post('/network/patch/add', savePatch)
router.post('/network/patch/:node/:panel/:num', savePatch)

// Functions

function savePatch (req, res, next) {
  if (req.body.action === 'delete') {
    return deletePatch(req, res, next)
  }

  var node = (req.body.node) ? req.body.node : req.params.node
  var panel = (req.body.panel) ? req.body.panel : req.params.panel
  var num = (req.body.num) ? req.body.num : req.params.num
  var dest = req.body.dest
  var swname = req.body.swname
  var swport = req.body.swport

  PatchDB.findOne({
    node: node,
    panel: panel
  }, function (err, pa) {
    if (err) {
      return next(err)
    }
    var paport
    var portFound = false
    if (pa) {
      var searchTerm = req.params.num
      pa.port.forEach(function (port) {
        if (port.num === Number(searchTerm)) {
          port.num = num
          port.dest = dest
          port.sw = {
            name: swname,
            port: swport
          }
          portFound = true
        }
      })

      if (!portFound) {
        paport = {
          num: num,
          dest: dest,
          sw: {
            name: swname,
            port: swport
          }
        }
        pa.port.push(paport)
      }
    } else {
      pa = new PatchDB()
      pa.node = node
      pa.panel = panel
      paport = {
        num: num,
        dest: dest,
        sw: {
          name: swname,
          port: swport
        }
      }
      pa.port.push(paport)
    }
    pa.save()
    console.log('[patch.js] Saved node ' + node + ', panel ' + panel + ', port ' + num)
    res.redirect('/network/patch')
  })
}

function deletePatch (req, res, next) {
  var node = (req.body.node) ? req.body.node : req.params.node
  var panel = (req.body.panel) ? req.body.panel : req.params.panel
  var num = (req.body.num) ? req.body.num : req.params.num
  PatchDB.findOne({
    node: node,
    panel: panel
  }, function (err, pa) {
    if (err) {
      console.warn(err)
    }
    if (pa.port.length === 1) {
      pa.remove()
    } else {
      for (var i = 0; i < pa.port.length; i++) {
        if (pa.port[i].num === Number(num)) {
          pa.port.splice(i, 1)
          // console.log(pa.port)
          pa.save()
        }
      }
    }
  })
  console.log('[patch.js] Deleted node ' + node + ', panel ' + panel + ', port ' + num)
  res.redirect('/network/patch')
}

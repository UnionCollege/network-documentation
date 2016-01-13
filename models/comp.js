var mongoose = require('mongoose')
var compSchema = new mongoose.Schema({
  name: String,
  ip: String,
  mac: String,
  port: String,
  desc: String
})

var comp = mongoose.model('comp', compSchema)
module.exports = comp

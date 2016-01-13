var mongoose = require('mongoose')
var switchSchema = new mongoose.Schema({
  name: String,
  ip: String,
  loc: String,
  uplink: {
    sw: Number,
    port: String
  },
  downlink: String,
  type: String,
  model: String,
  ports: [{
    port: Number,
    dest: String
  }]
})

var switches = mongoose.model('switches', switchSchema)
module.exports = switches

var mongoose = require('mongoose')

var apSchema = new mongoose.Schema({
  name: String,
  mac: String,
  sw: {
    name: Number,
    port: String
  }
})

var ap = mongoose.model('ap', apSchema)
module.exports = ap

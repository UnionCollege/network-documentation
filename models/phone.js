var mongoose = require('mongoose')
var phoneSchema = new mongoose.Schema({
  arial: Number,
  room: String,
  desc: String
})

var phone = mongoose.model('phone', phoneSchema)
module.exports = phone

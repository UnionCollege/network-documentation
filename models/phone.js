var mongoose = require('mongoose')
var phoneSchema = new mongoose.Schema({
  pen: String,
  arial: String,
  loc: String,
  desc: String
})

var phone = mongoose.model('phone', phoneSchema)
module.exports = phone

var mongoose = require('mongoose')

var alphaSchema = new mongoose.Schema({
  letter: String,
  phonetic: String
})

var alpha = mongoose.model('alpha', alphaSchema)
module.exports = alpha

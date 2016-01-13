var mongoose = require('mongoose')

var patchpanelSchema = new mongoose.Schema({
  node: Number,
  panel: Number,
  port: [{
    num: Number,
    dest: String,
    sw: {
      name: String,
      port: String
    }
  }]
})

var patchpanel = mongoose.model('patchpanel', patchpanelSchema)
module.exports = patchpanel

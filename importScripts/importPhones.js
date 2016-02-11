var fs = require('fs')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/netdoc')

var PhoneDB = require('../models/phone')

var items;
var lines = fs.readFileSync('../temp/data/arials.csv').toString().split('\n')
for (var line in lines) {
  items = lines[line].split(',')
  if (items[0] == '') {
    //throw 'Exiting after empty record.';
  } else {
    console.log('{arial: ' + Number(items[0]) + ', room: ' + items[1] + ', desc: ' + items[2] + '}')
    var thing = new PhoneDB({
      arial: Number(items[0]),
      room: items[1],
      desc: items[2]
    });
    thing.save()
  }
}

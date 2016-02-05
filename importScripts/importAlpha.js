var fs = require('fs')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/netdoc')

var AlphaDB = require('../../models/alpha')

var items;
var lines = fs.readFileSync('../data/alpha.csv').toString().split('\n')
for (var line in lines) {
  items = lines[line].split(',')
  if (items[0] == '') {
    //throw 'Exiting after empty record.';
  } else {
    console.log('{letter: ' + items[0] + ', phonetic: ' + items[1] + '}')
    var thing = new AlphaDB({
      letter: items[0],
      phonetic: items[1]
    });
    thing.save()
  }
}

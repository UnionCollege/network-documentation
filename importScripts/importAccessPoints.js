var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/netdoc')
var ApsDB = require('../../models/aps')
var rows = fs.readFileSync('../data/apdata.csv').toString().split("\n")
var object
var items
var currentPos = 0

for (var row in rows) {
    items = rows[row].split(",")
    if (items[0] == '') {
        continue
    }
    if ((currentPos == 0) || (object.name != items[0])){
        object = new ApsDB({
            name: items[0],
            mac: items[3],
            sw: {
                name: Number(items[1]),
                port: items[2]
            }
        })
    } else {
        object.port.push({
            name: items[0],
            mac: items[3],
            sw: {
                name: Number(items[1]),
                port: items[2]
            }
        });
    }
    currentPos++
    console.log(object)
    object.save()
}

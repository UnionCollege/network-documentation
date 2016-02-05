var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/netdoc')
var PatchDB = require('../../models/patch')
var rows = fs.readFileSync('../data/patchpanels2.csv').toString().split('\n')
var object
var items
var currentPos = 0

for (var row in rows) {
    items = rows[row].split(',')
    if (items[0] == '') {
        continue
    }
    if ((currentPos == 0) ||
        (object.node != Number(items[0])) ||
        (object.panel != Number(items[1])))
    {
        object = new PatchDB({
            node: Number(items[0]),
            panel: Number(items[1]),
            port: [{
                num: Number(items[2]),
                dest: items[3] + '-' + items[4],
                sw: {
                    name: '',
                    port: 0
                }
            }]
        })
    } else {
        object.port.push({
            num: Number(items[2]),
            dest: items[3] + '-' + items[4],
            sw: {
                name: '',
                port: 0,
            }
        })
    }
    currentPos++
    console.log(object)
    object.save()
}

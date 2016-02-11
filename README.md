# Netdoc - Union College Network Documentation Application
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

##Purpose
The main function of this software is to allow for a simple web interface for viewing and editing network documentation. This app displays documentation data for network nodes, patch panels, switches, wireless access points, computers, and miscellaneous items. The web interface can be used to view and edit this data.

##Environment
Netdoc uses Node.js and Express as a webserver, Mongoose to interface with MongoDB databases, and Jade as a template engine.

Currently netdoc is only compatible with the Chrome browser.

## Installation

1. Modify and run the import scripts.
2. Copy `./install/config.js` to `./config.js` and update the contents.

## Technologies

* [node](https://github.com/nodejs/node#readme)
* [express](https://github.com/strongloop/express#readme)
* [jade](https://github.com/pugjs/jade#readme)
* [mdl](http://www.getmdl.io/index.html)
* [node-mssql](https://github.com/patriksimek/node-mssql#readme)
* [body-parser](https://github.com/expressjs/body-parser#readme)
* [tablesorter](http://tablesorter.com/docs/)

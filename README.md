# Union College Network Documentation Application
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

#### A basic CRUD app built to store the documentation for the Union College network.

## Installation

1. Configure your mySQL or MariaDB instance with a database and a user with write access to that database.
2. Copy `./install/config.js` to `./config.js` and update the data for your implementation.
3. Run `node migrate.js` to initialize your database.

## Technologies

* [node](https://github.com/nodejs/node#readme)
* [express](https://github.com/strongloop/express#readme)
* [jade](https://github.com/pugjs/jade#readme)
* [node-mysql](https://github.com/felixge/node-mysql#readme)
* [body-parser](https://github.com/expressjs/body-parser#readme)

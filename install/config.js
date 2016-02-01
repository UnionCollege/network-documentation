var config = {}

config.installed = false
config.port = process.env.PORT || 3000
config.sitename = 'Netdoc'

config.mariadb = {}
config.mariadb.host = ''
config.mariadb.user = ''
config.mariadb.pass = ''

module.exports = config

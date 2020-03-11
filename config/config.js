const credentials = require( "./credentials");
const config = {
  env: process.env.NODE_ENV || 'development',
  http_port: process.env.PORT || 3000,
  https_port: process.env.HTTPS_PORT || 3001,

}

Object.assign(config, credentials)
module.exports = config

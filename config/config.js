const credentials = require( "./credentials");
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
}

Object.assign(config, credentials)
module.exports = config

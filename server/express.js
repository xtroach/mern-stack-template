import express from 'express'
import config from './../config/config'
import redis from 'redis'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import RedisStore from 'connect-redis'
import template from './../pageTemplate'
//require to fix buggy deprecation warning in the module
const morgan = require('morgan')
const redisClient = redis.createClient(config.redis)

const app = express()

import devBundle from './devBundle'
devBundle.compile(app)
app.use('/dist', express.static(__dirname+'./../dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: config.cookieSecret,
  store:  new (RedisStore(expressSession))({
    client: redisClient,
    logErrors: true,  // highly recommended!
  }),
}))



app.use('*', async (req,res) => {
  const html = template()
  res.send(html)
})


export default app
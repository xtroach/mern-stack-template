import express from 'express'
import {redirectToHTTPS} from "express-http-to-https";
import config from './../config/config'
import redis from 'redis'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import RedisStore from 'connect-redis'
import scannerTemplate from '../scannerTemplate'
import browserTemplate from '../browserTemplate'
import qrHelper from './conntrollers/qrHelper'
//require to fix buggy deprecation warning in the module
const morgan = require('morgan')
const redisClient = redis.createClient(config.redis)

const app = express()

import devBundle from './devBundle'

app.use(redirectToHTTPS(/localhost:3000/))
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


app.get('/qr-login/', qrHelper.renderQR)

app.use('/scanner', async (req,res) => {
  const html = scannerTemplate()
  res.send(html)
})

app.get('*', (req,res) => {
  const html = browserTemplate()
  res.send(html)

})


export default app
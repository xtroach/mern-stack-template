import express from 'express'
import config from './../config/config'
const redirect = express()


redirect.all("*",(req,res)=>{
  res.redirect('https://'+req.headers.host.replace(`:${config.http_port}`, ':'+config.https_port) + req.url)
  console.log(req.url)
})

export default redirect
import config from './../config/config'
import app from './express'
import redirect from "./express-htttps-redirector";
import mongoose from 'mongoose'
import https from 'https'
import http from 'http'
import socketIO from 'socket.io'
const fs = require('fs')

//...





// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

http.createServer({}, redirect).listen(config.http_port, (err)=>{
  if(err) return console.log(err)
  console.info('Http-Server started on port %s', config.http_port)
})
const httpsServer = https.createServer({key: fs.readFileSync('server.key'), cert: fs.readFileSync('server.cert')}, app)
const io = socketIO(httpsServer)
io.on('connection', function(socket){
  console.log('a user connected');
});

httpsServer.listen(config.https_port, (err) => {
  if (err) return console.log(err)
  console.info('Https-Server started on port %s.', config.https_port)
})



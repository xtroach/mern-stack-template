import socketIO from 'socket.io'


export default (server) =>{
  let io
  if (!server && !io){
    throw new Error("Non instiated")
  }
  if(!io) io =socketIO(server)
  return io
}
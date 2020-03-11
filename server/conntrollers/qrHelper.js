import QRCode from 'qrcode'

const renderQR  = (req,res) =>{

    QRCode.toDataURL( req.sessionID, (err,url)=> {
    if (err) return console.log(err)
    res.send(`<img src="${url}" alt="login QR Code"/>`)
  })
}

export default {
  renderQR,
}
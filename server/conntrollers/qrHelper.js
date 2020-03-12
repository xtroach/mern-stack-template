import QRCode from 'qrcode'
import jwt from 'jsonwebtoken'
const renderQR  = (req,res) =>{
    const token = jwt.sign({user: req.sessionID},"haskdjhaksjhdkjashdkjahsdjhgkjhskjhfgsjhdglkjhasdklhaskjdh")
    QRCode.toDataURL( token, (err,url)=> {
    if (err) return console.log(err)
    res.send(`<img src="${url}" alt="login QR Code"/>`)
  })
}

export default {
  renderQR,
}
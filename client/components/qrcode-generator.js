import React, {Component} from 'react'
import QRCode from 'qrcode.react'

class UniqueQRCode extends Component {
  // Will need app's unique API token
  // Will need to generate random Hash to identify this particular transaction/QR code

  generateQRCode = (appToken, randomHash) => {
    const QRData = `${appToken}~${randomHash}` // To discuss how to combine the arguments
    return QRData
  }

  render() {
    const QRData = this.generateQRCode()
    return <QRCode value={QRData} />
  }
}

export default UniqueQRCode

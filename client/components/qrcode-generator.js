/* eslint-disable react/prefer-stateless-function */
'use strict'
import React, {Component} from 'react'
import QRCode from 'qrcode.react'

class UniqueQRCode extends Component {
  render() {
    const apiToken = this.props.apiToken // client identifier
    const QRData = `${apiToken}`
    return <QRCode size={256} value={QRData} />
  }
}

export default UniqueQRCode

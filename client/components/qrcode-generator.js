/* eslint-disable react/prefer-stateless-function */
'use strict'
import React, {Component} from 'react'
import QRCode from 'qrcode.react'

class UniqueQRCode extends Component {
  render() {
    const apiToken = this.props.apiToken // client identifier
    const randomHash = this.props.randomHash // transaction identifier
    const QRData = `${apiToken}&${randomHash}`
    return <QRCode value={QRData} />
  }
}

export default UniqueQRCode

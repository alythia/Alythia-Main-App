/* eslint-disable react/prefer-stateless-function */
'use strict'
import React, {Component} from 'react'
import sha256 from 'sha256'
import UniqueQRCode from './qrcode-generator'
import generateUUID from '../uuid-generator'

class QRCodeLanding extends Component {
  generateRandomHash = () => {
    const UUID = generateUUID()
    return sha256(UUID)
  }

  render() {
    const apiToken = this.props.location.search.split('=')[1]
    const randomHash = this.generateRandomHash()
    // TODO: discuss how to give this a 10 minute shelf life

    console.log(apiToken)
    return (
      <div className="row container center">
        <br />
        <h5 className="header">Scan to Authenticate with Alythia...</h5>
        <br />
        <UniqueQRCode
          id="QRCodeRender"
          apiToken={apiToken}
          randomHash={randomHash}
        />
        <br />
        <br />
        <h5 className="grey-text text-darken-3 lighten-3">
          ...and continue to [www.placeholder.com]
        </h5>
      </div>
    )
  }
}

export default QRCodeLanding

// Example of URL when accessing Google's OAuth page:
// https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=688598745912-cee2ph8rdac9bo3ie8ltbqtlhtsk8jfj.apps.googleusercontent.com&as=6gfwgrJUnpKvfyQYzOvxDw&destination=https%3A%2F%2Fcalm-brook-79071.herokuapp.com&approval_state=!ChRNREc5WGMxT204OVFLWkIyTjg1QxIfUTBickFvZm1qNWNhc0NEZU1wUEotOWE1OXduX1FSWQ%E2%88%99AB8iHBUAAAAAWyxPnGSJM6uoWvVK_X36KgIwzgLNqJT0&xsrfsig=AHgIfE__k_kVqV74Jj8ilS1tBtR0y3E2ZQ&flowName=GeneralOAuthFlow

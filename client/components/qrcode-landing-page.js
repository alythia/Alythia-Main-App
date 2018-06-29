/* eslint-disable react/prefer-stateless-function */
'use strict'
import React, {Component} from 'react'
import UniqueQRCode from './qrcode-generator'
import axios from 'axios'
import queryString from 'query-string'
// import generateUUID from '../uuid-generator'
import io from 'socket.io-client'
import Spinner from 'react-spinkit'

const socket = io(window.location.origin)

class QRCodeLanding extends Component {
  constructor() {
    super()
    this.state = {
      pageLoaded: false,
      token: '',
      message: '',
      pageInfo: {}
    }
  }

  async componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    const {client_id, token} = query
    socket.on('Hello', () => {
      const qr = document.getElementById('qr')
      qr.classList.add('hidden')
      const loader = document.querySelector('.hidden')
      loader.classList.remove('hidden')
    })
    socket.on('authorized', async data => {
      const loginIdentifier = data.loginIdentifier
      console.log('LOGIN IDENTIFIER: ', loginIdentifier)
      await axios.get(
        `http://172.16.23.189:8023/api/logged-in/${loginIdentifier}`
      )
    })
    try {
      const result = await axios.post('/api/clients/verify', {token, client_id})
      if (result.status === 200) {
        this.setState({
          token,
          pageLoaded: true,
          pageInfo: result.data
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({
        pageLoaded: true,
        message: error.message
      })
    }
  }

  render() {
    // TODO: discuss how to give this a 10 minute shelf life
    const {token, message, pageLoaded, pageInfo} = this.state
    if (!pageLoaded) {
      return (
        <div className="row container center progress-bar">
          <div className="large-spacer" />
          <div className="large-spacer" />
          <div className="progress">
            <div id="indeterminate" className="indeterminate" />
          </div>
        </div>
      )
    } else if (pageLoaded && token.length > 0) {
      return (
        <div className="row container center animated zoomIn">
          <div className="col s12 m12">
            <div className="card-panel qr-container-main">
              <div className="side-right">
                <img src="/logo-dark.png" className="logo-qr-page" />
                <div className="large-spacer" />
                <div id="QRcontainer">
                  <div className="hidden">
                    <Spinner className="qrLoader" name="cube-grid" />
                  </div>
                  {
                    <div id="qr">
                      <UniqueQRCode
                        id="QRCodeRender"
                        apiToken={JSON.stringify(pageInfo)}
                      />
                    </div>
                  }
                </div>
                <p className="confirm-text">
                  Scan with your{' '}
                  <span className="alythia-small-text">Alythia</span> app to
                  confirm.
                </p>
                <div className="large-spacer" />
              </div>
              <div className="side-left">
                <div className="huge-spacer" />
                <h5 className="left-align">
                  Welcome to password-free <br />authentication through{' '}
                  <span className="alythia-text">Alythia.</span>
                </h5>
                <br />
                <div className="divider" />
                <br />
                <h5 className="grey-text text-lighten-1 left-align">
                  <span className="alythia-text">{pageInfo.projectName}</span>{' '}
                  would like to {<br />}confirm your identity.
                </h5>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (pageLoaded && message.length > 0) {
      return (
        <div className="row container center">
          <br />
          <h5 className="header">{message}</h5>
          <br />
        </div>
      )
    }
  }
}

export default QRCodeLanding

/* eslint-disable react/prefer-stateless-function */
'use strict'
import React, {Component} from 'react'
import UniqueQRCode from './qrcode-generator'
import axios from 'axios'
import queryString from 'query-string'
// import generateUUID from '../uuid-generator'
import io from 'socket.io-client'

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
      alert('Mounted')
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
        <div className="row container center">
          <br />
          <div className="progress">
            <div className="indeterminate" />
          </div>
          <br />
        </div>
      )
    } else if (pageLoaded && token.length > 0) {
      return (
        <div className="row container center animated zoomIn">
          <br />
          <h5 className="header">Scan to Authenticate with Alythia...</h5>
          <br />
          {
            <UniqueQRCode
              id="QRCodeRender"
              apiToken={JSON.stringify(pageInfo)}
            />
          }
          <br />
          <br />
          <h5 className="grey-text text-darken-3 lighten-3">
            ...and continue to {pageInfo.projectName} {pageInfo.website}
          </h5>
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

// Example of URL when accessing Google's OAuth page:
// https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=688598745912-cee2ph8rdac9bo3ie8ltbqtlhtsk8jfj.apps.googleusercontent.com&as=6gfwgrJUnpKvfyQYzOvxDw&destination=https%3A%2F%2Fcalm-brook-79071.herokuapp.com&approval_state=!ChRNREc5WGMxT204OVFLWkIyTjg1QxIfUTBickFvZm1qNWNhc0NEZU1wUEotOWE1OXduX1FSWQ%E2%88%99AB8iHBUAAAAAWyxPnGSJM6uoWvVK_X36KgIwzgLNqJT0&xsrfsig=AHgIfE__k_kVqV74Jj8ilS1tBtR0y3E2ZQ&flowName=GeneralOAuthFlow

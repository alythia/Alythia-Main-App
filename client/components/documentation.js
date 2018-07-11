import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import {connect} from 'react-redux'
import {changeBackgroudColor} from '../store'

class Documentation extends Component {
  componentDidMount() {
    this.props.changeBackgroudColor(true)
  }

  render() {
    return (
      <div className="docs_container">
        <div className="docs_container_main">
          <Row className="docs_container_box">
            <Col s={11} m={11} l={11} className="docss">
              <div className="docs_description">
                <h3 className="center-align">Welcome!</h3>
                <h5 className="center-align">
                  And thank you for your interest in Alythia to manage the
                  authorization process for your web application.
                </h5>
                <br />
                <h5 className="divider-dots">. . .</h5>
                <p>
                  The below documentation includes two necessary API routes that
                  will allow your back-end to properly interact with the Alythia
                  platform.
                </p>
                <p>
                  These routes were written using Express.js, which is our
                  router of choice here at Alythia. The routes also reference a
                  "fakeDB" object, since every developer's database setup will
                  be unique to their application. The logic is what's most
                  important here, so feel free to implement your own appropriate
                  back-end code for creating and validating user accounts.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="docs_container_box">
            <Col s={11} m={11} l={11} className="docss">
              <div className="docs_description">
                <Col s={1} m={1} l={1} className="docs">
                  <span className="docs_number">1</span>
                </Col>
                <h4>POST: Receive user email and authenticate</h4>
                <p>
                  This POST route is triggered by Alythia's mobile app after
                  your one-time, unique QR Code has been scanned by a user. Via
                  this route, the Alythia mobile app sends a http request that
                  includes in its body the user's email address. It is then up
                  to you to implement logic to either retrieve the user from
                  your database using that email or add them to the database if
                  they do not exist. Upon successful lookup or creation, respond
                  to Alythia's backend with a one-time, unique user token; this
                  token will later be returned to you as a final check that the
                  authorized user is who they say they are.
                </p>
                <pre className="docs_code">
                  {`
      router.post('/verify/:id', (req, res, next) => {
        const userEmail = req.body.email;

        fakeDB.user.loginIdentifier = uuidv4();
        fakeDB.user.email = userEmail;

        const dbEmail = fakeDB.user.email;

        if (dbEmail === reqEmail) {
          res.json({ loginIdentifier: fakeDB.user.loginIdentifier });
        } else {
          res.status(406).send(-----Error Message-----);
        }
      })
      `}
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="docs_container_box">
            <Col s={11} m={11} l={11} className="docss">
              <div className="docs_description">
                <Col s={1} m={1} l={1} className="docs">
                  <span className="docs_number">2</span>
                </Col>
                <h4>GET: Trigger success or failure redirect</h4>
                <p>
                  This GET route is the final step in the authorization process.
                  Alythia's back-end will make a request to your server that
                  includes the aforementioned one-time, unique user token that
                  was generated in the previous route. You will then check the
                  received token against that which you generated earlier and --
                  if the match -- redirect to your success landing page (a
                  failure will redirect to your failure landing page).{' '}
                </p>
                <pre className="docs_code">
                  {`
      router.get('/logged-in/:loginIdentifier', (req, res, next) => {
        const callbackURL = 'http://www.----YOUR SUCCESS URL----.com'
        const failureURL = 'http://www.----YOUR FAILURE URL----.com'
        const loginIdentifier = req.params.loginIdentifier

        if (fakeDB.user.loginIdentifier === loginIdentifier) {
          res.redirect(callbackURL)
        } else {
          res.redirect(failureURL)
        }
      })
      `}
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="docs_container_box">
            <Col s={11} m={11} l={11} className="docss">
              <div className="docs_description">
                <h4>Setting up your Alythia button</h4>
                <p>
                  Don't forget to include your unique Client ID in the href of
                  the Alythia button component. This public identifier is used
                  to generate QR Codes specific to your application and in
                  various parts of the authorization process on Alythia's
                  back-end.
                </p>
                <p>
                  Your client ID can be found by clicking into a project's
                  details from the landing page; you must be logged in to access
                  this information.
                </p>
                <pre className="docs_code">
                  {`
    http://alythia.herokuapp.com/api/clients/----YOUR CLIENT ID----
      `}
                </pre>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    changeBackgroudColor: bool => dispatch(changeBackgroudColor(bool))
  }
}

export default connect(null, mapDispatch)(Documentation)

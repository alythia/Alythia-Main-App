import React, {Component} from 'React'
import Project from './project-card'
import {Modal, Button} from 'react-materialize'

export default class Landing extends Component {
  state = {
    userInfo: [
      {name: 'Stackathon', id: 'stackathon-4369'},
      {name: 'HoopChat', id: 'hoopchat'},
      {name: 'Moon Landing 1969', id: 'moon-landing-1969'}
    ]
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col push-m2 m4">
            <div className="landingHeader">Welcome to Alythia!</div>
            <div className="landingInfo">
              Tools from Google for developing great apps, engaging with your
              users, and earning more through mobile ads.
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col push-m2 m8">
            <Modal header="Modal Header" trigger={<Button>MODAL</Button>}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Modal>
            {this.state.userInfo.map(ele => (
              <Project userInfo={ele} key={ele.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

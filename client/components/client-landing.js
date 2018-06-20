import React, {Component} from 'React'
import Project from './project-card'

export default class Landing extends Component {
  state = {
    userInfo: []
  }

  render() {
    return (
      <div>
        <div>Welcome to app</div>
        <div>This is info here:</div>
        <div>
          <Project userInfo={this.state.userInfo} />
        </div>
      </div>
    )
  }
}

import React, {Component} from 'React'
import Project from './project-card'

export default class Landing extends Component {
  state = {
    userInfo: [
      {name: 'Stackathon', id: 'stackathon-4369'},
      {name: 'HoopChat', id: 'hoopchat'},
      {name: 'Moon Landing 1969', id: 'moon-landing-1969'}
    ],
    newProj: {
      projectName: '',
      projectID: '',
      domain: ''
    }
  }

  handleChange = e => {
    let change = this.state.newProj
    change[e.target.name] = e.target.value
    this.setState({newProj: change})
  }

  handleSubmit = () => {
    $('#close').modal('close')
    console.log('Axios saves the world!', this.state.newProj)
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
            <Project
              userInfo="New Project"
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              newProj={this.state.newProj}
            />

            {this.state.userInfo.map(ele => (
              <Project userInfo={ele} key={ele.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

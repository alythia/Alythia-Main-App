import React, {Component} from 'react'
import Project from './project-card'
import {Link} from 'react-router-dom'
import {Parallax} from 'react-materialize'

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
      <React.Fragment>
        <section>
          <div className="parallax-container">
            <div className="section no-pad-bot">
              <div className="container">
                <div className="row">
                  <h1 className="header main-header col s12">Alythia.</h1>
                  <h5 className="header col s12">
                    A password-free authentication provider
                  </h5>
                </div>
              </div>
            </div>
            <div className="landing-image parallax" />
          </div>
        </section>
        <section className="row projects-container">
          <div className="row col push-m2 m8 project-boxes">
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
        </section>
      </React.Fragment>
    )
  }
}

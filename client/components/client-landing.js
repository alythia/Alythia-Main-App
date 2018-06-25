import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewProject, fetchUserProjects} from '../store/client'
import Project from './project-card'
import {me} from '../store'

class Landing extends Component {
  state = {
    userInfo: [
      {
        name: 'Stackathon',
        id: 'stackathon-4369',
        projectToken: 'tokenOne',
        projectSecret: 'secretOne'
      },
      {
        name: 'HoopChat',
        id: 'hoopchat',
        projectToken: 'tokenTwo',
        projectSecret: 'secretTwo'
      },
      {
        name: 'Moon Landing 1969',
        id: 'moon-landing-1969',
        projectToken: 'tokenThree',
        projectSecret: 'secretThree'
      }
    ],
    newProj: {
      projectName: '',
      website: ''
    }
  }

  componentDidMount = async () => {
    await this.props.loadInitialData()
    await this.props.fetchUserProjects(this.props.developerId)
  }

  handleChange = e => {
    let change = this.state.newProj
    change[e.target.name] = e.target.value
    this.setState({newProj: change})
  }

  generateNewToken = event => {
    console.log('GENERATE NEW TOKEN')
  }

  generateNewSecret = event => {
    // Generate new client secret
    console.log('GENERATE NEW SECRET')
  }

  handleSubmit = () => {
    $('#close').modal('close')
    this.props.addNewProject(this.state.newProj)
    console.log('Axios saves the world!', this.state.newProj)
  }

  handleDetailClose = () => {
    $('#closeDetails').modal('close')
  }

  render() {
    console.log(this.props)
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
              <Project
                userInfo={ele}
                key={ele.id}
                generateNewToken={this.generateNewToken}
                generateNewSecret={this.generateNewSecret}
                handleSubmit={this.handleDetailClose}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  userProjects: state.client.userProjects,
  developerId: state.developer.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  addNewProject: project => dispatch(addNewProject(project)),
  fetchUserProjects: () => dispatch(fetchUserProjects())
})

export default connect(mapState, mapDispatch)(Landing)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-materialize'
import {
  addNewProject,
  fetchUserProjects,
  addedCurrentProject,
  changeBackgroudColor,
  generateNewToken
} from '../store/client'
import Project from './project-card'
import {me} from '../store'
import ProjectDetails from './project-details'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      newProj: {
        projectName: '',
        website: '',
        developerId: ''
      }
    }
  }

  componentDidMount = async () => {
    await this.props.loadInitialData()
    this.props.changeBackgroudColor(false)
    if (this.props.developerId) {
      await this.props.fetchUserProjects(this.props.developerId)
      this.setState({newProj: {developerId: this.props.developerId}})
    }
  }

  handleChange = event => {
    let change = this.state.newProj
    change[event.target.name] = event.target.value
    this.setState({newProj: change})
  }

  generateNewToken = async () => {
    await this.props.generateNewToken(this.props.project.client_id)
  }

  handleSubmit = () => {
    $('#close').modal('close')
    this.props.addNewProject(this.state.newProj)
    this.props.fetchUserProjects(this.props.developerId)
  }

  handleDetailClose = () => {
    $('#closeDetails').modal('close')
  }

  handleProjectClick = id => {
    const projects = this.props.userProjects
    const currentProject = projects.filter(project => {
      return project.id === id
    })
    this.props.addedCurrentProject(currentProject[0])
    $('#closeDetails').modal('open')
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="parallax-container">
            <div className="section no-pad-bot">
              <div className="">
                <div className="row col push-m1 m8">
                  <h1 className="header main-header col push-m2 m8">
                    Alythia.
                  </h1>
                  <h5 className="header col push-m2 m8">
                    A password-free authentication provider.{'  '}
                    <span className="alythia-text"> {'  '}Simply scan.</span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="landing-image parallax" />
          </div>
        </section>
        <section className="row projects-container">
          {this.props.isLoggedIn ? (
            <div className="row col push-m2 m8 project-boxes">
              <Project
                newProject="New Project"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                newProj={this.state.newProj}
              />
              {this.props.userProjects ? (
                this.props.userProjects.map(project => {
                  return (
                    <Project
                      userInfo={project}
                      key={project.id}
                      projectId={project.id}
                      handleProjectClick={this.handleProjectClick}
                    />
                  )
                })
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div className="row col push-m2 m8">
              <br />
              <p className="description-text">
                Alythia is an Open Authorization ("OAuth") protocol that allows
                third-party websites to safely and securely autheticate users
                without requiring sesitive user data (e.g. site-specific user
                passwords). We provide secure, third-party, user-agent,
                delegated authorization.
              </p>
              <div className="quote-container">
                <h5 className="divider-dots">. . .</h5>
                <p className="quote-text">
                  "OAuth is similar to a car’s valet key, which can be used to
                  allow a valet to temporarily drive and park a car, but it
                  doesn’t allow the holder full, unlimited access like a regular
                  key"
                </p>
                <p className="alythia-small-text right-align quote-name">
                  - Eran Hammer-Lahav, "Explaining OAuth"
                </p>
              </div>
            </div>
          )}
        </section>
        <Modal header="Project Details" id="closeDetails">
          <br />
          <ProjectDetails />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  userProjects: state.client.userProjects,
  developerId: state.developer.id,
  project: state.client.currentProject,
  isLoggedIn: !!state.developer.id,
  darkenNavbar: state.client.darkenNavbar
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  addNewProject: project => dispatch(addNewProject(project)),
  fetchUserProjects: developerId => dispatch(fetchUserProjects(developerId)),
  changeBackgroudColor: bool => dispatch(changeBackgroudColor(bool)),
  addedCurrentProject: currentProject =>
    dispatch(addedCurrentProject(currentProject)),
  generateNewToken: clientUUID => dispatch(generateNewToken(clientUUID))
})

export default connect(mapState, mapDispatch)(Landing)

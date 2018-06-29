import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Icon} from 'react-materialize'
import ProjectForm from './project-form'
import ProjectDetails from './project-details'

const Project = (props) => {
    if (!props.newProject) {
      return (
        <div className="col m4 s6">
          <div className="landingCard">
            <div className="name">{props.userInfo.projectName}</div>
            <div className="id">
              Project Details
              <Button
                floating
                large
                className="blue-grey right bottom"
                waves="light"
                icon="devices"
                onClick={() => props.handleProjectClick(props.projectId)}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col m4 s6">
          <div className="landingCard">
            <div className="name">{props.newProject}</div>
            <div className="id">
              Click to Create
              <Modal
                header="Create a New Project"
                id="close"
                trigger={
                  <Button
                    floating
                    large
                    className="red right bottom"
                    waves="light"
                    icon="add"
                  />
                }
                actions={
                  <Button onClick={props.handleSubmit} waves="light">
                    Add my project<Icon left>add_circle_outline</Icon>
                  </Button>
                }
              >
                <ProjectForm
                  handleChange={props.handleChange}
                  newProj={props.newProj}
                />
              </Modal>
            </div>
          </div>
        </div>
      )
    }
  }


const mapToState = state => {
  return {
    projects: state.client.userProjects
  }
}

export default connect(mapToState)(Project)

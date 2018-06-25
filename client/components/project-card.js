import React from 'react'
import {Modal, Button, Icon} from 'react-materialize'
import ProjectForm from './project-form'
import ProjectDetails from './project-details'

export const Project = props => {
  if (!props.newProject) {
    return (
      <div className="col m4 s6">
        <div className="landingCard">
          <div className="name">{props.userInfo.projectName}</div>
          <div className="id">
            Project Details
            <Modal
              header="Project Credentials"
              id="closeDetails"
              trigger={
                <Button
                  floating
                  large
                  className="blue-grey right"
                  waves="light"
                  icon="devices"
                />
              }
              actions={
                <div>
                  <Button
                    onClick={props.generateNewToken}
                    waves="light"
                    className="button-margin"
                  >
                    New API Token
                  </Button>
                  <Button
                    onClick={props.generateNewSecret}
                    waves="light"
                    className="button-margin"
                  >
                    New Client Secret
                  </Button>
                </div>
              }
            >
              <ProjectDetails
                generateNewToken={props.generateNewToken}
                generateNewSecret={props.generateNewSecret}
                userInfo={props.userInfo}
              />
            </Modal>
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

export default Project

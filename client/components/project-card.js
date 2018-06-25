import React from 'react'
import {Modal, Button, Icon} from 'react-materialize'
import ProjectForm from './project-form'
import ProjectDetails from './project-details'

export const Project = props => {
  if (props.userInfo.name) {
    return (
      <div className="col m4 s6">
        <div className="landingCard">
          <div className="name">{props.userInfo.name}</div>
          <div className="id">
            {props.userInfo.id}
            <Modal
              header="Project Credentials"
              id="closeDetails"
              trigger={
                <Button
                  floating
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
          <div className="name">{props.userInfo}</div>
          <div className="id">
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

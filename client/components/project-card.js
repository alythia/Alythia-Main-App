import React from 'react'
import {Modal, Button, Icon} from 'react-materialize'
import ProjectForm from './project-form'

export const Project = props => {
  if (props.userInfo.name) {
    return (
      <div className="col m4 s6">
        <a href="">
          <div className="landingCard">
            <div className="name">{props.userInfo.name}</div>
            <div className="id">{props.userInfo.id}</div>
          </div>
        </a>
      </div>
    )
  } else {
    return (
      <div className="col m4 s6">
        <div className="landingCard">
          <div className="name">{props.userInfo}</div>
          <div className="id">
            <Modal
              header="Modal Header"
              id="close"
              trigger={
                <Button
                  floating
                  large
                  className="red"
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

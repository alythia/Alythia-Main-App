import React from 'react'
import {Input} from 'react-materialize'

export const ProjectDetails = props => {
  return (
    <div className="col m4 s6">
      <Input
        s={6}
        label="Project Name"
        name="projectName"
        defaultValue={props.userInfo.name}
        disabled
      />
      <Input
        s={6}
        label="Project ID"
        name="projectID"
        defaultValue={props.userInfo.id}
        disabled
      />
      <Input
        s={4}
        label="API Token"
        name="domain"
        defaultValue={props.userInfo.projectToken}
        disabled
      />
      <Input
        s={6}
        label="Client Secret"
        name="domain"
        defaultValue={props.userInfo.projectSecret}
        disabled
      />
    </div>
  )
}
export default ProjectDetails

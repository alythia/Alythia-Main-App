import React from 'react'
import {Input, Row} from 'react-materialize'

export const ProjectForm = props => {
  const handleChange = props.handleChange
  return (
    <div className="col m4 s6">
      <Input
        s={6}
        label="Project Name"
        name="projectName"
        defaultValue={props.newProj.projectName}
        onChange={handleChange}
      />
      <Input
        s={6}
        label="Project ID"
        name="projectID"
        defaultValue={props.newProj.projectID}
        onChange={handleChange}
      />
      <Input
        s={6}
        label="Authorized Domain"
        name="domain"
        defaultValue={props.newProj.domain}
        onChange={handleChange}
      />
      <div className="row">
        <span>I accept the Terms and Conditions for using this product.</span>
      </div>
    </div>
  )
}
export default ProjectForm

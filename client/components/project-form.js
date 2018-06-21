import React from 'React'
import {Input, Row} from 'react-materialize'

export const ProjectForm = props => {
  const handleChange = props.handleChange
  return (
    <div className="col m4 s6">
      <Input
        s={6}
        label="Project Name"
        name="projectName"
        value={props.newProj.projectName}
        onChange={handleChange}
      />
      <Input s={6} label="Project ID" onChange={handleChange} />
      <Input s={6} label="Authorized Domain" onChange={handleChange} />
      <div className="row">
        <span>I accept the Terms and Conditions for using this product.</span>
      </div>
    </div>
  )
}
export default ProjectForm

import React from 'react'
import {Input} from 'react-materialize'

export const ProjectForm = props => {
  const handleChange = props.handleChange
  return (
    <div className="col m4 s6">
      <Input
        s={6}
        label="Project Name"
        name="projectName"
        id="input-margin"
        defaultValue={props.newProj.projectName}
        onChange={handleChange}
      />
      <Input
        s={6}
        label="Authorize Origin Domain"
        name="website"
        defaultValue={props.newProj.website}
        onChange={handleChange}
      />
      <span className="helper-text">
        For use with requests from a browser. This is the origin URI of the
        client application. It can't contain a wildcard (https://*.example.com).
      </span>
    </div>
  )
}
export default ProjectForm

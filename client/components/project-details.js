import React from 'react'
import {Input} from 'react-materialize'

export const ProjectDetails = props => {
  return (
    <form className="col m4 s6">
      <Input
        s={6}
        label="Project Name"
        name="projectName"
        defaultValue={props.userInfo.projectName}
        disabled
      />
      <Input
        s={6}
        label="Project URL"
        name="projectURL"
        defaultValue={props.userInfo.website}
        disabled
      />
      <Input
        s={6}
        label="API Token"
        name="apiToken"
        type="textarea"
        id="apiTextArea"
        defaultValue={props.userInfo.APItoken}
        disabled
      />
      <Input
        s={6}
        label="Client Secret"
        name="clientSecret"
        defaultValue={props.userInfo.secret}
        disabled
      />
    </form>
  )
}
export default ProjectDetails

import React from 'react'
import {Input} from 'react-materialize'

export const ProjectDetails = props => {
  return (
    <form className="col m4 s6">
      <Input
        s={6}
        label="Your Client ID"
        name="projectID"
        defaultValue={props.userInfo.client_id}
        disabled
      />
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
        label="Public Key"
        name="apiToken"
        type="textarea"
        id="apiTextArea"
        defaultValue={props.userInfo.public_key}
        disabled
      />
      <Input
        s={6}
        label="Secret Key"
        name="clientSecret"
        defaultValue={props.userInfo.secret_key}
        disabled
      />
    </form>
  )
}
export default ProjectDetails

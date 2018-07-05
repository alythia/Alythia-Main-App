import React, {Component} from 'react'
import {Input} from 'react-materialize'
import {connect} from 'react-redux'

class ProjectDetails extends Component {
  constructor() {
    super()
  }

  render() {
    let {currentProject} = this.props
    return (
      <form className="col m4 s6">
        <Input
          s={6}
          label="Your Client ID"
          name="projectID"
          placeholder=""
          value={currentProject.client_id}
          disabled
        />
        <Input
          s={6}
          label="Project Name"
          name="projectName"
          placeholder=""
          value={currentProject.projectName}
          disabled
        />
        <Input
          s={6}
          label="Project URL"
          name="projectURL"
          placeholder=""
          value={currentProject.website}
          disabled
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentProject: state.client.currentProject
  }
}

export default connect(mapStateToProps)(ProjectDetails)

import React from 'React'

export const Project = props => {
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
}

export default Project

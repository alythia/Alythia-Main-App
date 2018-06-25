import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Parallax} from 'react-materialize'
import Project from './project-card'

class Landing extends Component {
  state = {
    userInfo: [
      {name: 'Stackathon', id: 'stackathon-4369'},
      {name: 'HoopChat', id: 'hoopchat'},
      {name: 'Moon Landing 1969', id: 'moon-landing-1969'}
    ],
    newProj: {
      projectName: '',
      projectID: '',
      domain: ''
    }
  }

  handleChange = e => {
    let change = this.state.newProj
    change[e.target.name] = e.target.value
    this.setState({newProj: change})
  }

  handleSubmit = () => {
    $('#close').modal('close')
    console.log('Axios saves the world!', this.state.newProj)
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="parallax-container">
            <div className="section no-pad-bot">
              <div className="">
                <div className="row col push-m1 m8">
                  <h1 className="header main-header col push-m2 m8">
                    Alythia.
                  </h1>
                  <h5 className="header col push-m2 m8">
                    A password-free authentication provider
                  </h5>
                </div>
              </div>
            </div>
            <div className="landing-image parallax" />
          </div>
        </section>
        <section className="row projects-container">
          {this.props.isLoggedIn ? (
            <div className="row col push-m2 m8 project-boxes">
              <Project
                userInfo="New Project"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                newProj={this.state.newProj}
              />
              {this.state.userInfo.map(ele => (
                <Project userInfo={ele} key={ele.id} />
              ))}
            </div>
          ) : (
            <div
              className="row col push-m2 m8 description"
              style={{height: '250px'}}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                placerat volutpat porttitor. Aenean sed ullamcorper leo. Ut
                risus nunc, fermentum ut dapibus nec, interdum a nisl. In mollis
                dictum ante, sit amet placerat quam. Donec volutpat orci quis
                enim tristique, sit amet condimentum nisi tincidunt. Suspendisse
                potenti. Quisque eleifend lacus augue, eu hendrerit dui
                dignissim eget. Maecenas nec magna lacinia, dapibus justo eget,
                molestie neque.
              </p>
            </div>
          )}
        </section>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.developer.id
})

export default connect(mapState)(Landing)

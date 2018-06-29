import React, {Component} from 'react'

class Alythia extends Component {
  render() {
    return (
      <form
        action={`http://localhost:8080/api/clients/31e9f280-7bb6-11e8-bea8-7580bfe68284`}
        className="form"
        method="POST"
      >
        <button>Log in with Alythia</button>
      </form>
    )
  }
}

export default Alythia

import React, {Component} from 'react'

class Alythia extends Component {
  render() {
    return (
      <form
        action={`http://localhost:8080/api/clients/44f01b70-7eef-11e8-8d7e-a14cda9b3438`}
        className="form"
        method="POST"
      >
        <button>Log in with Alythia</button>
      </form>
    )
  }
}

export default Alythia

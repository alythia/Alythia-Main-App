import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import { connect } from 'react-redux';
import { changeBackgroudColor } from '../store';


class Documentation extends Component {
  componentDidMount() {
    this.props.changeBackgroudColor(true)
  }

  render() {
    return (
      <div className="docs_container">
        <div className="docs_container_main">
          <Row className="docs_container_box">
            <Col s={1} m={1} l={1} className="docs">
              <span className="docs_number">1</span>
            </Col>
            <Col s={11} m={11} l={11} className="docss">
              <h3>Some header that will describe this step</h3>
              <div className="docs_description">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.</p>
                <pre className="docs_code">
                  {`
                for (let i = 0; i < this.length - 1; i++) {
                  if (callback(this[i], this[i + 1]) === 1) {
                    let swappedVal = this[i];
                    this[i] = this[i + 1];
                    this[i + 1] = swappedVal;
                    swapCounter++;
                  }
                }`}
                </pre>

              </div>
            </Col>
          </Row>
          <Row className="docs_container_box">
            <Col s={1} m={1} l={1} className="docs">
              <span className="docs_number">1</span>
            </Col>
            <Col s={11} m={11} l={11} className="docss">
              <h3>Some header that will describe this step</h3>
              <div className="docs_description">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.</p>
                <pre className="docs_code">
                  {`
                for (let i = 0; i < this.length - 1; i++) {
                  if (callback(this[i], this[i + 1]) === 1) {
                    let swappedVal = this[i];
                    this[i] = this[i + 1];
                    this[i + 1] = swappedVal;
                    swapCounter++;
                  }
                }`}
                </pre>

              </div>
            </Col>
          </Row>
          <Row className="docs_container_box">
            <Col s={1} m={1} l={1} className="docs">
              <span className="docs_number">1</span>
            </Col>
            <Col s={11} m={11} l={11} className="docss">
              <h3>Some header that will describe this step</h3>
              <div className="docs_description">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.</p>
                <pre className="docs_code">
                  {`
                for (let i = 0; i < this.length - 1; i++) {
                  if (callback(this[i], this[i + 1]) === 1) {
                    let swappedVal = this[i];
                    this[i] = this[i + 1];
                    this[i + 1] = swappedVal;
                    swapCounter++;
                  }
                }`}
                </pre>

              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return{
    changeBackgroudColor: bool => dispatch(changeBackgroudColor(bool))
  }
}

export default connect(null, mapDispatch)(Documentation)

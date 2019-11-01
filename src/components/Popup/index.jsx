import React, { Component } from 'react';
import './Popup.css';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

class Popup extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const { startNewGame, ...rest } = this.props;
    return (
        <Modal
        {...rest}
        size="lg"
        aria-labelledby="popup-window"
        centered
        >
          <Modal.Header>
            <Modal.Title id="popup-window">
              Game Over
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Your score: {this.props.score}</h4>
            
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.props.startNewGame}>Play again</button>
            <Link to={'/'}>
              <button>Exit</button>
            </Link>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default Popup;
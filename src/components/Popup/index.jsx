import React, { Component } from "react";
import "./Popup.css";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

class Popup extends Component {
  render() {
    const { startNewGame, ...rest } = this.props;
    return (
      <Modal {...rest} aria-labelledby="popup-window" centered>
        <div className="popup-window">
          <h3>the game is over ¯\_(ツ)_/¯</h3>
          <h1>Your score: {this.props.score}</h1>

          <div className="popup-footer">
            <button
              className="popup-footer-btn"
              onClick={this.props.startNewGame}
            >
              Play again
            </button>
            <Link to={"/"}>
              <button className="popup-footer-btn">Exit</button>
            </Link>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Popup;

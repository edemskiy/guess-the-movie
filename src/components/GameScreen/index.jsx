import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameScreen.css";

import Popup from "../Popup";
import Spinner from "react-bootstrap/Spinner";

import { timeToAnswer, newQuestionUrl } from "../../constants/game";
import * as Actions from "../../actions/game";

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.checkAnswer = this.checkAnswer.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.startNewGame = this.startNewGame.bind(this);

    this.progressbar = React.createRef();
    this.choises = React.createRef();
    this.answerButton = React.createRef();
    this.popup = React.createRef();
  }
  componentDidMount() {
    this.startNewGame();
  }

  startNewGame() {
    this.props.resetGame();
    this.getNewQuestion();
  }

  startCountdown() {
    this.timer = setInterval(() => {
      this.props.updateTimer();

      if (this.props.timer <= 0) {
        clearInterval(this.timer);
        this.gameOver();
      }
    }, 100);
  }

  getNewQuestion() {
    if (!this.props.isQuestionLoading) {
      this.resetChoisesColors();
      this.props.changeQuestionLoadingStatus(true);
    }

    fetch(newQuestionUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          question: data,
          isQuestionLoading: false,
          timer: timeToAnswer,
          startTime: Date.now(),
          answerIsGiven: false
        });
        this.props.changeQuestion(data);
        this.props.changeQuestionLoadingStatus(false);
        this.props.setStartTime(Date.now());
        this.props.changeAnswerIsGivenStatus(false);
        this.startCountdown();
      });
  }

  resetChoisesColors() {
    Array.from(this.choises.current.children).forEach(button => {
      button.className = "";
    });
  }

  checkAnswer(e) {
    if (this.props.answerIsGiven) return;

    //stop countdown
    clearInterval(this.timer);

    this.props.changeAnswerIsGivenStatus(true);

    const clickedButton = e.target;

    //if the answer is correct
    if (clickedButton.value === this.props.question.answer) {
      // increment the score
      this.props.incrementScore();

      //highlight button with green
      clickedButton.classList.add("btn-right");

      // request the new question after 1 sec pause
      setTimeout(() => {
        this.getNewQuestion();
      }, 1000);
    }
    // if answer is not correct
    else {
      //highlight button with red
      clickedButton.classList.add("btn-wrong");

      this.gameOver();
    }
  }

  gameOver() {
    //highlight the right answer with green
    this.answerButton.current.classList.add("btn-right");

    // show game result
    this.props.changeShowPopupStatus(true);
  }

  render() {
    return (
      <div className="game-container container">
        <div className="content">
          {
            <Popup
              score={this.props.score}
              show={this.props.showPopup}
              startNewGame={this.startNewGame}
              onHide={() => {}}
            />
          }
          <div className="score">Score: {this.props.score}</div>

          {this.props.isQuestionLoading ? (
            <Spinner animation="border" />
          ) : (
            <div className="question">
              <div className="image">
                <img src={this.props.question.imageURL} alt="" />
              </div>

              <div className="countdown">
                <div className="progress">
                  <div
                    className="progress-bar"
                    ref={this.progressbar}
                    style={{
                      width: `${this.props.timer * (100 / timeToAnswer)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="choises" ref={this.choises}>
                {Object.values(this.props.question.choises).map((title, i) => (
                  <button
                    ref={
                      title === this.props.question.answer && this.answerButton
                    }
                    onClick={this.checkAnswer}
                    key={i}
                    value={title}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => ({
  ...state.game
});

const MapDispatchToProps = dispatch => ({
  changeQuestion: question => dispatch(Actions.changeQuestion(question)),
  changeQuestionLoadingStatus: status =>
    dispatch(Actions.changeQuestionLoadingStatus(status)),
  incrementScore: () => dispatch(Actions.incrementScore()),
  updateTimer: () => dispatch(Actions.updateTimer()),
  setStartTime: dateTime => dispatch(Actions.setStartTime(dateTime)),
  changeAnswerIsGivenStatus: status =>
    dispatch(Actions.changeAnswerIsGivenStatus(status)),
  changeShowPopupStatus: status =>
    dispatch(Actions.changeShowPopupStatus(status)),
  resetGame: () => dispatch(Actions.resetGame())
});

export default connect(MapStateToProps, MapDispatchToProps)(GameScreen);

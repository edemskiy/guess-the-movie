import React, { Component } from "react";
import "./GameScreen.css";

import Popup from "../Popup";

import { timeToAnswer, newQuestionUrl } from "../../constants/game";

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

    this.state = {
      question: {
        choises: [],
        imageURL: "",
        answer: ""
      },
      score: 0,
      timer: timeToAnswer,
      startTime: Date.now(),
      answerIsGiven: false,
      showPopup: false
    };
    this.getNewQuestion();
  }

  startNewGame() {
    this.setState({
      question: {
        choises: [],
        imageURL: "",
        answer: ""
      },
      score: 0,
      timer: timeToAnswer,
      startTime: Date.now(),
      answerIsGiven: false,
      showPopup: false
    });
    this.getNewQuestion();
  }

  startCountdown() {
    this.timer = setInterval(() => {
      this.setState(state => ({
        timer: timeToAnswer - (Date.now() - state.startTime) / 1000
      }));

      if (this.state.timer <= 0) {
        clearInterval(this.timer);
        this.gameOver();
      }
    }, 100);
  }

  getNewQuestion() {
    fetch(newQuestionUrl)
      .then(response => response.json())
      .then(data => {
        this.progressbar.current.classList.add("notransition");

        this.setState({
          question: data,
          timer: timeToAnswer,
          startTime: Date.now(),
          answerIsGiven: false
        });

        this.resetChoisesColors();
        this.startCountdown();
        setTimeout(
          () => this.progressbar.current.classList.remove("notransition"),
          0
        );
      });
  }

  resetChoisesColors() {
    Array.from(this.choises.current.children).forEach(button => {
      button.className = "";
    });
  }

  checkAnswer(e) {
    if (this.state.answerIsGiven) return;

    //stop countdown
    clearInterval(this.timer);

    this.setState({ answerIsGiven: true });

    const clickedButton = e.target;

    //if the answer is correct
    if (clickedButton.value === this.state.question.answer) {
      // increment the score
      this.setState(state => ({ score: state.score + 1 }));

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
    this.setState({
      showPopup: true
    });
  }

  render() {
    return (
      <div className="game-container container">
        <div className="content">
          <Popup
            score={this.state.score}
            show={this.state.showPopup}
            startNewGame={this.startNewGame}
            onHide={() => {}}
          />
          <div className="score">Score: {this.state.score}</div>

          <div className="image">
            <img src={this.state.question.imageURL} alt="" />
          </div>

          <div className="countdown">
            <div className="progress">
              <div
                className="progress-bar"
                ref={this.progressbar}
                style={{ width: `${this.state.timer * (100 / timeToAnswer)}%` }}
              ></div>
            </div>
          </div>

          <div className="choises" ref={this.choises}>
            {Object.values(this.state.question.choises).map((title, i) => (
              <button
                ref={title === this.state.question.answer && this.answerButton}
                onClick={this.checkAnswer}
                key={i}
                value={title}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GameScreen;

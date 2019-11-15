import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainScreen.css";

class MainScreen extends Component {
  render() {
    return (
      <div className="container main-screen">
        <h1 className="display-1">Guess the Movie</h1>
        <h2>
          Test your cinema knowledge by guessing the movie from the picture
        </h2>

        <div className="menu">
          <Link to={"/play"}>
            <button>PLAY</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainScreen;

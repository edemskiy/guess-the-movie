import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainScreen from '../MainScreen/index';
import GameScreen from '../GameScreen';
import Settings from '../Settings';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <div className="background"></div>
        <div>
          <Switch>
            <Route exact path="/" component={MainScreen} />
            <Route path="/play" component={GameScreen} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

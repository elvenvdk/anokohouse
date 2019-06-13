import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import {
  faUsers,
  faUmbrella,
  faInfinity
} from '@fortawesome/free-solid-svg-icons';

import LandingPage from '../../components/LandingPage';

import store from '../../store';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <div className='App__Container'>
              <Route exact path='/' component={LandingPage} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

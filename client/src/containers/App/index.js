import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import Partners from '../../components/Partners';
import UpdatePartner from '../../components/Partners/UpdatePartner';
import NavBar from '../../components/NavBar';
import Login from '../../components/auth/Login';

import store from '../../store';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <div className='App__Container'>
              <NavBar />
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/user-login' component={Login} />
              <Switch>
                <Route exact path='/partners' component={Partners} />
                <Route exact path='/update-partner' component={UpdatePartner} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

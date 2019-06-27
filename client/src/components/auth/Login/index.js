import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../../actions/authActions';

import './Login.scss';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  formSubmitHandler = event => {
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(credentials);
    this.setState({
      username: '',
      password: ''
    });
    event.preventDefault();
  };

  render() {
    console.log(this.props.auth);
    const { username, password } = this.state;
    return (
      <div className='Login'>
        <form className='Login__Form' onSubmit={this.formSubmitHandler}>
          <input
            type='text'
            name='username'
            id='username'
            className='Login__Form-Username'
            placeholder='Enter your username'
            value={username}
            onChange={e => this.inputChangeHandler(e)}
          />
          <input
            type='password'
            name='password'
            id='password'
            className='Login__Form-Password'
            placeholder='Enter your password'
            value={password}
            onChange={e => this.inputChangeHandler(e)}
          />
          <button id='submit-button' className='Login__Form-Submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

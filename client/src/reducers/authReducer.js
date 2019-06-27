import { UserTypes, ErrorTypes } from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.payload) {
    case UserTypes.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        message: action.payload
      };
    default:
      return state;
  }
};

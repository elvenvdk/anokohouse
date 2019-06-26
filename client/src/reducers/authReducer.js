import { UserTypes, ErrorTypes } from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.payload) {
    case UserTypes.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload
      };
    default:
      return state;
  }
};

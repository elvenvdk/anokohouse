import { combineReducers } from 'redux';
import partnerReducer from './partnerReducer';
import authReducer from './authReducer';

export default combineReducers({
  partnerReducer,
  authReducer
});

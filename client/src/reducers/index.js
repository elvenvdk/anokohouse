import { combineReducers } from 'redux';
import MaillistReducer from './mailListReducer';

export default combineReducers({
  mailList: MaillistReducer
});

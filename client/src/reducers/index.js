import { combineReducers } from 'react-redux';
import MaillistReducer from './mailListReducer';

export default combineReducers({
  mailList: MaillistReducer
});

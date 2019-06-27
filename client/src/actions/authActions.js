import axios from 'axios';

import { UserTypes, ErrorTypes } from './types';
import { URL } from './helper';

export const loginUser = userData => dispatch => {
  axios
    .post(`${URL}/user/login`, userData, {
      withCredentials: true
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: UserTypes.LOGIN_USER,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch({
        type: ErrorTypes.GET_ERRORS,
        payload: error.response.data
      })
    );
};

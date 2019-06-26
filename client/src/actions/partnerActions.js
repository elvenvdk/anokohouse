import { PartnerTypes, ErrorTypes } from './types';
import axios from 'axios';

import { URL } from './helper';

export const addPartner = partnerData => dispatch => {
  console.log('actions.addPartner: ', partnerData);
  axios
    .post(`${URL}/partners/create`, partnerData)
    .then(res =>
      dispatch({ type: PartnerTypes.ADD_PARTNER, payload: res.data })
    )
    .catch(error =>
      dispatch({ type: ErrorTypes.GET_ERRORS, payload: error.response.data })
    );
};

export const getPartners = () => dispatch => {
  setPartnersLoading();
  axios
    .get(`${URL}/partners`)
    .then(res =>
      dispatch({
        type: PartnerTypes.GET_PARTNERS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({ type: ErrorTypes.GET_ERRORS, payload: error.response.data })
    );
};

export const setPartnersLoading = () => ({
  type: PartnerTypes.PARTNER_LOADING
});

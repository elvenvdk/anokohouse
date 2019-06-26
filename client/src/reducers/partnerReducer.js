import { PartnerTypes } from '../actions/types';

const INITIAL_STATE = {
  partners: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PartnerTypes.ADD_PARTNER:
      return {
        ...state,
        partners: [action.payload, ...state.partners]
      };
    case PartnerTypes.GET_PARTNERS:
      // console.log(action.payload);
      return {
        ...state,
        partners: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

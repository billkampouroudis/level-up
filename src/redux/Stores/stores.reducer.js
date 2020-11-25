import {
  GET_STORES_REQUEST,
  GET_STORES_SUCCESS,
  GET_STORES_ERROR
} from './stores.types';

const INITIAL_STATE = {
  data: [],
  isGettingStores: false,
  isGettingStoresError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_STORES_REQUEST:
      return {
        ...state,
        isGettingStores: true
      };
    case GET_STORES_SUCCESS:
      return {
        ...state,
        isGettingStores: false,
        data: action.response
      };
    case GET_STORES_ERROR:
      return {
        ...state,
        isGettingStores: false,
        isGettingStoresError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

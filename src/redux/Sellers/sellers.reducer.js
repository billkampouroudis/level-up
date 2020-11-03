import {
  FETCH_SELLERS_REQUEST,
  FETCH_SELLERS_SUCCESS,
  FETCH_SELLERS_ERROR
} from './sellers.types';

const INITIAL_STATE = {
  data: [],
  isFetchingSellers: false,
  isFetchingSellersError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetch products
    case FETCH_SELLERS_REQUEST:
      return {
        ...state,
        isFetchingSellers: true
      };
    case FETCH_SELLERS_SUCCESS:
      return {
        ...state,
        isFetchingSellers: false,
        data: action.response
      };
    case FETCH_SELLERS_ERROR:
      return {
        ...state,
        isFetchingSellers: false,
        isFetchingSellersError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

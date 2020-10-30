import {
  FETCH_SELLER_PRODUCTS_REQUEST,
  FETCH_SELLER_PRODUCTS_SUCCESS,
  FETCH_SELLER_PRODUCTS_ERROR
} from './sellers.types';

const INITIAL_STATE = {
  data: [],
  isFetchingSellerProducts: false,
  isFetchingSellerProductsError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetch products
    case FETCH_SELLER_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetchingSellerProducts: true
      };
    case FETCH_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetchingSellerProducts: false,
        data: action.response
      };
    case FETCH_SELLER_PRODUCTS_ERROR:
      return {
        ...state,
        isFetchingSellerProducts: false,
        isFetchingSellerProductsError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

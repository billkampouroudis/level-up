import {
  FETCH_SELLERS_REQUEST,
  FETCH_SELLERS_SUCCESS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLER_PRODUCTS_REQUEST,
  FETCH_SELLER_PRODUCTS_SUCCESS,
  FETCH_SELLER_PRODUCTS_ERROR
} from './sellers.types';

import sellerApi from '../../api/sellers';

// Fetch Seller
export const fetchSellersRequest = () => {
  return {
    type: FETCH_SELLERS_REQUEST
  };
};

export const fetchSellersSuccess = (response) => {
  return {
    type: FETCH_SELLERS_SUCCESS,
    response
  };
};

export const fetchSellersError = (error) => {
  return {
    type: FETCH_SELLERS_ERROR,
    error
  };
};

/*** Thunks ***/
export function fetchSellers(id) {
  return (dispatch) => {
    dispatch(fetchSellersRequest());
    sellerApi
      .getSellers(id)
      .then((res) => {
        dispatch(fetchSellersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchSellersError(err.message));
      });
  };
}

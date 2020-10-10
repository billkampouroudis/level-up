import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './products.types';

import makeRequest, { requestMethods } from '../../api';

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsSuccess = (response) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    response
  };
};

export const fetchProductsError = (error) => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error
  };
};

export function fetchProducts(url) {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    makeRequest({ method: requestMethods.GET, url })
      .then((response) => {
        dispatch(fetchProductsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProductsError(error.message));
      });
  };
}

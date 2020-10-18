import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './products.types';

import { getProducts, getProduct } from '../../api/products';

import makeRequest, { requestMethods } from '../../api/request';

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

export function fetchProducts(id) {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    getProducts(id)
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsError(err.message));
      });
  };
}

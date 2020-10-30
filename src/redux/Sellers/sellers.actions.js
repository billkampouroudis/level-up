import {
  FETCH_SELLER_PRODUCTS_REQUEST,
  FETCH_SELLER_PRODUCTS_SUCCESS,
  FETCH_SELLER_PRODUCTS_ERROR
} from './sellers.types';

import sellerApi from '../../api/sellers';

// Fetch Seller Products
export const fetchSellerProductsRequest = () => {
  return {
    type: FETCH_SELLER_PRODUCTS_REQUEST
  };
};

export const fetchSellerProductsSuccess = (response) => {
  return {
    type: FETCH_SELLER_PRODUCTS_SUCCESS,
    response
  };
};

export const fetchSellerProductsError = (error) => {
  return {
    type: FETCH_SELLER_PRODUCTS_ERROR,
    error
  };
};

export function fetchSellerProducts(id) {
  return (dispatch) => {
    dispatch(fetchSellerProductsRequest());
    sellerApi
      .getSellerProducts(id)
      .then((res) => {
        dispatch(fetchSellerProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchSellerProductsError(err.message));
      });
  };
}

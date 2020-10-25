import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_ERROR
} from './products.types';

import productsApi from '../../api/products';

// Fetch Products
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

// Add To Favourites
export const addToFavoritesSuccess = (response) => {
  return {
    type: ADD_TO_FAVORITES_SUCCESS,
    response
  };
};

export const addToFavoritesError = (error) => {
  return {
    type: ADD_TO_FAVORITES_ERROR,
    error
  };
};

export function fetchProducts(id) {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    productsApi
      .getProducts(id)
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsError(err.message));
      });
  };
}

export function addToFavorites(id) {
  return (dispatch) => {
    productsApi
      .addToFavorites(id)
      .then((res) => {
        dispatch(addToFavoritesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addToFavoritesError(err.message));
      });
  };
}

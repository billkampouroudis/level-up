import {
  CLEANUP,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_ERROR,
  LIST_STORE_PRODUCTS_REQUEST,
  LIST_STORE_PRODUCTS_SUCCESS,
  LIST_STORE_PRODUCTS_ERROR
} from './products.types';

import productsApi from '../../api/products';
import storesApi from '../../api/stores';

export const cleanup = () => ({
  type: CLEANUP
});

export const getProduct = {
  request: () => {
    return {
      type: GET_PRODUCT_REQUEST
    };
  },
  success: (response) => {
    return {
      type: GET_PRODUCT_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: GET_PRODUCT_ERROR,
      error
    };
  },

  call: (id) => {
    return (dispatch) => {
      dispatch(getProduct.request());

      productsApi
        .getProduct({ id })
        .then((res) => {
          dispatch(getProduct.success(res.data));
        })
        .catch((err) => {
          dispatch(getProduct.error(err.message));
        });
    };
  }
};

export const listProducts = {
  request: () => {
    return {
      type: LIST_PRODUCTS_REQUEST
    };
  },
  success: (response) => {
    return {
      type: LIST_PRODUCTS_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: LIST_PRODUCTS_ERROR,
      error
    };
  },

  call: () => {
    return (dispatch) => {
      dispatch(listProducts.request());
      productsApi
        .listProducts()
        .then((res) => {
          dispatch(listProducts.success(res.data));
        })
        .catch((err) => {
          dispatch(listProducts.error(err.message));
        });
    };
  }
};

export const addToFavorites = {
  request: () => {
    return {
      type: ADD_TO_FAVORITES_REQUEST
    };
  },
  success: (response) => {
    return {
      type: ADD_TO_FAVORITES_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: ADD_TO_FAVORITES_ERROR,
      error
    };
  },

  call: (id) => {
    return (dispatch) => {
      // productsApi
      //   .addToFavorites(id)
      //   .then((res) => {
      //     dispatch(addToFavorites.addToFavoritesSuccess(res.data));
      //   })
      //   .catch((err) => {
      //     dispatch(addToFavorites.addToFavoritesError(err.message));
      //   });
    };
  }
};

export const listStoreProducts = {
  request: () => {
    return {
      type: LIST_STORE_PRODUCTS_REQUEST
    };
  },
  success: (response) => {
    return {
      type: LIST_STORE_PRODUCTS_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: LIST_STORE_PRODUCTS_ERROR,
      error
    };
  },

  call: (id) => {
    return (dispatch) => {
      dispatch(listStoreProducts.request());
      storesApi
        .listProducts({ id })
        .then((res) => {
          dispatch(listStoreProducts.success(res.data));
        })
        .catch((err) => {
          dispatch(listStoreProducts.error(err.message));
        });
    };
  }
};

import storesApi from '../../api/stores';
import {
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR
} from './stores.types';

export const getStore = {
  request: () => {
    return {
      type: GET_STORE_REQUEST
    };
  },
  success: (response) => {
    return {
      type: GET_STORE_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: GET_STORE_ERROR,
      error
    };
  },

  call: (id) => {
    return (dispatch) => {
      dispatch(getStore.request());
      storesApi
        .getStore({ id })
        .then((res) => {
          dispatch(getStore.success(res.data));
        })
        .catch((err) => {
          dispatch(getStore.error(err.message));
        });
    };
  }
};

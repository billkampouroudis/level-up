import {
  ORDERS_CLEANUP,
  SET_ORDERS,
  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_ERROR,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_ERROR
} from './orders.types';

import ordersApi from '../../api/orders';

export const cleanup = () => ({
  type: ORDERS_CLEANUP
});

export const setOrders = (newOrders) => ({
  type: SET_ORDERS,
  payload: newOrders
});

export const listOrders = {
  request: () => {
    return {
      type: LIST_ORDERS_REQUEST
    };
  },
  success: (response) => {
    return {
      type: LIST_ORDERS_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: LIST_ORDERS_ERROR,
      error
    };
  },

  call: (options = {}) => {
    return async (dispatch) => {
      dispatch(listOrders.request());
      try {
        const res = await ordersApi.listOrders(options);
        dispatch(listOrders.success(res.data));
        return res.data;
      } catch (err) {
        dispatch(listOrders.error(err.message));
        return err;
      }
    };
  }
};

export const updateOrders = {
  request: () => {
    return {
      type: UPDATE_ORDERS_REQUEST
    };
  },
  success: (response) => {
    return {
      type: UPDATE_ORDERS_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: UPDATE_ORDERS_ERROR,
      error
    };
  },

  call: (data, options) => {
    return (dispatch) => {
      dispatch(updateOrders.request());
      ordersApi
        .updateOrders(options)
        .then((res) => {
          dispatch(updateOrders.success(res.data));
        })
        .catch((err) => {
          dispatch(updateOrders.error(err.message));
        });
    };
  }
};

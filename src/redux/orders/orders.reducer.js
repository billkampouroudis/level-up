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

const INITIAL_STATE = {
  orders: [],
  isListingOrders: false,
  listOrdersError: null,
  isUpdatingOrders: false,
  updateOrdersError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDERS_CLEANUP:
      return INITIAL_STATE;

    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    // List orders
    case LIST_ORDERS_REQUEST:
      return {
        ...state,
        isListingOrders: true,
        listOrdersError: null
      };
    case LIST_ORDERS_SUCCESS:
      return {
        ...state,
        isListingOrders: false,
        orders: action.response
      };
    case LIST_ORDERS_ERROR:
      return {
        ...state,
        isListingOrders: false,
        listOrdersError: action.error
      };

    // Update orders
    case UPDATE_ORDERS_REQUEST:
      return {
        ...state,
        isListingOrders: true,
        listOrdersError: null
      };
    case UPDATE_ORDERS_SUCCESS:
      return {
        ...state,
        isListingOrders: false,
        orders: action.response
      };
    case UPDATE_ORDERS_ERROR:
      return {
        ...state,
        isListingOrders: false,
        listOrdersError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

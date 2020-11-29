import {
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR
} from './stores.types';

const INITIAL_STATE = {
  store: {},
  isGettingStore: false,
  getStoreError: null,
  stores: [],
  isListingStores: false,
  listStoresError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Get store
    case GET_STORE_REQUEST:
      return {
        ...state,
        isGettingStore: true,
        getStoreError: false
      };
    case GET_STORE_SUCCESS:
      return {
        ...state,
        isGettingStore: false,
        store: action.response
      };
    case GET_STORE_ERROR:
      return {
        ...state,
        isGettingStore: false,
        getStoreError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

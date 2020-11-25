import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_ERROR,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_ERROR
} from './products.types';

const INITIAL_STATE = {
  data: [],
  isGettingProduct: false,
  isGettingProductError: null,
  isListingProducts: false,
  isListingProductsError: null,
  isAddingToFavorites: false,
  isAddingToFavoritesError: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        isGettingProduct: true
      };
    case GET_PRODUCT_SUCCESS:
      const data = Array.isArray(action.response)
        ? action.response
        : [action.response];

      return {
        ...state,
        isGettingProduct: false,
        data
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isGettingProduct: false,
        isGettingProductError: action.error
      };

    case LIST_PRODUCTS_REQUEST:
      return {
        ...state,
        isListingProducts: true
      };
    case LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        isListingProducts: false,
        data: action.response
      };
    case LIST_PRODUCTS_ERROR:
      return {
        ...state,
        isFetchingProducts: false,
        isListingProductsError: action.error
      };

    case ADD_TO_FAVORITES_REQUEST:
      return {
        ...state,
        isAddingToFavorites: true
      };
    case ADD_TO_FAVORITES_SUCCESS:
      let _data = [];
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.response.id) {
          _data[i] = { ...action.response };
        } else {
          _data[i] = { ...state.data[i] };
        }
      }
      return {
        ...state,
        isAddingToFavorites: false,
        data: [..._data]
      };

    case ADD_TO_FAVORITES_ERROR:
      return {
        ...state,
        isAddingToFavorites: false,
        isAddingToFavoritesError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

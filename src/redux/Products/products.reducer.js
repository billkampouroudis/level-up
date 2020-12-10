import {
  CLEANUP,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_ERROR,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  LIST_STORE_PRODUCTS_REQUEST,
  LIST_STORE_PRODUCTS_SUCCESS,
  LIST_STORE_PRODUCTS_ERROR
} from './products.types';

const INITIAL_STATE = {
  product: {},
  isGettingProduct: false,
  getProductError: null,
  products: [],
  isListingProducts: false,
  listProductsError: null,
  isAddingToFavorites: false,
  addToFavoritesError: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEANUP:
      return INITIAL_STATE;

    // Get product
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        isGettingProduct: true,
        getProductError: null
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isGettingProduct: false,
        product: action.response
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isGettingProduct: false,
        getProductError: action.error
      };

    // List products
    case LIST_PRODUCTS_REQUEST:
      return {
        ...state,
        isListingProducts: true,
        listProductsError: null
      };
    case LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        isListingProducts: false,
        products: action.response
      };
    case LIST_PRODUCTS_ERROR:
      return {
        ...state,
        isListingProducts: false,
        listProductsError: action.error
      };

    // Favorites
    case ADD_TO_FAVORITES:
      return {
        ...state,
        product: {
          ...state.product,
          isFavorite: true
        }
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        product: {
          ...state.product,
          isFavorite: false
        }
      };

    // List store products
    case LIST_STORE_PRODUCTS_REQUEST:
      return {
        ...state,
        isListingProducts: true,
        listProductsError: null
      };
    case LIST_STORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isListingProducts: false,
        products: action.response
      };
    case LIST_STORE_PRODUCTS_ERROR:
      return {
        ...state,
        isListingProducts: false,
        listProductsError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

import {
  CLEANUP,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_ERROR,
  // ADD_TO_FAVORITES_REQUEST,
  // ADD_TO_FAVORITES_SUCCESS,
  // ADD_TO_FAVORITES_ERROR,
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

    // Add to favorites
    // case ADD_TO_FAVORITES_REQUEST:
    //   return {
    //     ...state,
    //     isAddingToFavorites: true
    //   };
    // case ADD_TO_FAVORITES_SUCCESS:
    //   let _data = [];
    //   for (let i = 0; i < state.data.length; i++) {
    //     if (state.data[i].id === action.response.id) {
    //       _data[i] = { ...action.response };
    //     } else {
    //       _data[i] = { ...state.data[i] };
    //     }
    //   }
    //   return {
    //     ...state,
    //     isAddingToFavorites: false,
    //     data: [..._data]
    //   };

    // case ADD_TO_FAVORITES_ERROR:
    //   return {
    //     ...state,
    //     isAddingToFavorites: false,
    //     isAddingToFavoritesError: action.error
    //   };

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

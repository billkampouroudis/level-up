import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_ERROR
} from './products.types';

const INITIAL_STATE = {
  data: [],
  isFetchingProducts: false,
  isFetchingProductsError: null,
  isAddingToFavorites: false,
  isAddingToFavoritesError: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetch products
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetchingProducts: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetchingProducts: false,
        data: action.response
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        isFetchingProducts: false,
        isFetchingProductsError: action.error
      };

    // Add To Favorites
    case ADD_TO_FAVORITES_SUCCESS:
      let tempList = [];
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.response.id) {
          tempList[i] = { ...action.response };
        } else {
          tempList[i] = { ...state.data[i] };
        }
      }

      return {
        ...state,
        isAddingToFavorites: false,
        data: [...tempList]
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

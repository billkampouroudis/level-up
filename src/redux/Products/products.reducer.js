import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_ERROR
} from './products.types';

const INITIAL_STATE = {
  list: [],
  loading: false,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetch products
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.response
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    // Add To Favorites
    case ADD_TO_FAVORITES_SUCCESS:
      let tempList = [];
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.response.id) {
          tempList[i] = { ...action.response };
        } else {
          tempList[i] = { ...state.list[i] };
        }
      }

      return {
        ...state,
        loading: false,
        list: [...tempList]
      };
    case ADD_TO_FAVORITES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

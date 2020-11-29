import storeApi from '../../api/stores';
import {
  CLEANUP,
  LIST_SUGGESTIONS_BY_STORE_REQUEST,
  LIST_SUGGESTIONS_BY_STORE_SUCCESS,
  LIST_SUGGESTIONS_BY_STORE_ERROR
} from './suggestions.types';

export const cleanup = () => ({
  type: CLEANUP
});

export const listSuggestionsByStore = {
  request: () => {
    return {
      type: LIST_SUGGESTIONS_BY_STORE_REQUEST
    };
  },
  success: (response) => {
    return {
      type: LIST_SUGGESTIONS_BY_STORE_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: LIST_SUGGESTIONS_BY_STORE_ERROR,
      error
    };
  },

  call: (id) => {
    return (dispatch) => {
      dispatch(listSuggestionsByStore.request());
      storeApi
        .listProducts({ id })
        .then((res) => {
          dispatch(listSuggestionsByStore.success(res.data));
        })
        .catch((err) => {
          dispatch(listSuggestionsByStore.error(err.message));
        });
    };
  }
};

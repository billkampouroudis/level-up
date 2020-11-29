import {
  CLEANUP,
  LIST_SUGGESTIONS_BY_STORE_REQUEST,
  LIST_SUGGESTIONS_BY_STORE_SUCCESS,
  LIST_SUGGESTIONS_BY_STORE_ERROR
} from './suggestions.types';

const INITIAL_STATE = {
  suggestions: [],
  isListingSuggestionsByStore: false,
  listSuggestionsByStoreError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEANUP:
      return INITIAL_STATE;

    // List suggestions by store
    case LIST_SUGGESTIONS_BY_STORE_REQUEST:
      return {
        ...state,
        isListingSuggestions: true,
        listSuggestionsByStoreError: null
      };
    case LIST_SUGGESTIONS_BY_STORE_SUCCESS:
      return {
        ...state,
        isListingSuggestionsByStore: false,
        suggestions: action.response
      };
    case LIST_SUGGESTIONS_BY_STORE_ERROR:
      return {
        ...state,
        isListingSuggestionsByStore: false,
        listSuggestionsByStoreError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

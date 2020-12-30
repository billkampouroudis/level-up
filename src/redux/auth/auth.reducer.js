import {
  AUTH_CLEANUP,
  CLEAR_LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './auth.types';

const INITIAL_STATE = {
  token: null,
  isGettingToken: false,
  getTokenError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CLEANUP:
      return INITIAL_STATE;
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        getTokenError: null
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isGettingUser: true,
        getTokenError: null
      };
    case LOGIN_SUCCESS:
      const token = action.response.token;
      return {
        ...state,
        isGettingUser: false,
        token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isGettingUser: false,
        getTokenError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

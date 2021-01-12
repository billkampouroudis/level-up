import {
  AUTH_CLEANUP,
  CLEAR_LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAR_REGISTER_ERROR
} from './auth.types';

const INITIAL_STATE = {
  token: null,
  isGettingToken: false,
  getTokenError: null,
  registerError: null
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
    case CLEAR_REGISTER_ERROR:
      return {
        ...state,
        registerError: null
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isGettingUser: true,
        getTokenError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isGettingUser: false,
        token: action.response.token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isGettingUser: false,
        getTokenError: action.error
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isGettingUser: true,
        registerError: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isGettingUser: false,
        token: action.response.token
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isGettingUser: false,
        registerError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

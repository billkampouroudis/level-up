import {
  USER_CLEANUP,
  UPDATE_USER,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR
} from './user.types';

const INITIAL_STATE = {
  user: null,
  isGettingUser: false,
  getUserError: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CLEANUP:
      return INITIAL_STATE;
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case USER_REQUEST:
      return {
        ...state,
        isGettingUser: true,
        getUserError: null
      };
    case USER_SUCCESS:
      const user = action.response;
      return {
        ...state,
        isGettingUser: false,
        user
      };
    case USER_ERROR:
      return {
        ...state,
        isGettingUser: false,
        getUserError: action.error
      };

    default:
      return state;
  }
};

export default reducer;

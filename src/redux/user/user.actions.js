import usersApi from '../../api/users';
import store from '../store';
import jwtDecode from 'jwt-decode';
import get from '../../utils/misc/get';
import {
  USER_CLEANUP,
  UPDATE_USER,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR
} from './user.types';

let authReducer = null;
store.subscribe(() => {
  authReducer = store.getState().authReducer;
});

export const userCleanup = () => ({
  type: USER_CLEANUP
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const getUser = {
  request: () => {
    return {
      type: USER_REQUEST
    };
  },
  success: (response) => {
    return {
      type: USER_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: USER_ERROR,
      error
    };
  },

  call: () => {
    return async (dispatch) => {
      dispatch(getUser.request());
      try {
        const userId = get.safe(() => jwtDecode(authReducer.token).user.id);
        const res = await usersApi.getUser(userId);
        dispatch(getUser.success(res.data));
      } catch (err) {
        dispatch(getUser.error(err.message));
      }
    };
  }
};

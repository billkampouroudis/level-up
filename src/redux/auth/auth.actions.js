import authApi from '../../api/auth';
import {
  AUTH_CLEANUP,
  CLEAR_LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './auth.types';

export const authCleanup = () => ({
  type: AUTH_CLEANUP
});
export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR
});

export const login = {
  request: () => {
    return {
      type: LOGIN_REQUEST
    };
  },
  success: (response) => {
    return {
      type: LOGIN_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: LOGIN_ERROR,
      error
    };
  },

  call: (data) => {
    return async (dispatch) => {
      dispatch(login.request());
      try {
        const res = await authApi.login(data);
        dispatch(login.success(res.data));
      } catch (err) {
        dispatch(login.error(err.message));
      }
    };
  }
};

import authApi from '../../api/auth';
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

export const authCleanup = () => ({
  type: AUTH_CLEANUP
});
export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR
});
export const clearRegisterError = () => ({
  type: CLEAR_REGISTER_ERROR
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

export const register = {
  request: () => {
    return {
      type: REGISTER_REQUEST
    };
  },
  success: (response) => {
    return {
      type: REGISTER_SUCCESS,
      response
    };
  },
  error: (error) => {
    return {
      type: REGISTER_ERROR,
      error
    };
  },

  call: (data) => {
    return async (dispatch) => {
      dispatch(register.request());
      try {
        const res = await authApi.register(data);
        dispatch(register.success(res.data));
        return res.data;
      } catch (error) {
        dispatch(register.error(error.message));
        return error.message;
      }
    };
  }
};

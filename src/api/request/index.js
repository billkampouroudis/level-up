import axios from 'axios';
import store from '../../redux/store';
import get from '../../utils/misc/get';

let authReducer = null;

store.subscribe(() => {
  authReducer = store.getState().authReducer;
});

export const requestMethods = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Creates a request to the api using the given params
 * @param {string} method
 * @param {string} url
 * @param {object} data
 * @param {object} options
 */
const makeRequest = async ({
  method = requestMethods.GET,
  url = '',
  data = {}
}) => {
  if (authReducer.token) {
    // config.headers = {
    //   ...config.headers,
    //   Authorization: `bearer ${authReducer.token}`
    // };
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${authReducer.token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  try {
    const res = await axios[method](url, data, config);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default makeRequest;

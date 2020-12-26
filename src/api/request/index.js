import axios from 'axios';
import store from '../../redux/store';

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
  data = {},
  options = {}
}) => {
  if (authReducer.token) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${authReducer.token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  const { filters } = options;
  if (filters && filters.length > 0) {
    url += '?';

    for (let i = 0; i < filters.length; i++) {
      url += filters[i];

      if (i !== filters.length - 1) {
        url += '&';
      }
    }
  }

  try {
    const res = await axios[method](url, data, config);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default makeRequest;

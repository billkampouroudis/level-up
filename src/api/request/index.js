import axios from 'axios';

export const requestMethods = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const defaultOptions = {
  withAuth: false
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
  url,
  data,
  options = defaultOptions
}) => {
  if (options.withAuth) {
    defaultConfig.header = {
      ...defaultConfig.headers,
      Authorization: 'JWT fefege...'
    };
  }

  try {
    const res = await axios[method](url, data, defaultConfig);
    return res;
  } catch (error) {
    throw new Error(error);
  }

  // return new Promise((resolve, reject) => {
  //   axios[method](url, data, defaultConfig)
  //     .then((response) => resolve(response))
  //     .catch((error) => reject(error));
  // });
};

export default makeRequest;

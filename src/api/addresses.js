import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const favoritesApi = {
  createAddress: async (data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${API_URL}/api/addresses`,
        data,
        options
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  listAddresses: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/addresses`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getAddress: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/addresses/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  removeAddress: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.DELETE,
        url: `${API_URL}/api/addresses/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default favoritesApi;

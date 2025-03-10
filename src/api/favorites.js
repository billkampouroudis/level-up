import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const favoritesApi = {
  listFavorites: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/favorites`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  addToFavorites: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${API_URL}/api/favorites/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  removeFromFavorites: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.DELETE,
        url: `${API_URL}/api/favorites/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default favoritesApi;

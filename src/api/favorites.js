import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const favoritesApi = {
  addToFavorites: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${API_URL}/favorites/${id}`,
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
        url: `${API_URL}/favorites/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default favoritesApi;

import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const sellersApi = {
  getStore: async ({ id, options }) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/stores/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  listProducts: async ({ id, options }) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/stores/${id}/products`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default sellersApi;

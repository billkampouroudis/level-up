import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const ordersApi = {
  listOrders: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/orders`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateOrders: async (data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.PATCH,
        url: `${API_URL}/api/orders/`,
        data,
        options
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default ordersApi;

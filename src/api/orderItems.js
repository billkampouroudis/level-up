import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const orderItemsApi = {
  createOrderItem: async (data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${API_URL}/api/orderItems`,
        data,
        options
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  listOrderItems: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/orderItems`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default orderItemsApi;

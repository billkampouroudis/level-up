import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const productsApi = {
  listProductRatings: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/productRatings/`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default productsApi;

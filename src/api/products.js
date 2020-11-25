import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const productsApi = {
  getProduct: async ({ id, options }) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/products/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  listProducts: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/products`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  addToFavorites: ({ id, options }) => {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const product = products.find((product) => product.id === id);
    //     product.isFavorite = !product.isFavorite;
    //     resolve({
    //       data: product
    //     });
    //   }, 200);
    // });
  }
};

export default productsApi;

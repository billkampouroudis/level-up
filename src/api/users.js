import makeRequest, { requestMethods } from './request';
import { API_URL } from '../constants';

const usersApi = {
  getUser: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${API_URL}/api/users/${id}`,
        options
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default usersApi;

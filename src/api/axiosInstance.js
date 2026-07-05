import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
});

export function setupInterceptors(store) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch({ type: 'auth/logout' });
      }
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
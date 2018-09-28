import Axios from 'axios';
import router from './router';

const axios = Axios.create({ baseURL: 'http://localhost:8000' });

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((config) => config, (error) => {
  if (error.response.status === 401) {
    console.log('unauthorized, logging out ...');
    localStorage.clear();
    router.replace('/login');
  }
  return Promise.reject(error);
});

export default axios;

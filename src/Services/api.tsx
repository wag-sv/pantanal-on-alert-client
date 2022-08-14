import axios from 'axios';

const apis = {
  development: 'http://localhost:3005',
  production: 'https://pantanal-em-alerta-b2pd4.ondigitalocean.app/api',
};

const checkEnvironment = () => {
  if (import.meta.env.PROD) return 'production';
  return 'development';
};

export const api = axios.create({
  baseURL: apis[checkEnvironment()],
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('authenticatedUser');
  const authenticatedUser = JSON.parse(storedUser || '""');
  const axiosRequestConfig = config;
  if (authenticatedUser.token) {
    axiosRequestConfig.headers = { Authorization: `Bearer ${authenticatedUser.token}` };
  }
  return axiosRequestConfig;
});

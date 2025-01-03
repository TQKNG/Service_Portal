import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.message === 'Token is not valid') {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  },
);

export default api;

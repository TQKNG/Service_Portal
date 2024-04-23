import {
  AUTH_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  AUTH,
  RESET_PASSWORD,
  LOGIN,
} from '../actions/types';

const initialState = {
  reset: false,
  sent: false,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        sent: true,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        reset: true,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

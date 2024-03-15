import {
  LOGIN,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  AUTH,
  AUTH_SUCCESS,
  RESET_PASSWORD,
} from './types';
import api from '../utils/api';
import { setAlert } from './alerts';
import setAuthToken from '../utils/setAuthToken';
import { clearAll } from './admin';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/auth/login', body);
    dispatch({ type: LOGIN, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    // if we caught any errors we iterate through them and dispatch the setAlert action to add alerts
    if (errors) {
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const isAuth = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/check');
    console.log(res.data.data);
    dispatch({ type: AUTH, payload: res.data.data });
    console.log(1);
    if (res.data.data) {
      console.log(1);
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors[0].msg === 'Session Expired') {
      dispatch({ type: LOGOUT });
      dispatch(clearAll());
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await api.get('/auth/logout');
    dispatch({ type: LOGOUT });
    dispatch(clearAll());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const resetLink = (formData) => async (dispatch) => {
  try {
    await api.post('/auth/reset', formData);
    dispatch({ type: AUTH_SUCCESS });
    dispatch(setAlert('A reset link was sent to your email', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    await api.post('/auth/reset/' + token, { password });
    dispatch({ type: RESET_PASSWORD });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

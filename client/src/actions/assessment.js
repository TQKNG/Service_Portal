import {
  GET_ASSESSMENT_RESULTS,
  ADD_ASSESSMENT_RESULTS,
  CLEAR_ASSESSMENT_RESULTS,
  LOGOUT,
} from '../actions/types';
import api from '../utils/api';
import { loadResultsList, clearAll } from './admin';
import { setAlert } from './alerts';

export const getAssessmentByCode = (code) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/code/${code}/`);
    dispatch({ type: GET_ASSESSMENT_RESULTS, payload: res.data.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

export const getAssessmentById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/${id}`);
    dispatch({ type: GET_ASSESSMENT_RESULTS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const addAssessmentResult = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/assessmentresults`, formData);
    dispatch({ type: ADD_ASSESSMENT_RESULTS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateAssessmentResult = (formData) => async (dispatch) => {
  try {
    await api.put(`/assessmentresults/${formData.ResultID}`, formData);
    dispatch(loadResultsList(formData.SchoolID));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const clearAssessmentResult = () => (dispatch) => {
  try {
    dispatch({ type: CLEAR_ASSESSMENT_RESULTS });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === 'Session Expired') {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

import {
  GET_ASSESSMENT_RESULTS,
  ADD_ASSESSMENT_RESULTS,
  CLEAR_ASSESSMENT_RESULTS,
} from '../actions/types';

const initialState = {
  assessmentResults: null,
  assessmentResultLoading: true,
  student: null,
  assessment: null,
  accessCode: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ASSESSMENT_RESULTS:
      return {
        ...state,
        assessmentResults: payload.results,
        assessment: payload.assessment,
        student: payload.student,
        assessmentResultLoading: false,
        accessCode: payload.results.AccessCode,
      };
    case ADD_ASSESSMENT_RESULTS:
      return {
        ...state,

        accessCode: payload,
      };
    case CLEAR_ASSESSMENT_RESULTS:
      return {
        assessmentResults: null,
        assessmentResultLoading: true,
        student: null,
        assessment: null,
        accessCode: null,
      };
    default:
      return state;
  }
}

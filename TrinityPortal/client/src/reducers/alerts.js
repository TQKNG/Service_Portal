import { SET_ALERT, REMOVE_ALERT, SET_OUTBREAK, REMOVE_OUTBREAK } from '../actions/types';

const initialState = [];

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    case SET_OUTBREAK:
      return [payload];
    case REMOVE_OUTBREAK:
      return [payload];
    default:
      return state;
  }
}

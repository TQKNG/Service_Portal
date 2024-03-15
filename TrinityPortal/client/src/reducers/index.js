import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin';
import assessment from './assessment';
import alerts from './alerts';

export default combineReducers({ auth, admin, alerts, assessment });

import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin';
import alerts from './alerts';

export default combineReducers({ auth, admin, alerts });

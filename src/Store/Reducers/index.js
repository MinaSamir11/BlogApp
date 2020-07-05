import {combineReducers} from 'redux';

import Auth from './Auth';

import Profile from './Profile';

import Blogs from './Blogs';

export default combineReducers({
  Auth,
  Profile,
  Blogs,
});

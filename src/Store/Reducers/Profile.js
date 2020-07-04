import * as types from '../Actions/types';

import initialState from './initialState';

export default function(state = initialState.Profile, action) {
  switch (action.type) {
    case types.GET_USERPROFILE: {
      return {
        ...state,
        UserProfile: action.userData,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

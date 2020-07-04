import * as types from './types';

import Api from '../../Utils/Api';

export const GetUserProfile = id => {
  return async dispatch => {
    try {
      let response = await Api.get(`?_id=${id}`);
      if (response) {
        if (response.data[0]) {
          //if we get data then user found in our DB
          dispatch(
            setUserProfile({
              ...response.data[0],
              Status: response.status,
            }),
          );
        } else {
          dispatch(
            setUserProfile({
              Status: 401, //response.status in real response Api //wrong email or password
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(setUserProfile({Status: 500}));
      console.log('Ex', ex);
    }
  };
};

const setUserProfile = userState => {
  return {
    userData: userState,
    type: types.GET_USERPROFILE,
  };
};

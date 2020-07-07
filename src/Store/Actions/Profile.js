import * as types from './types';

import Api from '../../Utils/Api';

export const GetUserProfile = id => {
  return async dispatch => {
    try {
      // let response = await Api.get(`MinaSamir11/UserProfileAPi/data?_id=${id}`);
      let response = await Api.get(
        'http://192.168.1.3:4000',
        `/Users?_id=${id}`,
      );

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
      dispatch(setUserProfile({Status: 50}));
      console.log('Ex', ex);
    }
  };
};

export const UpdateUserProfile = body => {
  return async dispatch => {
    try {
      let response = await Api.put(
        'http://192.168.1.3:4000',
        `/Users/${body.id}`,
        {...body.data},
      );

      if (response) {
        console.log('ESPONSE_1', response.data);

        if (response.data[0]) {
          console.log('ESPONSE', response.data[0]);
          //   //if we get data then user found in our DB
          //   dispatch(
          //     setUserProfile({
          //       ...response.data[0],
          //       Status: response.status,
          //     }),
          //   );
          // } else {
          //   dispatch(
          //     setUserProfile({
          //       Status: 401, //response.status in real response Api //wrong email or password
          //     }),
          //   );
        }
      }
    } catch (ex) {
      dispatch(setUserProfile({Status: 50}));
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

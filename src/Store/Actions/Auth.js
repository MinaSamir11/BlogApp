import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Utils/Api';

export const SignInAuth = Body => {
  return async dispatch => {
    let response = await Api.get(`:4000/Users`);
    console.log(response);
    if (response) {
      if (response.data[0]) {
        //if we get data then user found in our DB
        dispatch(
          setUserProfile({
            ...response.data[0],
            Status: response.status,
          }),
        );
        //store data in Async Storage To prove of concept using Asyncstorage Package
        storeData(response.data[0]);
      } else {
        dispatch(
          setUserProfile({
            Status: 401, //response.status in real response Api //wrong email or password
          }),
        );
      }
    }
  };
};

const setUserProfile = userState => {
  return {
    userData: userState,
    type: types.GET_SIGNINAUTH,
  };
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('com.Blog.userInfo', jsonValue);
    let userInfo = await getData();
    console.log('userInfo Async Storage', userInfo);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('com.Blog.userInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

import React, {useState, useReducer, useEffect, useCallback} from 'react';

import {View, Image} from 'react-native';

import Styles from './styles';

import {Button, Input, LoadingModal, PopUp} from '../../Components';

import {Images, Icons} from '../../Assets';

import {validateEmail, validatePassword} from '../../Utils/stringUtils';

import {useSelector, useDispatch} from 'react-redux';

import * as Auth from '../../Store/Actions/Auth';

import {StackActions} from '@react-navigation/native';

const SignIn = props => {
  const dispatch = useDispatch();

  const UserInfo = useSelector(state => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setUserProfile = userState => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      IsLoadingModalVisible(false);
      // setVisiabiltyPopUp(true);
      // props.navigation.replace('TabBottomNavigator');
      // props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
      dispatch(setUserProfile({...UserInfo, Status: 0}));

      props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
    } else if (UserInfo.Status == 50) {
      IsLoadingModalVisible(false);

      setMessagePopUp('No internet Connection');

      setVisiabiltyPopUp(true);
    } else if (UserInfo.Status == 401) {
      IsLoadingModalVisible(false);

      setMessagePopUp('wrong email or password');

      setVisiabiltyPopUp(true);
    }
  }, [UserInfo]);

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      return {
        Account: {
          ...state.Account,
          [action.Input]: action.Value,
        },
      };
    }
    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    Account: {
      Email: '',
      Password: '',
      ErrorEmail: false,
      ErrorPassword: false,
    },
  });

  const ChangeState = data => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      Value: data.value,
      Input: data.input,
    });
  };

  const OnChangeEmail = text => {
    if (validateEmail(text.trim())) {
      ChangeState({
        value: text.trim(),
        input: 'Email',
      });
      ChangeState({
        value: false,
        input: 'ErrorEmail',
      });
    } else {
      ChangeState({
        value: text,
        input: 'Email',
      });
      ChangeState({
        value: text.length > 0 ? true : false,
        input: 'ErrorEmail',
      });
    }
  };

  const OnChangePassword = text => {
    if (formState.Account.ErrorPassword) {
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
    }
    ChangeState({
      value: text.trim(),
      input: 'Password',
    });
  };

  const OnLogin = () => {
    if (!formState.Account.Email.length > 0 || formState.Account.ErrorEmail) {
      ChangeState({
        value: true,
        input: 'ErrorEmail',
      });
    } else if (!validatePassword(formState.Account.Password)) {
      //accept ar least 6 char Mixed char and num of CAPTIAL AND Small char
      ChangeState({
        value: true,
        input: 'ErrorPassword',
      });
    } else {
      //call Api
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
      IsLoadingModalVisible(true);
      dispatch(
        Auth.SignInAuth({
          Email: formState.Account.Email,
          Password: formState.Account.Password,
        }),
      );
    }
  };

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <Image
        source={Images.Logo}
        style={{width: 150, height: 150, alignSelf: 'center', marginTop: 50}}
      />
      <Input
        Error={formState.Account.ErrorEmail}
        PlaceHolder={'Email'}
        ErrorTitle={'In-valid Email'}
        onChangeText={text => OnChangeEmail(text)}
        maxLength={35}
      />
      <Input
        Error={formState.Account.ErrorPassword}
        ErrorTitle={'In-valid Password'}
        secureTextEntry
        maxLength={35}
        PlaceHolder={'Password'}
        onChangeText={text => OnChangePassword(text)}
        InputStyle={{marginTop: 30}}
      />

      <Button
        title={'Login'}
        Customstyle={{borderRadius: 25, marginTop: 30}}
        onPress={OnLogin}
      />
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />

      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default SignIn;

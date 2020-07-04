import React, {useState, useReducer, useEffect, useCallback} from 'react';

import {View, Image, Dimensions} from 'react-native';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Images, Icons} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as ProfileActions from '../../Store/Actions/Profile';

const UserProfile = props => {
  const dispatch = useDispatch();

  const {width, height} = Dimensions.get('screen');

  const UserProfile = useSelector(state => state.Profile.UserProfile);

  const UserInfo = useSelector(state => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const initFetch = useCallback(() => {
    console.log(UserInfo);
    dispatch(ProfileActions.GetUserProfile('5e808ea71fd9400dc009031ade8'));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (UserProfile != null) {
      if (UserProfile.Status == 200) {
        //   console.log('Success', UserInfo);
        IsLoadingModalVisible(false);
        //   setMessagePopUp('Success');
        //   setVisiabiltyPopUp(true);
      } else if (UserProfile.Status == 500) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      } else if (UserProfile.Status == 401) {
        IsLoadingModalVisible(false);
        setMessagePopUp('wrong email or password');
        setVisiabiltyPopUp(true);
      }
    }
  }, [UserProfile]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnReload = () => {
    IsLoadingModalVisible(true);
    initFetch();
  };

  const OnEdit = () => {}; //Bouns

  const OnChangeEmail = () => {};

  return (
    <View style={Styles.MainContainer}>
      {UserProfile != null &&
        (UserProfile.Status == 200 ? (
          <View>
            <Header
              // BackButton
              IconRightName={'pencil'} //content-save-all-outline
              onPressRight={OnEdit}
              StatusBarColor
              Title="Profile"
              onPressLeft={() => {
                // props.navigation.goBack();
              }}
            />

            <Image
              source={UserProfile ? {uri: UserProfile.Photo} : Images.Logo}
              style={Styles.ProfilePic}
            />
            <Input
              editable={false}
              // Error={formState.Account.ErrorEmail}
              PlaceHolder={UserProfile ? UserProfile.Name : ''}
              ErrorTitle={'In-valid Email'}
              onChangeText={OnChangeEmail}
              maxLength={35}
              InputStyle={Styles.Input}
            />

            <Input
              editable={false}
              // Error={formState.Account.ErrorEmail}
              PlaceHolder={UserProfile ? UserProfile.Email : ''}
              ErrorTitle={'In-valid Email'}
              onChangeText={OnChangeEmail}
              maxLength={35}
              InputStyle={Styles.Input}
            />

            <Input
              editable={false}
              // Error={formState.Account.ErrorEmail}
              PlaceHolder={UserProfile ? UserProfile.Phone : ''}
              ErrorTitle={'In-valid Email'}
              onChangeText={OnChangeEmail}
              maxLength={35}
              InputStyle={Styles.Input}
            />

            <Input
              editable={false}
              // Error={formState.Account.ErrorEmail}
              PlaceHolder={
                UserProfile.Age !== undefined ? UserProfile.Age + '' : ''
              }
              ErrorTitle={'In-valid Email'}
              onChangeText={OnChangeEmail}
              maxLength={35}
              InputStyle={Styles.Input}
            />
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <EmptyState
              MessageTitle={MessagePopUp}
              Image={Icons.WrongPopUp}
              reload={'Retry'}
              OnReload={OnReload}
            />
          </View>
        ))}

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

export default UserProfile;

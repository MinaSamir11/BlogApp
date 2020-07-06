import React, {useState, useEffect, useCallback} from 'react';

import {View, Image} from 'react-native';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Images, Icons} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as ProfileActions from '../../Store/Actions/Profile';

import {StackActions} from '@react-navigation/native';

const UserProfile = props => {
  const dispatch = useDispatch();

  const UserProfile = useSelector(state => state.Profile.UserProfile);

  const UserInfo = useSelector(state => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const initFetch = useCallback(() => {
    dispatch(ProfileActions.GetUserProfile(UserInfo._id));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (UserProfile != null) {
      if (UserProfile.Status == 200) {
        IsLoadingModalVisible(false);
      } else if (UserProfile.Status == 50) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      } else if (UserProfile.Status == 401) {
        IsLoadingModalVisible(false);
        // setMessagePopUp('Your Profile not found');
        // setVisiabiltyPopUp(true);
        props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
        //Profile not found  kick out of app
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

  const Onchange = () => {};

  const RenderInput = (key, index) => {
    if (key === 'Name' || key === 'Age' || key === 'Phone' || key === 'Email')
      return (
        <Input
          editable={false}
          key={index}
          // Error={formState.Account.ErrorEmail}
          PlaceHolder={UserProfile[key] + ''}
          ErrorTitle={'In-valid Email'}
          onChangeText={Onchange}
          maxLength={35}
          InputStyle={Styles.Input}
        />
      );
  };

  return (
    <View style={Styles.MainContainer}>
      {UserProfile != null &&
        (UserProfile.Status == 200 && (
          <View>
            <Header
              IconRightName={'pencil'} //content-save-all-outline
              onPressRight={OnEdit}
              StatusBarColor
              Title="Profile"
            />

            <Image
              source={UserProfile ? {uri: UserProfile.Photo} : Images.Logo}
              style={Styles.ProfilePic}
            />

            {Object.keys(UserProfile).map((key, index) => {
              return RenderInput(key, index);
            })}
          </View>
        ))}

      {!LoadingModalVisible && UserProfile.Status != 200 && (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <EmptyState
            MessageTitle={MessagePopUp}
            Image={Icons.WrongPopUp}
            reload={'Retry'}
            OnReload={OnReload}
          />
        </View>
      )}
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

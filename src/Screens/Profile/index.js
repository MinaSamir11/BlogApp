import React, {useState, useEffect, useCallback, useReducer} from 'react';

import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Images, Icons} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as ProfileActions from '../../Store/Actions/Profile';

import {StackActions} from '@react-navigation/native';

import {validateEmail} from '../../Utils/stringUtils';

let keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : -200;

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfile = props => {
  const dispatch = useDispatch();

  const UserProfile = useSelector(state => state.Profile.UserProfile);

  const UserInfo = useSelector(state => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [ProfileImage, setProfileImage] = useState(
    UserProfile ? UserProfile.Photo : null,
  );

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    console.log('STATE', state.UserProfile);
    if (action.type === FORM_INPUT_UPDATE) {
      return {
        UserProfile: {
          ...state.UserProfile,
          [action.Input]: action.Value,
        },
      };
    }
    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    UserProfile: {
      Name: '',
      Phone: '',
      Email: '',
      Age: '',
      IconName: 'pencil',
      Editable: false,
      ErrorEmail: false,
    },
  });

  const ChangeState = data => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      Value: data.value,
      Input: data.input,
    });
  };

  const initFetch = useCallback(() => {
    dispatch(ProfileActions.GetUserProfile(UserInfo.id));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (UserProfile != null) {
      if (UserProfile.Status == 200) {
        IsLoadingModalVisible(false);
        setProfileImage(
          UserProfile.Photo !== null ? UserProfile.Photo : Images.Logo,
        );
      } else if (UserProfile.Status == 50) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      } else if (UserProfile.Status == 401) {
        console.log('401');
        IsLoadingModalVisible(false);
        // setMessagePopUp('Your Profile not found');
        // setVisiabiltyPopUp(true);
        props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
        //Profile not found  kick out of app
      } else if (UserProfile.Status == 201) {
        console.log('201');
        IsLoadingModalVisible(false);
        setMessagePopUp('Profile Updated');
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

  const OnEdit = () => {
    ChangeState({
      value: !formState.UserProfile.Editable,
      input: 'Editable',
    });

    if (!formState.UserProfile.Editable) {
      ChangeState({
        value: 'content-save-all-outline',
        input: 'IconName',
      });
    } else {
      if (
        formState.UserProfile.Name !== '' ||
        formState.UserProfile.Phone !== '' ||
        formState.UserProfile.Email !== '' ||
        formState.UserProfile.Age !== ''
      ) {
        if (!formState.UserProfile.ErrorEmail) {
          IsLoadingModalVisible(true);
          dispatch(
            ProfileActions.UpdateUserProfile({
              id: UserInfo.id,
              data: {
                id: UserInfo.id,
                Name:
                  formState.UserProfile.Name !== ''
                    ? formState.UserProfile.Name
                    : UserInfo.Name,
                Phone:
                  formState.UserProfile.Phone !== ''
                    ? formState.UserProfile.Phone
                    : UserInfo.Phone,
                Email:
                  formState.UserProfile.Email !== ''
                    ? formState.UserProfile.Email.trim().toLowerCase()
                    : UserInfo.Email,
                Password: UserInfo.Password,
                Age:
                  formState.UserProfile.Age !== ''
                    ? parseInt(formState.UserProfile.Age)
                    : UserInfo.Age,
                Photo: 'https://source.unsplash.com/1024x768/?nature', //we can't take his pic because there is no backend to upload image
              },
            }),
          );
        } else {
          setMessagePopUp('In-valid Email ');
          setVisiabiltyPopUp(true);
        }
      }
      ChangeState({
        value: 'pencil',
        input: 'IconName',
      });
    }
  }; //Bouns

  const Onchange = (text, key) => {
    if (key === 'Email') {
      //check Email Validations
      if (validateEmail(text.trim())) {
        ChangeState({
          value: false,
          input: 'ErrorEmail',
        });
      } else {
        ChangeState({
          value: true,
          input: 'ErrorEmail',
        });
      }
    }
    // set data
    ChangeState({
      value: text,
      input: key,
    });
  };

  const PickerImage = async () => {
    if (formState.UserProfile.Editable) {
      ImagePicker.showImagePicker(options, async response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setProfileImage(response.uri);
        }
      });
    }
  };
  const RenderInput = (key, index) => {
    if (key === 'Name' || key === 'Age' || key === 'Phone' || key === 'Email')
      return (
        <Input
          editable={formState.UserProfile.Editable}
          key={index}
          KEY={key}
          Error={
            formState.UserProfile.ErrorEmail && key === 'Email' ? true : false
          }
          PlaceHolder={UserProfile[key] + ''}
          ErrorTitle={'In-valid Email'}
          onChangeText={Onchange}
          maxLength={35}
          InputStyle={Styles.Input}
        />
      );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Styles.MainContainer}>
        {UserProfile != null &&
          (UserProfile.Status != 50 && (
            <View>
              <Header
                IconRightName={formState.UserProfile.IconName}
                onPressRight={OnEdit}
                StatusBarColor
                Title="Profile"
                containerStyle={Styles.ContainerHeader}
              />
              <KeyboardAvoidingView
                behavior="position"
                enabled
                keyboardVerticalOffset={keyboardVerticalOffset}>
                <ScrollView style={Styles.ScrollStyle}>
                  <TouchableOpacity
                    onPress={PickerImage}
                    activeOpacity={formState.UserProfile.Editable ? 0.2 : 1}>
                    <Image
                      source={
                        ProfileImage != null ? {uri: ProfileImage} : Images.Logo
                      }
                      style={Styles.ProfilePic}
                    />
                  </TouchableOpacity>
                  {Object.keys(UserProfile).map((key, index) => {
                    return RenderInput(key, index);
                  })}
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          ))}

        {!LoadingModalVisible && UserProfile.Status == 50 && (
          <View style={Styles.MainContainer}>
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
    </TouchableWithoutFeedback>
  );
};

export default UserProfile;

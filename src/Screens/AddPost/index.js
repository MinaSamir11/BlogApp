import React, {useState, useEffect, useCallback} from 'react';

import {View} from 'react-native';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, Button} from '../../Components';

import {Icons} from '../../Assets';

import {useDispatch, useSelector} from 'react-redux';

import * as BLogsActions from '../../Store/Actions/Blogs';

const AddPost = props => {
  const dispatch = useDispatch();

  const [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  const [PopupModel, setVisiabiltyPopUp] = useState(false);

  const [MessagePopUp, setMessagePopUp] = useState('');

  const [Title, setTitle] = useState('');

  const [Descp, setDescp] = useState('');

  const [Submit, setBtn] = useState('Submit');

  const UserInfo = useSelector(state => state.Auth.UserInfo);

  const StatusAddPostResponse = useSelector(
    state => state.Blogs.StatusAddPostResponse,
  );

  const setResponse = response => {
    return {
      response: response,
      type: 'UPDATE_RESPONSE',
    };
  };

  useEffect(() => {
    if (StatusAddPostResponse != null) {
      if (StatusAddPostResponse == 200) {
        IsLoadingModalVisible(false);
        dispatch(setResponse(null));
      } else if (StatusAddPostResponse == 500) {
        IsLoadingModalVisible(false);
        setMessagePopUp('Failed to add post, try again');
        setBtn('Retry');
        dispatch(setResponse(null));
        setVisiabiltyPopUp(true);
      }
    }
  }, [StatusAddPostResponse]);

  const PopupactionFunLeft = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnchangeTitle = text => {
    setTitle(text);
  };

  const OnchangeDesc = text => setDescp(text);

  const OnSubmit = () => {
    if (Title !== '' && Descp !== '') {
      IsLoadingModalVisible(true);
      var today = new Date().toISOString().slice(0, 10);

      let Region;
      if (props.route.params == undefined) {
        Region = {
          latitude: null,
          longitude: null,
        };
      }
      dispatch(
        BLogsActions.AddPost({
          _id: UserInfo['id'],
          Title: Title,
          Description: Descp,
          Date: today,
          Region:
            props.route.params == undefined
              ? Region
              : props.route.params.Region,
        }),
      );
    } else {
      setMessagePopUp('Please fill the field');
      setVisiabiltyPopUp(true);
    }
  };

  const OnMap = () => props.navigation.push('Map');

  return (
    <View style={Styles.MainContainer}>
      <Header
        BackButton
        StatusBarColor
        Title="Add Post"
        onPressLeft={() => props.navigation.navigate('BlogsScreen')}
        titleStyle={{color: '#000'}}
        IconColor={'#000'}
        ContainerTitle={{
          flex: 1,
          marginLeft: 0,
        }}
      />

      <Input
        PlaceHolder={'Title'}
        ErrorTitle={'In-valid Email'}
        onChangeText={text => {
          OnchangeTitle(text);
        }}
        maxLength={35}
        InputStyle={Styles.Input}
      />

      <Input
        PlaceHolder={'Descrpition'}
        multiline={true}
        ErrorTitle={'In-valid Email'}
        onChangeText={text => {
          OnchangeDesc(text);
        }}
        maxLength={350}
        InputStyle={Styles.InputDesc}
      />

      <Button
        title={'Map'}
        Customstyle={Styles.MapBtn}
        onPress={OnMap}
        IconLeftName={'map-marker-radius-outline'}
        IconSize={50}
        IconColor={'#FFF'}
      />

      <Button
        title={Submit}
        Customstyle={{borderRadius: 25, marginTop: 25}}
        onPress={OnSubmit}
      />

      {/* <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View> */}

      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'Ok'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunLeft}
      />

      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default AddPost;

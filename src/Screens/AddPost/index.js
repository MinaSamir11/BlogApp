import React, {useState, useEffect, useCallback} from 'react';

import {View, Image} from 'react-native';

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

  const [LeftBtnName, setLeftBtnName] = useState('');

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
        setLeftBtnName('OK');
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
      let current_date = new Date();

      let formatted_date =
        current_date.getFullYear() +
        '-' +
        (current_date.getMonth() + 1) +
        '-' +
        current_date.getDate();

      dispatch(
        BLogsActions.AddPost({
          _id: UserInfo['_id'],
          Title: Title,
          Description: Descp,
          Date: formatted_date.toString(),
        }),
      );
    } else {
      setMessagePopUp('Please fill the field');
      setLeftBtnName('Ok');
      setVisiabiltyPopUp(true);
    }
  };

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
        title={Submit}
        Customstyle={{borderRadius: 25, marginTop: 50}}
        onPress={OnSubmit}
      />

      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={LeftBtnName}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunLeft}
      />

      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default AddPost;

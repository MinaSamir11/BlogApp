import React, {useState, useEffect, useCallback} from 'react';

import {View, ScrollView, RefreshControl} from 'react-native';

import Styles from './styles';

import {Header, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as BLogsActions from '../../Store/Actions/Blogs';

import Posts from './RenderPosts';

const Blogs = props => {
  const dispatch = useDispatch();

  const Blogs = useSelector(state => state.Blogs.AllBlogs);

  const StatusBlogResponse = useSelector(
    state => state.Blogs.StatusBlogResponse,
  );

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const initFetch = useCallback(() => {
    dispatch(BLogsActions.Get_AllUsersBlogs());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const setResponseBlogs = response => {
    return {
      response: response,
      type: 'UPDATE_RESPONSE_BLOGS',
    };
  };

  useEffect(() => {
    if (StatusBlogResponse != null) {
      if (StatusBlogResponse == 200) {
        IsLoadingModalVisible(false);
        dispatch(setResponseBlogs(0));
        setRefreshing(false);
      } else if (StatusBlogResponse == 50) {
        IsLoadingModalVisible(false);
        setRefreshing(false);
        setMessagePopUp('No internet Connection');
        dispatch(setResponseBlogs(null));
        setVisiabiltyPopUp(true);
      }
    }
  }, [StatusBlogResponse]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnReload = () => {
    IsLoadingModalVisible(true);
    initFetch();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(BLogsActions.Get_AllUsersBlogs());
  }, [refreshing]);

  return (
    <View style={Styles.MainContainer}>
      <View>
        <Header
          IconRightName={'plus-circle'}
          IconColor={Colors.MainColor}
          StatusBarColor
          Title="Blogs"
          titleStyle={{color: Colors.MainColor}}
          onPressRight={() => {
            props.navigation.navigate('AddPost');
          }}
        />
      </View>

      {!LoadingModalVisible &&
        StatusBlogResponse === null &&
        Blogs.length == 0 && (
          <View style={Styles.MainContainer}>
            <EmptyState
              MessageTitle={MessagePopUp}
              Image={Icons.WrongPopUp}
              reload={'Retry'}
              OnReload={OnReload}
            />
          </View>
        )}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Blogs.map((item, index) => {
          return <Posts key={index} Data={item} />;
        })}
      </ScrollView>

      {/* <FlatList
        indicatorStyle={'white'}
        style={{flex: 1, marginTop: 20}}
        data={Blogs}
        renderItem={({item, index}) => <Posts key={index} Data={item} />}
        keyExtractor={item => item.id}
      /> */}

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

export default Blogs;

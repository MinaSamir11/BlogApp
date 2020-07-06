import React, {useState, useCallback} from 'react';

import {View, ScrollView, FlatList} from 'react-native';

import Styles from './styles';

import {Header, LoadingModal, PopUp} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector} from 'react-redux';

import Posts from '../Blogs/RenderPosts';

const Favorites = props => {
  const Blogs = useSelector(state => state.Blogs.AllBlogs);

  const FavoritePost = (item, index) => {
    if (item.mFavourtiesID !== null) {
      return <Posts key={index} Data={item} />;
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <View>
        <Header
          IconColor={Colors.MainColor}
          StatusBarColor
          Title="Favourites"
          titleStyle={{color: '#CB4C5F'}}
        />
      </View>

      <ScrollView>
        {Blogs.map((item, index) => FavoritePost(item, index))}
      </ScrollView>
    </View>
  );
};

export default Favorites;

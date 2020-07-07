import React, {useEffect, useState} from 'react';

import {View, ScrollView, FlatList} from 'react-native';

import Styles from './styles';

import {Header, EmptyState} from '../../Components';

import {useSelector} from 'react-redux';

import Posts from '../Blogs/RenderPosts';

const Favorites = props => {
  const Blogs = useSelector(state => state.Blogs.AllBlogs);

  const EmptyFavouriteBlog = useSelector(
    state => state.Blogs.EmptyFavouriteBlog,
  );

  const FavoritePost = (item, index) => {
    if (item.mFavourtiesID !== null) {
      return <Posts key={index} Data={item} />;
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <View>
        <Header
          StatusBarColor
          Title="Favourites"
          titleStyle={{color: '#CB4C5F'}}
        />
      </View>
      {EmptyFavouriteBlog == 0 && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <EmptyState
            MessageTitle={'Empty Favourite Blogs'}
            IconsName={'heart'}
            titleStyle={{fontSize: 16, letterSpacing: 0.5}}
          />
        </View>
      )}
      <ScrollView>
        {Blogs.map((item, index) => FavoritePost(item, index))}
      </ScrollView>
    </View>
  );
};

export default Favorites;

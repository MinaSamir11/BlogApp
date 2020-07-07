import React, {useState} from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as BLogsActions from '../../Store/Actions/Blogs';

import * as RootNavigation from '../../Navigation/RootNavigation';

const Posts = props => {
  const dispatch = useDispatch();

  const mUser = useSelector(state => state.Auth.UserInfo);

  const OnChangeFavourties = () => {
    dispatch(
      BLogsActions.AddtoMyFavo({
        idpost: props.Data.id,
        iduser: mUser._id,
        FavID: props.Data.mFavourtiesID,
      }),
    );
  };

  const OnShowLocation = () => {
    RootNavigation.navigate('Map', {
      Region: props.Data.Region,
      Title: props.Data.Title,
    });
  };
  return (
    <View style={{marginTop: 12, marginStart: 12, marginEnd: 12}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: props.Data.Photo}}
            style={{
              width: 43.3,
              height: 43.3,
              backgroundColor: '#000',
              borderRadius: 43.3 / 2,
              alignSelf: 'center',
              marginEnd: 15,
            }}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {props.Data.Name}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'flex-end', fontWeight: '700'}}>
            {props.Data.DaysLeftPost}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#E1E9EF',
          padding: 20,
          marginTop: 8,
          borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {props.Data.Title}
          </Text>
          {props.Data.Region.latitude && (
            <TouchableOpacity onPress={OnShowLocation} style={{}}>
              <Icons
                size={28}
                color={'#2A3575'}
                name={'google-maps'}
                style={{marginBottom: 10}}
              />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text style={{fontSize: 16, fontWeight: '500', marginStart: 5}}>
            {props.Data.Description}
          </Text>
          <TouchableOpacity
            onPress={OnChangeFavourties}
            style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
            <Icons
              size={28}
              color={'red'}
              name={props.Data.mFavourtiesID ? 'heart' : 'heart-outline'}
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginVertical: 15,
          borderBottomColor: '#737373',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};
export default Posts;

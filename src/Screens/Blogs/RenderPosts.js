import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Posts = React.memo(({Data}) => {
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
            source={{uri: Data.Photo}}
            style={{
              width: 43.3,
              height: 43.3,
              backgroundColor: '#000',
              borderRadius: 43.3 / 2,
              alignSelf: 'center',
              marginEnd: 15,
            }}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{Data.Name}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'flex-end', fontWeight: '700'}}>
            {Data.DaysLeftPost}
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
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
          {Data.Title}
        </Text>

        <Text style={{fontSize: 16, fontWeight: '500', marginStart: 5}}>
          {Data.Description}
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
          <Icons
            size={28}
            color={'red'}
            name={'heart-outline'}
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
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
});

export default Posts;
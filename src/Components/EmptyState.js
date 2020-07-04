import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors} from '../Assets';

const EmptyState = props => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={{...styles.imageEmpty, ...props.imageStyle}}
          source={props.Image}
        />
        <Text style={{...styles.title, ...props.titleStyle}}>
          {props.MessageTitle}
        </Text>
        <Text style={{...styles.paragraph, ...props.paragraphStyle}}>
          {props.MessageParagraph}
        </Text>
        <TouchableOpacity
          onPress={props.OnReload}
          style={{
            width: '30%',
            backgroundColor: Colors.MainColor,
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={styles.paragraph}>{props.reload}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50.3,
  },
  imageEmpty: {
    width: 112,
    resizeMode: 'stretch',
    height: 113,
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    color: Colors.White,
  },
});

export {EmptyState};

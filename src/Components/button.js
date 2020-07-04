import React from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {Colors} from '../Assets';

const Button = React.memo(
  ({
    disabled,
    onPress,
    Customstyle,
    activeOpacity,
    IconLeft,
    title,
    BtnTitleStyle,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.buttonStyle, Customstyle]}
        activeOpacity={activeOpacity ? activeOpacity : 0.3}>
        {IconLeft && (
          <Image
            source={IconLeft}
            style={{
              width: 17,
              height: 17,
              marginStart: '11%',
              resizeMode: 'contain',
            }}
          />
        )}
        <Text style={[styles.buttonTextStyle, BtnTitleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  buttonStyle: {
    width: 197.3,
    height: 40.3,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        backgroundColor: Colors.MainColor,
      },
      ios: {
        backgroundColor: Colors.White,
      },
    }),
    margin: 5,
  },
  buttonTextStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        color: Colors.MainColor,
      },
      android: {
        color: Colors.White,
      },
    }),
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
export {Button};

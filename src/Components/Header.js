import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../Assets';

const {width, height} = Dimensions.get('window');

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : 0;

//for send props
// status bar color (StatusBarColor)
// back arrow (BackButton)
// menu icon (menuIcon)
// refresh icon (RefreshButton)
// header Title (Title) title style (titleStyle)
// containerStyle for update the header container style
// onPressRight event/function fired when click on right icon
// onPressLeft event/function fired when click on left icon

const Header = props => (
  <View>
    {/* StatusBar  */}
    <View
      style={{
        width: '100%',
        height: STATUS_BAR_HEIGHT,
        backgroundColor: props.StatusBarColor
          ? Colors.statusBarColor
          : 'transparent',
      }}>
      <StatusBar barStyle="light-content" />
    </View>

    <View style={[styles.NavContainer, props.containerStyle]}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.NavIconContainer}
          onPress={props.onPressLeft}>
          {props.BackButton && (
            <Icon name="arrow-left" color={'#7AABFF'} size={22} />
          )}
        </TouchableOpacity>
        <View style={styles.ContainerTitle}>
          <Text style={[styles.Title, props.titleStyle]}>{props.Title}</Text>
        </View>
        <TouchableOpacity
          style={styles.NavIconRightContainer}
          onPress={props.onPressRight}>
          {props.IconRightName && (
            <Icon name={props.IconRightName} color={'#7AABFF'} size={22} />
          )}
        </TouchableOpacity>
      </View>
    </View>
    <View />
  </View>
);

const styles = StyleSheet.create({
  NavContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderBottomColor: Colors.Black,
    borderBottomWidth: 0.5,
  },
  Title: {
    fontWeight: 'bold',
    color: '#7AABFF',
    fontSize: 19.7,
    textAlign: 'center',
  },
  NavIconContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  NavIconRightContainer: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  ContainerTitle: {flex: 1, marginLeft: 30},
});

export {Header};

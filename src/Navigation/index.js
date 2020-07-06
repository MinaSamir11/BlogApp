import React from 'react';

import {Platform, Dimensions, View} from 'react-native';

import SignIn from '../Screens/SignIn';

import UserProfile from '../Screens/Profile';

import Blogs from '../Screens/Blogs';

import AddPost from '../Screens/AddPost';

import Favorites from '../Screens/Favorites';

import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../Assets';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Blogs') {
            iconName = focused ? 'post' : 'post-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FB6261',
        inactiveTintColor: Colors.GreyWhite,
      }}>
      <Tab.Screen name="Blogs" component={StackBlogs} />
      <Tab.Screen name="Favourites" component={Favorites} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const StackBlogs = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BlogsScreen" component={Blogs} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="TabBottomNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

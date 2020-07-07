import React, {useState} from 'react';

import {View, Dimensions, Text} from 'react-native';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, Button} from '../../Components';

import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('screen');

const latitudeDelta = 0.7,
  longitudeDelta = (width / height) * 4;

const Map = props => {
  // console.log('RE', props.route.params.Region);
  let [Region, setRegion] = useState(
    props.route.params == undefined
      ? {
          latitude: 30.1357675,
          longitude: 31.2999,
          latitudeDelta,
          longitudeDelta,
        }
      : props.route.params.Region,
  );

  const _handleChangeRegion = data => {
    if (props.route.params == undefined) {
      setRegion(prevState => {
        return {
          ...prevState,
          ...data.Region,
        };
      });
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <View style={{flex: 1}}>
        <Header
          BackButton
          StatusBarColor
          Title={
            props.route.params == undefined
              ? 'Set Post Location'
              : 'Post Location'
          }
          onPressLeft={() => {
            props.route.params == undefined
              ? props.navigation.navigate('AddPost')
              : props.navigation.navigate('BlogsScreen');
          }}
          titleStyle={{color: '#354294', fontSize: 16}}
          IconColor={'#354294'}
          ContainerTitle={{
            flex: 1,
            marginLeft: 0,
          }}
          RightTitle={props.route.params == undefined ? 'Save' : null}
          onPressRight={() => {
            props.navigation.navigate('AddPost', {
              Region,
            });
          }}
        />

        <MapView
          region={Region}
          onPress={e => _handleChangeRegion({Region: e.nativeEvent.coordinate})}
          onRegionChangeComplete={e => _handleChangeRegion({Region: e})}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{flex: 1}}
          initialRegion={Region}>
          <Marker
            draggable={props.route.params == undefined ? true : false}
            coordinate={Region}
            title={
              props.route.params == undefined
                ? 'set your post location'
                : props.route.params.Title
            }
            description={
              props.route.params == undefined ? 'Hold and drag me' : ''
            }
            onDragEnd={e =>
              _handleChangeRegion({Region: e.nativeEvent.coordinate})
            }
          />
        </MapView>
      </View>

      {/* <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'Ok'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunLeft}
      /> */}
    </View>
  );
};

export default Map;

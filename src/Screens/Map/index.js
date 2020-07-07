import React, {useState} from 'react';

import {View, Dimensions, Text} from 'react-native';

import Styles from './styles';

import {Header, Input, LoadingModal, PopUp, Button} from '../../Components';

import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('screen');

const latitudeDelta = 0.7,
  longitudeDelta = (width / height) * 4;

const Map = props => {
  let [Region, setRegion] = useState({
    latitude: 30.1357675,
    longitude: 31.2999,
    latitudeDelta,
    longitudeDelta,
  });

  const _handleChangeRegion = data => {
    setRegion(prevState => {
      return {
        ...prevState,
        ...data.Region,
      };
    });
  };

  return (
    <View style={Styles.MainContainer}>
      <View style={{flex: 1}}>
        <Header
          BackButton
          StatusBarColor
          Title="Set Post Location"
          onPressLeft={() => props.navigation.navigate('AddPost')}
          titleStyle={{color: '#354294', fontSize: 16}}
          IconColor={'#354294'}
          ContainerTitle={{
            flex: 1,
            // marginLeft: 0,
          }}
          RightTitle={'Save'}
          onPressRight={() => {
            props.navigation.navigate('AddPost', {
              Region,
            });
          }}
        />
        <MapView
          region={Region}
          onPress={e => _handleChangeRegion({Region: e.nativeEvent.coordinate})}
          onRegionChangeComplete={e => setRegion(e)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{flex: 1}}
          initialRegion={{
            latitude: 30.1357675,
            longitude: 31.2999,
            latitudeDelta,
            longitudeDelta,
          }}>
          <Marker
            draggable
            coordinate={Region}
            title={'set your post location'}
            description={'Hold and drag me'}
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

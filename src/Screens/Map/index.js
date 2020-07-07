import React, {useState} from 'react';

import {View} from 'react-native';

import Styles from './styles';

import {Header} from '../../Components';

import MapView, {Marker} from 'react-native-maps';

const latitudeDelta = 4.458373652515075,
  longitudeDelta = 3.0254107341170347;

const Map = props => {
  let [Region, setRegion] = useState(
    props.route.params == undefined
      ? {
          latitude: 30.07970940404224,
          longitude: 31.292318869382143,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }
      : {
          ...props.route.params.Region,
          latitudeDelta: 0.009999045840163,
          longitudeDelta: 0.00666227191686635,
        },
  );

  const _handleChangeRegion = data => {
    if (props.route.params == undefined) {
      console.log(data);
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
              Region: {
                latitude: Region.latitude,
                longitude: Region.longitude,
              },
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
    </View>
  );
};

export default Map;
